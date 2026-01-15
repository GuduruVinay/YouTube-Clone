import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";
import Channel from "./models/Channel.model.js";
import Video from "./models/Video.model.js";
import Comment from "./models/Comment.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for Seeding...");
  } catch (err) {
    console.error(err);
  }
};

const CATEGORIES = [
  "Web Development", "Gaming", "Sports", "Music", "React", "MongoDB", 
  "Funny", "Cricket", "Football", "Animation", "Live", "Game Development", 
  "Movies", "Tech", "Education", "Coding", "Vlogs", "News"
];

// Real YouTube Video IDs
const REAL_VIDEOS = [
  { id: "bMknfKXIFA8", title: "React Course - Beginner's Tutorial", tags: ["React", "Web Development", "Coding"] },
  { id: "pWbMrx5rVBE", title: "MongoDB in 100 Seconds", tags: ["MongoDB", "Tech", "Education"] },
  { id: "SqcY0GlETPk", title: "React Tutorial for Beginners", tags: ["React", "Coding", "Web Development"] },
  { id: "AmC9SmCBUj4", title: "Game Development for Beginners", tags: ["Game Development", "Coding", "Tech"] },
  { id: "jNQXAC9IVRw", title: "Me at the zoo", tags: ["Vlogs", "Funny"] },
  { id: "jfKfPfyJRdk", title: "Lofi Hip Hop Radio", tags: ["Music", "Live"] },
  { id: "60ItHLz5WEA", title: "Lionel Messi - All Goals", tags: ["Football", "Sports"] },
  { id: "u2pOpS_C6y4", title: "IPL 2026 Highlights", tags: ["Cricket", "Sports"] },
  { id: "9Auq9mYxFEE", title: "Sky News Live", tags: ["News", "Live"] },
  { id: "jjl9J0S4wWk", title: "Minecraft Survival Guide", tags: ["Gaming", "Funny"] },
];

const seedData = async () => {
  await connect();

  try {
    // 1. CLEAR ALL DATA
    await User.deleteMany({});
    await Video.deleteMany({});
    await Channel.deleteMany({}); // <--- Clear Channels too
    console.log("Deleted old data.");

    // 2. CREATE USERS & CHANNELS
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("123456", salt);

    const createdChannels = [];
    const createdUsers = [];

    for (let i = 1; i <= 5; i++) {
      // A. Create User
      const newUser = new User({
        username: `User${i}`,
        email: `user${i}@gmail.com`,
        password: hash,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`,
        subscribers: 0, // Subs tracked in Channel now usually, but keeping for User schema compatibility
      });
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);

      // B. Create Channel for this User
      const newChannel = new Channel({
        channelName: `Channel ${i}`,
        handle: `@user${i}_handle`,
        channelAvatar: savedUser.avatar,
        channelBanner: "https://via.placeholder.com/1500x400",
        description: `This is the official channel of User ${i}. We post videos about ${CATEGORIES[i % CATEGORIES.length]}.`,
        owner: savedUser._id, // Link to User
        subscribers: Math.floor(Math.random() * 5000),
      });
      const savedChannel = await newChannel.save();
      createdChannels.push(savedChannel);
    }
    
    console.log(`Created ${createdUsers.length} users and ${createdChannels.length} channels.`);

    // 3. CREATE VIDEOS LINKED TO CHANNELS
    const videos = [];
    
    // We will loop through REAL_VIDEOS and assign them to random CHANNELS
    // We create multiple copies to fill up the DB
    for(let k = 0; k < 3; k++) { 
        REAL_VIDEOS.forEach((vid) => {
            const randomChannel = createdChannels[Math.floor(Math.random() * createdChannels.length)];
            
            videos.push(new Video({
                userId: randomChannel.owner, // The User ID of the channel owner
                channelId: randomChannel._id, // <--- CRITICAL: The Real Channel ID
                title: vid.title,
                description: `Description for ${vid.title}. Tags: ${vid.tags.join(", ")}`,
                thumbnailUrl: `https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`,
                videoUrl: `https://www.youtube.com/watch?v=${vid.id}`,
                views: Math.floor(Math.random() * 500000),
                tags: vid.tags,
                likes: [],
                dislikes: []
            }));
        });
    }

    await Video.insertMany(videos);
    console.log(`Created ${videos.length} videos.`);

    console.log("SUCCESS! Database seeded with Users, Channels, and Videos.");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();