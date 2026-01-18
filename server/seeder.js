import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";
import Channel from "./models/Channel.model.js";
import Video from "./models/Video.model.js";
import Comment from "./models/Comment.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

// CURATED DATA (Guaranteed to match and have thumbnails)
const ROBUST_VIDEOS = [
    // CODING & TECH
    { id: "K4TOrB7at0Y", title: "React JS Crash Course 2024", cat: "Education", tags: ["react", "javascript"] },
    { id: "SccSCuHhOw0", title: "Learn Express JS In 35 Minutes", cat: "Education", tags: ["node", "express", "backend"] },
    { id: "9ca8Jt24MFA", title: "MongoDB Crash Course", cat: "Education", tags: ["mongodb", "database"] },
    { id: "0pThnRneDjw", title: "Build a YouTube Clone with React", cat: "Education", tags: ["clone", "react", "fullstack"] },
    { id: "RVFAyFWO4go", title: "The Linux Terminal for Beginners", cat: "Tech", tags: ["linux", "terminal"] },
    
    // GAMING
    { id: "jjl9J0S4wWk", title: "Minecraft Survival Guide - Part 1", cat: "Gaming", tags: ["minecraft", "survival"] },
    { id: "V11Vd2b2Ojk", title: "GTA 6 - Official Trailer", cat: "Gaming", tags: ["gta6", "rockstar", "trailer"] },
    { id: "0vCS_vYr9oA", title: "Elden Ring: Shadow of the Erdtree Trailer", cat: "Gaming", tags: ["elden ring", "rpg"] },

    // NATURE & VLOGS
    { id: "W_fuTJ952Jc", title: "A Day in the Life of a Software Engineer", cat: "Vlogs", tags: ["dayinthelife", "career"] },
    { id: "BHACKCNDMW8", title: "The Most Beautiful Places in the World", cat: "Nature", tags: ["travel", "4k", "nature"] },
    
    // MUSIC
    { id: "jfKfPfyJRdk", title: "lofi hip hop radio - beats to relax/study to", cat: "Music", tags: ["lofi", "live", "study"] },
    { id: "5qap5aO4i9A", title: "Mozart - Classical Music for Brain Power", cat: "Music", tags: ["classical", "study"] },

    // SPORTS
    { id: "I9tWZB7OUSU", title: "Lionel Messi - The GOAT (Official Movie)", cat: "Sports", tags: ["messi", "football"] },
    { id: "9Auq9mYxFEE", title: "Sky News Live", cat: "News", tags: ["news", "live"] }
];

// High quality banners from Unsplash
const CHANNEL_BANNERS = [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=400&fit=crop", // Tech
    "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&h=400&fit=crop", // Gaming
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1600&h=400&fit=crop", // Music
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&h=400&fit=crop", // Nature
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=1600&h=400&fit=crop", // Sports
];

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};

const seedData = async () => {
  await connect();

  try {
    // 1. CLEANUP
    console.log("Clearing old data...");
    await User.deleteMany({});
    await Channel.deleteMany({});
    await Video.deleteMany({});
    await Comment.deleteMany({}); // Clear comments if model exists

    // 2. CREATE USERS
    console.log("Creating Users...");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("123456", salt);

    const users = [];
    const userNames = ["JohnDoe", "JaneSmith", "TechGuru", "GamerPro", "MusicLover"];

    for (let i = 0; i < userNames.length; i++) {
        const user = new User({
            username: userNames[i], // Ensure this matches your Schema (name vs username)
            email: `${userNames[i].toLowerCase()}@test.com`,
            password: hash,
            // Reliable Avatar API
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userNames[i]}`, 
            subscribers: 0,
            subscribedUsers: [],
            subscribedChannels: [], // Assuming you added this array for tracking
        });
        const savedUser = await user.save();
        users.push(savedUser);
    }

    // 3. CREATE CHANNELS
    console.log("Creating Channels...");
    const channels = [];
    
    // Only first 4 users get channels (User 5 is a viewer only)
    for (let i = 0; i < 4; i++) {
        const channel = new Channel({
            channelName: `${users[i].username} Channel`,
            handle: `@${users[i].username.toLowerCase()}`,
            description: `Welcome to the official channel of ${users[i].name}. We create content about ${ROBUST_VIDEOS[i].cat}.`,
            channelAvatar: users[i].img,
            channelBanner: CHANNEL_BANNERS[i % CHANNEL_BANNERS.length],
            owner: users[i]._id,
            subscribers: Math.floor(Math.random() * 100000),
            videos: [], // Will populate next
        });
        const savedChannel = await channel.save();
        
        // Link Channel to User
        await User.findByIdAndUpdate(users[i]._id, { 
            $push: { channels: savedChannel._id } 
        });
        
        channels.push(savedChannel);
    }

    // 4. CREATE VIDEOS
    console.log("Creating Videos...");
    const videos = [];

    // Distribute curated videos among channels
    for (const vidData of ROBUST_VIDEOS) {
        // Pick a random channel
        const randomChannel = channels[Math.floor(Math.random() * channels.length)];
        
        const newVideo = new Video({
            userId: randomChannel.owner,
            channelId: randomChannel._id,
            title: vidData.title,
            description: vidData.title + ". " + "This video covers in-depth topics about " + vidData.tags[0] + ". Don't forget to like and subscribe!",
            thumbnailUrl: `https://i.ytimg.com/vi/${vidData.id}/maxresdefault.jpg`,
            videoUrl: `https://www.youtube.com/watch?v=${vidData.id}`,
            views: Math.floor(Math.random() * 500000),
            tags: vidData.tags,
            likes: [],
            dislikes: [],
            channelName: randomChannel.channelName, // Useful for search/cards
            channelAvatar: randomChannel.channelAvatar
        });

        const savedVideo = await newVideo.save();
        videos.push(savedVideo);

        // Update Channel's video list (if your schema has it)
        await Channel.findByIdAndUpdate(randomChannel._id, {
            $push: { videos: savedVideo._id }
        });
    }

    // 5. CREATE COMMENTS (Optional but good for robustness)
    console.log("Creating Comments...");
    const commentTexts = [
        "Great video!", "Very helpful, thanks.", "Amazing quality!", 
        "First!", "Can you make a video about Redux?", "Love this content."
    ];

    for(const video of videos) {
        // Add 2 random comments per video
        for(let j=0; j<2; j++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const newComment = new Comment({
                userId: randomUser._id,
                videoId: video._id,
                description: commentTexts[Math.floor(Math.random() * commentTexts.length)]
            });
            await newComment.save();
        }
    }

    console.log("SUCCESS! Database seeded perfectly.");
    process.exit();
    
  } catch (err) {
    console.error("Seeding Error:", err);
    process.exit(1);
  }
};

seedData();