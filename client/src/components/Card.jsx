import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Card = ({ type, video }) => {
    const [channel, setChannel] = useState({});

    useEffect(() => {
        const fetchChannel = async () => {
            try{
                // Fetch Channel Data using channelId from the video object
                const res = await axios.get(`http://localhost:5000/api/channels/find/${video.channelId}`);
                setChannel(res.data);
            } catch(err) {
                console.log(err);
            }
        }; 
        fetchChannel(); 
    }, [video.channelId]);

    // Check if type is "sm"
    const isSmall = type === "sm";

    return (
        <Link to={`/video/${video._id}`} className="w-full">
            {/* Container: Verical bg default, Horizontal(flex) is small */}
            <div className={`flex gap-3 mb-10 cursor-pointer ${isSmall ? "flex-row mb-2" : "flex-col w-full"}`}>
                {/* Thumbnail */}
                <div className={`relative ${isSmall ? "flex-1 min-w-40 h-25" : "w-full h-50"}`}>
                    <img 
                        src={video.imgUrl} 
                        alt={video.title + "thumbnail"}
                        className="w-full h-full object-cover rounded-xl bg-gray-800"
                    />
                </div>
                {/* Details */}
                <div className={`flex gap-3 mt-1 ${isSmall ? "flex-1" : ""}`}>
                    {/* Channel Avatar */}
                    {!isSmall && (
                        <img 
                            src={channel.channelBanner || channel.img || "/default_profile_pic.jpg"} 
                            alt={channel.username + "avatar"}
                            className="h-9 w-9 rounded-full object-cover bg-gray-500" 
                        />
                    )}
                    <div className="flex flex-col">
                        {/* Video Title */}
                        <h1 className={`font-bold dark:text-white leading-tight mb-1 ${isSmall ? "text-sm" : "text-base"}`}>{video.title}</h1>
                        {/* Channel Name */}
                        <h2 className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{channel.username}</h2>
                        {/* Views • Date */}
                        <div className="text-xs text-gray-500">
                            {video.views} views • {format(video.createdAt)}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;

// <div className="flex flex-col cursor-pointer gap-2 px-1">
//     <img 
//         src={video.imgUrl} 
//         alt={video.title}
//         className="w-full h-48 lg:h-64 bg-[#999] rounded-xl object-cover hover:rounded-none transition-all duration-300"
//     />

//     <h1 className="text-base font-medium">{video.title}</h1>
//     <h2 className="text-sm my-1">LM3 Games</h2>
