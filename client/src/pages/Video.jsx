import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { ThumbsUp, ThumbsDown, Share2, ArrowDownToLine, Bookmark } from 'lucide-react';
import Comments from "../components/Comments";

function Video() {
    const [video, setVideo] = useState({});
    
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
        await axios.put(`http://localhost:5000/api/videos/like/${video._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        window.location.reload();
    };

    async function handleDislike() {
        await axios.put(`http://localhost:5000/api/videos/dislike/${video._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        window.location.reload();
    };

    return (
        <div className="flex flex-1 h-dvh overflow-y-auto dark:bg-[#0f0f0f] dark:text-white">
            {/* Main Content (Video + Details) */}
            <video src={video.videoUrl} />
        </div>
        // <div className="flex gap-6 px-8 py-4">
        //     {/* Main Content (Video + Details) */}
        //     <div className="flex-5">
        //         <div className="w-full h-125">
        //             <video 
        //                 src={video.videoUrl}
        //                 controls
        //                 // className="w-full h-125 object-cover bg-black"
        //             />
        //         </div>
        //         <h1 className="text-lg font-normal mt-5 mb-2.5">{video.title}</h1>
        //         <div className="flex items-center justify-between">
        //             {/* Channel Info */}
        //             <div className="flex justify-between gap-4">
        //                 <div className="flex gap-2.5">
        //                     <div className="w-12 h-12 rounded-full bg-gray-500"></div>
        //                     <div className="flex flex-col">
        //                         <span className="font-medium">LM3 Games</span>
        //                         <span className="text-xs">100K subscribers</span>    
        //                     </div>
        //                 </div>
        //                 <button className="bg-[#cc1a00] font-medium border-none rounded px-5 h-max py-2.5 cursor-pointer uppercase tracking-wide">
        //                     Subscribe
        //                 </button>
        //             </div>
                    
        //             <div className="flex gap-5">
        //                 <button onClick={handleLike} className="flex items-center gap-1 cursor-pointer bg-transparent border-none">
        //                     <ThumbsUp /> {video.likes?.length}
        //                 </button>
        //                 <button onClick={handleDislike} className="flex items-center gap-1 cursor-pointer bg-transparent border-none">
        //                     <ThumbsDown />
        //                 </button>
        //                 <div className="flex items-center gap-1 cursor-pointer">
        //                     <Share2 /> Share
        //                 </div>
        //                 <div className="flex items-center gap-1 cursor-pointer">
        //                     <ArrowDownToLine /> Download
        //                 </div>
        //                 <div className="flex items-center gap-1 cursor-pointer">
        //                     <Bookmark /> Save
        //                 </div>
        //             </div>
        //         </div>

        //         <hr className="my-4" />

        //         <span>{video.views} views • {video.createdAt}</span>
        //         <p className="mt-2 text-sm">{video.desc}</p>

        //         <hr className="my-4" />

        //         {/* Comments Component */}
        //         <Comments videoId={video._id} />
        //     </div>

        //     {/* Recommendation Sidebar */}
        //     <div className="flex-2 hidden lg:block">
        //         <h2 className="text-sm mb-3">Recommended</h2>
        //         <div className="w-full h-24 mb-2 rounded bg-gray-500"></div>
        //         <div className="w-full h-24 mb-2 rounded bg-gray-500"></div>
        //         <div className="w-full h-24 mb-2 rounded bg-gray-500"></div>
        //     </div>
        // </div>
    );
};

export default Video;