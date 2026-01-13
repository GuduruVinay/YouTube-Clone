import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// REGISTER
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "User already exists" });

        // Encrypt the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and Save the new User
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();

        // Respond (Exclude password from response)
        const { password: _, ...otherDetails } = savedUser._doc;
        return res.status(201).json(otherDetails);
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};

// LOGIN
export const loginUser = async (req, res) => {
    try {
        // Find User
        const user = await User.findOne({ username: req.body.username });
        if(!user) return res.status(404).json({ message: "User not found!" });
    
        // Validate Password
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({ message: "Incorrect Password!" });

        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        // Send Token and User Data to Frontend
        const { password, ...otherDetails } = user._doc;
        return res.status(200).json({ details: { ...otherDetails }, token });
    } catch(err) {
        return res.status(500).json({ error: err.message });
    }
};