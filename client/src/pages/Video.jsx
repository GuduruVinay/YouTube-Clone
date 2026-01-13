import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, ArrowDownToLine, Bookmark, Flag } from 'lucide-react';
import Comments from "../components/Comments";
import VideoCard from "../components/VideoCard";
import useFetch from "../hooks/useFetch";
import { LoadingHandler, ErrorHandler } from "../components/Handler";
import { format } from "timeago.js";

function Video() {
    const [video, setVideo] = useState({});
    const [channel, setChannel] = useState({});

    // Get videoId from URL
    const path = useLocation().pathname.split("/")[2];

    // User State
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Video Data
                const videoRes = await axios.get(`http://localhost:5000/api/videos/find/${path}`);
                setVideo(videoRes.data);

                // Fetch Channel Data
                const channelRes = await axios.get(`http://localhost:5000/api/users/find/${videoRes.data.userId}`);
                setChannel(channelRes.data);
            } catch(err) {
                console.error("Error:", err.message);
            }
        };
        fetchData(); 
    }, [path]);

    // Handle Like
    async function handleLike() {
        // Check if user is logged in
        if(!currentUser) return alert("Please sign in to like videos.");

        setVideo((prev) => {
            // Check if already liked
            const isLiked = prev.likes.includes(currentUser._id);
            if(isLiked) {
                // Toggle OFF : Remove user from likes
                return {
                    ...prev,
                    likes: prev.likes.filter((id) => id !== currentUser._id)
                };
            } else {
                // Toggle ON : Add user to likes, Remove from dislikes
                return {
                    ...prev,
                    likes: [...prev.likes, currentUser._id],
                    dislikes: prev.dislikes.filter((id) => id !== currentUser._id)
                };
            }
        });
        try {
            await axios.put(`http://localhost:5000/api/videos/like/${video._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch(err) {
            console.error(err);
        }
    };

    // Handle Dislike
    async function handleDislike() {
        // Check if user is logged in
        if(!currentUser) return alert("Please sign in to dislike videos.");
        
        setVideo((prev) => {
            // Check if already liked
            const isDisliked = prev.dislikes.includes(currentUser._id);
            if(isDisliked) {
                // Toggle OFF : Remove user from likes
                return {
                    ...prev,
                    dislikes: prev.dislikes.filter((id) => id !== currentUser._id)
                };
            } else {
                // Toggle ON : Add user to dislikes, Remove from likes
                return {
                    ...prev,
                    dislikes: [...prev.dislikes, currentUser._id],
                    likes: prev.likes.filter((id) => id !== currentUser._id)
                };
            }
        });
        try {
            await axios.put(`http://localhost:5000/api/videos/dislike/${video._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch(err) {
            console.error(err);
        }
    };

    async function handleSub() {
      try {
        if(currentUser.subscribedUsers.includes(channel._id)) {
            // Unsubscribe
            await axios.put(`http://localhost:5000/api/users/unsub/${channel._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update Local State & Storage
            const updatedUser = {
                ...currentUser,
                subscribedUsers: currentUser.subscribedUsers.filter((id) => id !== channel._id)
            };
            setCurrentUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            // Update Channel Subscriber Count ( Visual only)
            setChannel((prev) => ({ ...prev, subscribers: prev.subscribers - 1 }));
        } else {
            // Subscribe
            await axios.put(`http://localhost:5000/api/users/sub/${channel._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updatedUser = {
                ...currentUser,
                subscribedUsers: [...currentUser.subscribedUsers, channel._id]
            };
            setCurrentUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));

            setChannel((prev) => ({ ...prev, subscribers: prev.subscribers + 1 }));
        }
      } catch(err) {
        console.log(err);
      } 
    };

    // Fetch random videos
    const { data: videos, loading, error } = useFetch("http://localhost:5000/api/videos/random");
    if(loading) return <LoadingHandler />
    if(error) return <ErrorHandler error={error}/>

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
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
                        <span className="px-3 text-sm font-extralight">{video.views} views • {format(video.createdAt)}</span>
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

                <hr className='mt-3 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]' />

                {/* Recommendation Sidebar */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4 py-4 md:px-4">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Video;