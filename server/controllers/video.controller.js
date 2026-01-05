import Video from "../models/Video.model.js";

// Get Random Videos for Home Page
export async function randomVideos(req, res) {
    try {
        // Fetch 30 random videos
        const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
        return res.status(200).json(videos);
    } catch(err) {
        return res.status(500).json(err);
    }
};