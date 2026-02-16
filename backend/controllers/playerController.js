import Player from "../models/Player.js";
import { getPlayerDetails } from "../services/scraperService.js";

export const searchPlayer = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }

    try {
        const trimmedName = name.trim();

        // Check if full name (contains space)
        const isFullName = trimmedName.includes(" ");

        let playerRecord;

        if (isFullName) {
            // Exact full name match (case insensitive)
            playerRecord = await Player.findOne({
                name: { $regex: `^${trimmedName}$`, $options: "i" }
            });
        } else {
            // First name match (return only first match)
            playerRecord = await Player.findOne({
                name: { $regex: `^${trimmedName}`, $options: "i" }
            });
        }

        if (!playerRecord) {
            return res.status(404).json({ message: "No Player Found" });
        }

        const playerDetails = await getPlayerDetails(playerRecord.id);
        if(!playerDetails) {
            return res.status(500).json({ message: "Failed to fetch player details" });
        }

        res.status(200).json({
            id : playerRecord.id,
            name : playerRecord.name,
            ...playerDetails
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
