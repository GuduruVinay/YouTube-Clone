import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.model.js";

dotenv.config();

// Dummy Data
const videos = [
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial...",
        "imgUrl": "...",
        "videoUrl": "...",
        "views": 15200,
        "likes": [],
        "dislikes": []
    }

];

// Connect and Seed
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear existing data
        await Video.deleteMany({});
        console.log('Old videos removed.');

        // Insert new data
        await Video.insertMany(videos);
        console.log('Dummy videos added successfully!');

        process.exit();
    } catch(err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();