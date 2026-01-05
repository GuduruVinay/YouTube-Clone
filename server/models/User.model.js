import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be atleast 6 characters']
    },
    avatar: {
        type: String,
    },
    channels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channel'
    }]
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

