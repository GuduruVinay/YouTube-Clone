import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, ArrowDownToLine, Bookmark, Flag } from 'lucide-react';
import Comments from "../components/Comments";
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";
import { useDispatch, useSelector } from "react-redux";
import { subscription, like, dislike } from "../redux/userSlice";

const Video = () => {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Get videoId from URL
    const path = useLocation().pathname.split("/")[2];
    const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Video Data
                const videoRes = await axios.get(`http://localhost:5000/api/videos/find/${path}`);

                // Increment View
                await axios.put(`http://localhost:5000/api/videos/view/${path}`);

                setVideo(videoRes.data);

                // Get Channel Data (using channelId from video)
                const channelRes = await axios.get(`http://localhost:5000/api/channels/find/${videoRes.data.channelId}`);
                setChannel(channelRes.data);
            } catch(err) {
                console.error(err);
            }
        };
        fetchData(); 
    }, [path]);

    // Handle Like
    const handleLike = async () => {
        await axios.put(`http://localhost:5000/api/users/like/${video._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(like(currentUser._id));
        setVideo(prev => ({ ...prev, likes: [...prev.likes, currentUser._id], dislikes: prev.dislikes.filter(id => id !== currentUser._id)}));
    };

    // Handle Dislike
    const handleDislike = async () => {
        await axios.put(`http://localhost:5000/api/users/dislike/${video._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(dislike(currentUser._id));
        setVideo(prev => ({ ...prev, dislikes: [...prev.dislikes, currentUser._id], likes: prev.likes.filter(id => id !== currentUser._id)}));
    };

    // Handle Subsription
    const handleSub = async () => {
        currentUser.subscribedChannels.includes(channel._id)
            ? await axios.put(`http://localhost:5000/api/users/unsub/${channel._id}`, {}, { headers: { Authorization: `Bearer ${token}` }})
            : await axios.put(`http://localhost:5000/api/users/sub/${channel._id}`, {}, { headers: { Authorization: `Bearer ${token}` }})
    
        dispatch(subscription(channel._id));

        // Update local subscriber count visual
        setChannel(prev => ({
            ...prev,
            subscribers: currentUser.subscribedChannels.includes(channel._id) ? prev.subscribers - 1 : prev.subscribers + 1
        }));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Left : Main Content */}
            <div className="flex-1">
                {/* Video Player */}
                <div className="sticky top-14 z-40 w-full bg-black aspect-video lg:max-h-137.5 shadow-lg">
                    <video 
                        src={video.videoUrl}
                        controls 
                        className="w-full h-full object-contain"
                        poster={video.imgUrl} 
                    />
                    {/* <iframe width="100%" height="100%" src={video.videoUrl} frameborder="0" allowFullScreen title="video" /> */}
                </div>
                {/* Scrollable Content */}
                <div className="mt-2">
                    <h1 className="px-3 text-lg md:text-xl font-medium">{video.title}</h1>
                    <div className="flex flex-col gap-3 justify-between">
                        <span className="px-3 text-sm font-semibold">{video.views} views • {format(video.createdAt)}</span>
                        <span className="px-3 text-sm font-light">{video.desc}</span>
                        {/* Channel Info */}
                        <div className="flex justify-between px-3">
                            <div className="flex gap-2 items-center">
                                <Link to={`/channel/${channel._id}`}>
                                    <div className="flex items-center gap-3">
                                        <img 
                                            src={channel.img || "/default_profile_pic.jpg"} 
                                            alt="Channel Avatar"
                                            className="w-12 h-12 rounded-full object-cover bg-gray-500 cursor-pointer" 
                                            />
                                        <span className="text-xs font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">{channel.username}</span>
                                    </div>
                                </Link>
                                <span className="text-xs font-extralight">{channel.subscribers}</span>
                            </div>
                            {currentUser?._id !== channel._id && (
                                <button
                                    onClick={handleSub} 
                                    className={`rounded-full px-3.5 text-xs font-medium bg-[#f1f1f1] cursor-pointer transition-colors
                                        ${currentUser?.subscribedUsers?.includes(channel._id)
                                        ? "bg-[#f2f2f2] text-black hover:bg-gray-800 dark:bg-white dark:text-white"
                                        : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black"
                                        }`}>
                                    {currentUser?.subscribedUsers?.includes(channel._id) ? "Subscribed" : "Subscribe"}
                                </button>     
                            )}
                        </div>
                        <div className="flex gap-2 px-3 flex-nowrap overflow-x-auto no-scrollbar">
                            <div className="flex rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 gap-2">
                                <button onClick={handleLike} className="flex items-center gap-2 cursor-pointer bg-transparent border-none">
                                    <ThumbsUp className={`w-4 h-4 ${video.likes?.includes(currentUser?._id) ? "text-[#3ea6ff]" : "text-black} dark:text-white"}`} /> <span className="text-sm mt-1">{video.likes?.length}</span>
                                </button>
                                <span>|</span>
                                <button onClick={handleDislike} className="flex items-center gap-1 cursor-pointer bg-transparent border-none">
                                    <ThumbsDown className={`w-4 h-4 ${video.dislikes?.includes(currentUser?._id) ? "text-[#3ea6ff]" : "text-black dark:text-white"}`} />
                                </button>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                                <Share2 className="w-4 h-4" /> <span className="text-xs font-medium">Share</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                                <ArrowDownToLine className="w-4 h-4" /> <span className="text-xs font-medium">Download</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                                <Bookmark className="w-4 h-4" /> <span className="text-xs font-medium">Save</span>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                                <Flag className="w-4 h-4" /> <span className="text-xs font-medium">Report</span>
                            </div>
                        </div>

                        {/* Comments Component */}
                        <div className="bg-[#f2f2f2] dark:bg-[#272727] rounded-xl mx-3 px-2 py-2">
                            <Comments videoId={video._id} />
                        </div>
                    </div>
                    
                </div>

                {/* <hr className='mt-3 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]' /> */}

                {/* Right : Recommendations */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4 py-4 md:px-4">
                    {videos.map((video) => (
                        <Card key={video._id} video={video} />
                    ))}
                </div> */}
                <div className="w-full lg:w-87.5">
                    <Recommendation tags={video.tags} />
                </div>
            </div>

        </div>
    );
};

export default Video;