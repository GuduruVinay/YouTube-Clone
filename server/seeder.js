import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.model.js";
import Channel from "./models/Channel.model.js";
import Video from "./models/Video.model.js";
import Comment from "./models/Comment.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

// Data Configuration
const USER_COUNT = 5;
const CHANNELS_PER_USER = 1;
const VIDEOS_PER_CHANNEL = 4;

// Connect and Seed
const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding...');

        // Clear Existing Data
        await User.deleteMany();
        await Channel.deleteMany();
        await Video.deleteMany();
        await Comment.deleteMany();
        console.log('Old data cleared.');

        // Create Users
        const users = [];
        for(let i = 0; i < USER_COUNT; i++) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync("123456", salt);

            const user = new User({
                username: `User_${i + 1}`,
                email: `user${i + 1}@example.com`,
                password: hash,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=User_${i}`,
                channels: [],
                subscribedChannels: []
            });
            const savedUser = await user.save();
            users.push(savedUser);
        }
        console.log(`${users.length} Users Created`);

        // Create Channels & Link to Users
        const channels = [];
        for(const user of users) {
            for(let j = 0; j < CHANNELS_PER_USER; j++) {
                const channel = new Channel({
                    channelName: `${user.username}'s Channel`,
                    owner: user._id,
                    description: `This is the official channel for ${user.username}. We post tech and gaming content!`,
                    channelBanner: "https://picsum.photos/1200/300",
                    subscribers: Math.floor(Math.random() * 5000),
                    videos: []
                });

                const savedChannel = await channel.save();
                channels.push(savedChannel);

                // Update User with this Channel ID
                await User.findByIdAndUpdate(user._id, {
                    $push: { channels: savedChannel._id }
                });
            }
        }
        console.log(`${channels.length} Channels Created`);

        // Create Videos & Link to Channels
        const videos = [];
        const sampleTags = ["coding", "react", "gaming", "music", "vlog", "tech"];
        const thumbnails = [
            "https://img.youtube.com/vi/y881t8ilMyc/maxresdefault.jpg",
            "https://img.youtube.com/vi/k3Vfj-e1Ma4/maxresdefault.jpg",
            "https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg",
            "https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg"
        ];

        for (const channel of channels) {
        for (let k = 0; k < VIDEOS_PER_CHANNEL; k++) {
            const randomThumb = thumbnails[Math.floor(Math.random() * thumbnails.length)];
            const randomTag = sampleTags[Math.floor(Math.random() * sampleTags.length)];

            const video = new Video({
            uploader: channel.owner,
            channelId: channel._id,
            title: `Amazing Video #${k + 1} by ${channel.channelName}`,
            description: "In this video, we explore advanced concepts and have fun. Don't forget to like and subscribe!",
            thumbnailUrl: randomThumb,
            videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            views: Math.floor(Math.random() * 100000),
            tags: [randomTag, "viral"],
            likes: [],
            dislikes: []
            });

            const savedVideo = await video.save();
            videos.push(savedVideo);

            // Update Channel with this Video ID
            await Channel.findByIdAndUpdate(channel._id, {
            $push: { videos: savedVideo._id }
            });
        }
        }
        console.log(`${videos.length} Videos Created`);

        console.log("Seeding Complete!");
        process.exit();
    } catch(err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();