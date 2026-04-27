import Player from "../models/Player.js";
import { getPlayerDetails } from "../services/scraperService.js";

// 🔐 Escape regex special characters
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const searchPlayer = async (req, res) => {
  const {playerId} = req.query;
  
  

  try {

    let playerRecord;

    // 🔍 Fetch detailed data
    const playerDetails = await getPlayerDetails(playerId);
    
    

    if (!playerDetails) {
      return res.status(500).json({
        message: "Failed to fetch player details"
      });
    }

    // ✅ Success response
    return res.status(200).json({
      id: playerId,
     // name: playerRecord.name,
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