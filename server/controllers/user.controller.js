import User from "../models/User.model";

export async function getUser(req, res, next) {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        next(err);
    }
};