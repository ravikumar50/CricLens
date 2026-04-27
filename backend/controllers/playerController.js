import Player from "../models/Player.js";
import { getPlayerDetails } from "../services/scraperService.js";

// 🔐 Escape regex special characters
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const searchPlayer = async (req, res) => {
  const { name } = req.query;
  
  // ❗ Validate input
  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required" });
  }

  try {
    const trimmedName = name.trim();
    const safeName = escapeRegex(trimmedName);

    let playerRecord;

    // ✅ 1. Try EXACT match first (best UX)
    playerRecord = await Player.findOne({
      name: { $regex: `^${safeName}$`, $options: "i" }
    });

    // ✅ 2. If not found → fallback to PARTIAL match
    if (!playerRecord) {
      playerRecord = await Player.findOne({
        name: { $regex: safeName, $options: "i" }
      }).sort({ name: 1 }); // consistent "first"
    }

    // ❌ No player found
    if (!playerRecord) {
      return res.status(404).json({ message: "No Player Found" });
    }

    // 🔍 Fetch detailed data
    const playerDetails = await getPlayerDetails(playerRecord.id);
    
    

    if (!playerDetails) {
      return res.status(500).json({
        message: "Failed to fetch player details"
      });
    }

    // ✅ Success response
    return res.status(200).json({
      id: playerRecord.id,
      name: playerRecord.name,
      ...playerDetails
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};