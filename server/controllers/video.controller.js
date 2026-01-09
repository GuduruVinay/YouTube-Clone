import Video from "../models/Video.model.js";

// GET Random Videos for Home Page
export async function randomVideos(req, res) {
    try {
        // Fetch 30 random videos
        const videos = await Video.aggregate([{ $sample: { size: 30 } }]);
        return res.status(200).json(videos);
    } catch(err) {
        return res.status(500).json(err);
    }
};

// GET Single Video
export async function getVideo(req, res) {
    try {
        const video = await Video.findById(req.params.id);
        return res.status(200).json(video);
    } catch(err) {
        return res.status(500).json(err);
    }
}

// PUT Like Video
export async function likeVideo(req, res) {
    const id = req.user.id; // From JWT Token
    const videoId = req.params.videoId;

    try{
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id }, // Add user ID to likes
            $pull: { dislikes: id }, // Remove from dislikes if present
        });
        return res.status(200).json("The video has been liked.");
    } catch(err) {
        return res.status(500).json(err);
    }
}

// PUT Dislike Video
export async function dislikeVideo(req, res) {
    const id = req.user.id;
    const videoId = req.params.videoId;
    
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id }
        });
        return res.status(200).json("The video has been disliked.");
    } catch(err) {
        return res.status(500).json(err);
    }
}