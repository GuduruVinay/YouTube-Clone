import mongoose from "mongoose";
import dotenv from "dotenv";
import Video from "./models/Video.model.js";
import User from "./models/User.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Dummy Data
const videos = [
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    },
    {
        "title": "Learn React in 30 Minutes",
        "desc": "A quick tutorial to get started with React.",
        "imgUrl": "https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg",
        "videoUrl": "https://www.w3schools.com/html/mov_bbb.mp4",
        "views": 15300,
        "tags": ["react", "coding"],
        "likes": [],
        "dislikes": []
    }
];

// Connect and Seed
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Remove old data to avoid duplicates
        await User.deleteMany({});
        await Video.deleteMany({});
        console.log('Old data cleared.');

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync("123456", salt);

        const users = [
            {
                username: "CodeMaster",
                email: "code@test.com",
                password: hashedPassword,
                img: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
                subscribers: 1250,
                subscribedUsers: [],
            },
            {
                username: "TravelVlogs",
                email: "travel@test.com",
                password: hashedPassword,
                img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
                subscribers: 50,
                subscribedUsers: [],
            },
            {
                username: "TechReviewer",
                email: "tech@test.com",
                password: hashedPassword,
                img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
                subscribers: 89000,
                subscribedUsers: [],
            }
        ];

        const savedUsers = await User.insertMany(users);
        console.log(`${savedUsers.length} users created.`);

        const videos = [
            {
                userId: savedUsers[0]._id, // CodeMaster
                title: "React JS Crash Course 2026",
                desc: "Learn React from scratch in this comprehensive tutorial.",
                imgUrl: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4",
                views: 1500,
                tags: ["react", "coding", "webdev"],
                likes: [],
                dislikes: [],
            },
            {
                userId: savedUsers[0]._id, // CodeMaster
                title: "Build a YouTube Clone",
                desc: "Step by step guide to full stack development.",
                imgUrl: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hacker-typing-on-a-keyboard-seen-from-behind-3094-large.mp4",
                views: 840,
                tags: ["mern", "tutorial", "clone"],
                likes: [],
                dislikes: [],
            },
            {
                userId: savedUsers[1]._id, // TravelVlogs
                title: "Exploring Tokyo at Night",
                desc: "The neon lights of Tokyo are unmatched.",
                imgUrl: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-at-night-11-large.mp4",
                views: 5300,
                tags: ["travel", "japan", "vlog"],
                likes: [],
                dislikes: [],
            },
            {
                userId: savedUsers[2]._id, // TechReviewer
                title: "iPhone 16 Review - Worth it?",
                desc: "Unboxing and full review of the new iPhone.",
                imgUrl: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-man-holding-a-smartphone-in-vertical-orientation-4034-large.mp4",
                views: 200000,
                tags: ["tech", "review", "iphone"],
                likes: [],
                dislikes: [],
            }
        ];

        await Video.insertMany(videos);
        console.log(`${videos.length} videos created.`);

        console.log("Seeding Complete!");
        process.exit();
    } catch(err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();