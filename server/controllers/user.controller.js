import User from "../models/User.model.js";

// GET User
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
};

// PUT Subscribe
export const subscribe = async (req, res, next) => {
    try {
        // Add channelId to the current user's 'subscribedUsers' array
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });

        // Increase the 'subscribers' count of the channel
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 } 
        });
        res.status(200).json("Subscription successful.");
    } catch(err) {
        next(err);
    }
};

// PUT Unsubscribe
export const unsubscribe = async (req, res, next) => {
    try {
        // Remove channelId from the current user's list
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });

        // Decrease the 'subscribers' count of the channel
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 } 
        });
        res.status(200).json("Unsubscription successful.");
    } catch(err) {
        next(err);
    }
};