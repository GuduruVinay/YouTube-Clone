import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ThumbsUp, ThumbsDown, Share2, ArrowDownToLine, Bookmark, Flag } from 'lucide-react';
import Comments from "../components/Comments";
import VideoCard from "../components/VideoCard";
import useFetch from "../hooks/useFetch";
import { LoadingHandler, ErrorHandler } from "../components/Handler";

function Video() {
    const [video, setVideo] = useState(null);

    // Get videoId from URL
    const path = useLocation().pathname.split("/")[2];
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:5000/api/videos/find/${path}`);
                setVideo(res.data);
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
                // TOGGLE OFF : Remove user from likes
                return {
                    ...prev,
                    likes: prev.likes.filter((id) => id !== currentUser._id)
                };
            } else {
                // TOGGLE ON : Add user to likes, Remove from dislikes
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
                // TOGGLE OFF : Remove user from likes
                return {
                    ...prev,
                    dislikes: prev.dislikes.filter((id) => id !== currentUser._id)
                };
            } else {
                // TOGGLE ON : Add user to dislikes, Remove from likes
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

    // Fetch random videos
    const { data: videos, loading, error } = useFetch("http://localhost:5000/api/videos/random");
    if(loading) return <LoadingHandler />
    if(error) return <ErrorHandler error={error}/>

    return (
        <div className="flex flex-col">
            {/* Main Content (Video + Details) */}
            <video 
                src={video.videoUrl}
                controls 
                className="w-full lg:w-125" 
            />

            <div className="flex flex-col gap-3 pt-3">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 px-3">
                        <h1 className="font-medium">{video.title}</h1>
                        <span className="text-xs font-extralight">{video.views} views • {video.createdAt}</span>
                        {/* <p className="text-sm">{video.desc}</p> */}
                    </div>

                    {/* Channel Info */}
                    <div className="flex justify-between px-3">
                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-500"></div>
                            <span className="text-xs font-medium">LM3 Games</span>
                            <span className="text-xs font-extralight">100K</span>
                        </div>
                        <button className="rounded-full px-3.5 text-xs font-medium bg-[#f1f1f1] text-black cursor-pointer">
                            Subscribe
                        </button>     
                    </div>
            
                    <div className="flex gap-2 px-3 flex-nowrap overflow-x-auto no-scrollbar">
                        <div className="flex rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 gap-2">
                            <button onClick={handleLike} className="flex items-center gap-2 cursor-pointer bg-transparent border-none">
                                <ThumbsUp size={16} style={{ color: video.likes?.includes(currentUser?._id) ? "#3ea6ff" : "white"}} /> <span className="text-sm mt-1">{video.likes?.length}</span>
                            </button>
                            <span>|</span>
                            <button onClick={handleDislike} className="flex items-center gap-1 cursor-pointer bg-transparent border-none">
                                <ThumbsDown size={16} style={{ color: video.dislikes?.includes(currentUser?._id) ? "#3ea6ff" : "white"}} />
                            </button>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                            <Share2 size={16} /> <span className="text-xs font-medium">Share</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                            <ArrowDownToLine size={16} /> <span className="text-xs font-medium">Download</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                            <Bookmark size={16} /> <span className="text-xs font-medium">Save</span>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-[#f2f2f2] dark:bg-[#272727] px-3 py-1 cursor-pointer">
                            <Flag size={16} /> <span className="text-xs font-medium">Report</span>
                        </div>
                    </div>
                </div>

                {/* Comments Component */}
                <div className="bg-[#f2f2f2] dark:bg-[#272727] rounded-xl mx-3 px-2 py-2">
                     <Comments videoId={video._id} />
                </div>

                <hr className='border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]' />

                {/* Recommendation Sidebar */}
                <div className="flex flex-col">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Video;