import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, ArrowDownToLine, Bookmark, Flag } from 'lucide-react';
import { format } from "timeago.js";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../utils/formatter";

// Redux Actions
import { subscription } from "../redux/userSlice";
import { like, dislike, fetchSuccess } from "../redux/videoSlice";

// Components
import Comments from "../components/Comments";
import Recommendation from "../components/Recommendation";
import { LoadingHandler } from "../components/Handler";
import toast from "react-hot-toast";

const Video = () => {
    const { currentUser } = useSelector((state) => state.user);
    const { currentVideo } = useSelector((state) => state.video);

    const dispatch = useDispatch();

    // Get videoId from URL
    const path = useLocation().pathname.split("/")[2];

    const [channel, setChannel] = useState({});
    const [showDescription, setShowDescription] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Video Data
                const videoRes = await axios.get(`http://localhost:5000/api/videos/find/${path}`);
                // Get Channel Data (using channelId from video)
                const channelRes = await axios.get(`http://localhost:5000/api/channels/find/${videoRes.data.channelId}`);
                // Update Local State (Channel) & Redux(Video)
                setChannel(channelRes.data);
                dispatch(fetchSuccess(videoRes.data));
                // Increment View Count
                await axios.put(`http://localhost:5000/api/videos/view/${path}`);
            } catch(err) {
                console.error("Error fetching video data: ", err);
            }
        };
        fetchData(); 
    }, [path, dispatch]);

    // Handle Like
    const handleLike = async () => {
        if(!currentUser) return toast.error("Please sign in to like videos!");
        try {
            await axios.put(`http://localhost:5000/api/users/like/${currentVideo._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch(like(currentUser._id));
        } catch(err) {
            console.log(err);
        }
    };

    // Handle Dislike
    const handleDislike = async () => {
        if(!currentUser) return toast.error("Please sign in to dislike videos!");
        try {
            await axios.put(`http://localhost:5000/api/users/dislike/${currentVideo._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
            dispatch(dislike(currentUser._id));
        } catch(err) {
            console.log(err);
        }
    };

    // Handle Subsription
    const handleSub = async () => {
        if(!currentUser) return toast.error("Please sign in to subscribe!");
        try {
            if(currentUser.subscribedChannels.includes(channel._id)) {
                await axios.put(`http://localhost:5000/api/users/unsub/${channel._id}`, {}, { 
                    headers: { Authorization: `Bearer ${token}` }
                });
                setChannel((prev) => ({ ...prev, subscribers: prev.subscribers - 1 }));
            } else {
                await axios.put(`http://localhost:5000/api/users/sub/${channel._id}`, {}, { 
                    headers: { Authorization: `Bearer ${token}` }
                });
                setChannel((prev) => ({ ...prev, subscribers: prev.subscribers + 1 }));
            }
            // Update User Redux State
            dispatch(subscription(channel._id));
        } catch(err) {
            console.log(err);
        }
    };

    const getYouTubeEmbedUrl = (url) => {
        if(!url) return "";
        // Regex to find video ID from various YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        if(match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1`
        }
        return url;
    }

    // Prevent crash if data hasn't loaded yet
    if(!currentVideo || !channel._id) return <LoadingHandler />

    return (
        <div className="flex flex-col lg:flex-row lg:pl-8 lg:py-4 gap-6 lg:gap-0 justify-center">
            {/* Left Section: Video Player & Details */}
            <div className="flex-1 lg:max-w-5xl">
                {/* Video Player */}
                <div className="sticky top-14 md:static z-40 w-full bg-black aspect-video shadow-lg">
                    <iframe 
                        width="100%" 
                        height="100%" 
                        src={getYouTubeEmbedUrl(currentVideo.videoUrl)}
                        title="YouTube video player"
                        allow="autoplay;"
                        allowFullScreen
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Scrollable Content */}
                <div className="mt-2">
                    {/* Title */}
                    <h1 className="px-3 text-lg md:text-xl font-medium">{currentVideo.title}</h1>
                    <div className="flex flex-col gap-3 justify-between">
                        <div className="flex flex-col gap-1">
                            <span className="px-3 text-xs font-light">{formatNumber(currentVideo.views)} views • {format(currentVideo.createdAt)}</span>
                            <div className="flex items-center gap-3 px-3">
                                <span className="text-xs font-light">{currentVideo.tags.map(tag => "#"+tag.toLowerCase()+" ")}</span>
                                <span onClick={() => setShowDescription(!showDescription)} className="text-xs font-light">{showDescription ? "...less" : "...more"}</span>
                            </div>
                        </div>
                        {showDescription && <span className="px-3 text-sm font-light">{currentVideo.description}</span>}
                        {/* Channel Info */}
                        <div className="flex flex-col md:flex-row px-3 md:items-center md:justify-between">
                            <div className="flex justify-between md:justify-start gap-8 items-center">
                                <div className="flex gap-2 items-center">
                                    <Link to={`/channel/${channel._id}`}>
                                        <div className="flex items-center gap-3">
                                            <img 
                                                src={channel.channelAvatar || "/default_profile_pic.jpg"} 
                                                alt="Channel Avatar"
                                                className="w-12 h-12 rounded-full object-cover bg-gray-500 cursor-pointer" 
                                                />
                                            <div className="flex md:flex-col gap-1">
                                                <span className="text-xs font-medium cursor-pointer hover:text-gray-700 dark:hover:text-gray-300">{channel.channelName}</span>
                                                <span className="flex gap-1 text-xs font-extralight">{formatNumber(channel.subscribers)} <span className="hidden md:block">subscribers</span></span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                {currentUser?._id !== channel._id && (
                                    <button
                                        onClick={handleSub} 
                                        className={`rounded-full h-fit px-3.5 py-2 md:py-3 lg:py-2 text-sm bg-[#f1f1f1] cursor-pointer transition-colors
                                            ${currentUser?.subscribedChannels?.includes(channel._id)
                                            ? "bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] dark:text-white"
                                            : "bg-[#ff0033] hover:bg-[#bc0007] text-white dark:bg-[#f2f2f2] dark:hover:bg-[#d9d9d9] dark:text-black"
                                            }`}>
                                        {currentUser?.subscribedChannels?.includes(channel._id) ? "Subscribed" : "Subscribe"}
                                    </button>     
                                )}
                            </div>
                            <div className="mt-3 md:mt-0 flex h-fit gap-2 flex-nowrap overflow-x-auto no-scrollbar">
                                <div className="flex rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 md:py-2 gap-2">
                                    <button onClick={handleLike} className="flex items-center gap-2 cursor-pointer bg-transparent border-none hover:scale-110">
                                        <ThumbsUp className={`w-4 h-4 ${currentVideo.likes?.includes(currentUser?._id) ? "text-[#3ea6ff]" : "text-black dark:text-white"}`} /> <span className="text-sm mt-1">{formatNumber(currentVideo.likes?.length)}</span>
                                    </button>
                                    <span>|</span>
                                    <button onClick={handleDislike} className="flex items-center gap-1 cursor-pointer bg-transparent border-none hover:scale-110">
                                        <ThumbsDown className={`w-4 h-4 ${currentVideo.dislikes?.includes(currentUser?._id) ? "text-[#3ea6ff]" : "text-black dark:text-white"}`} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] px-3 py-1 md:py-2 cursor-pointer">
                                    <Share2 className="w-4 h-4" /> <span className="text-xs font-medium">Share</span>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] px-3 py-1 md:py-2 cursor-pointer">
                                    <ArrowDownToLine className="w-4 h-4" /> <span className="text-xs font-medium">Download</span>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] px-3 py-1 md:py-2 cursor-pointer">
                                    <Bookmark className="w-4 h-4" /> <span className="text-xs font-medium">Save</span>
                                </div>
                                <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] px-3 py-1 md:py-2 cursor-pointer">
                                    <Flag className="w-4 h-4" /> <span className="text-xs font-medium">Report</span>
                                </div>
                            </div>
                        </div>
                        {/* Comments Component */}
                        <div className="bg-[#f2f2f2] dark:bg-[#272727] rounded-xl mx-3 p-2">
                            <Comments videoId={currentVideo._id} />
                        </div>
                    </div>
                </div>
            </div>
            
            <hr className='border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f] lg:hidden' />

            <div className="lg:max-w-lg">
                <Recommendation tags={currentVideo.tags} />
            </div>
        </div>
    );
};

export default Video;