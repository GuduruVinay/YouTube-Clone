import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { formatNumber } from "../utils/formatter";
import { useSelector } from "react-redux";
import { Edit2, EllipsisVertical, Trash2 } from "lucide-react";

const Card = ({ type, video, enableEdit = false, onEdit, onDelete }) => {
    const { currentUser } = useSelector(state => state.user);

    const [openCardMenu, setOpenCardMenu] = useState(false);

    const cardMenuRef = useRef(null);

    // Check if current user is owner
    const isOwner = currentUser?._id === video.userId;

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

    
    // Handle Click Outside
    useEffect(() => {
        const handler = (e) => {
            // Check Card Menu
            if(openCardMenu && cardMenuRef.current && !cardMenuRef.current.contains(e.target)) {
                setOpenCardMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [openCardMenu]);
    
    // Check if type is "sm"
    const isSmall = type === "sm";

    return (
        <div className="w-full gap-2 cursor-pointer relative group">
            {enableEdit && isOwner && (
                <div 
                    ref={cardMenuRef}
                    className={`absolute right-2 z-20`}
                >
                    <button 
                        className="mt-2 cursor-pointer flex items-center justify-center w-10 h-10 hover:bg-[#d9d9d9] dark:hover:bg-[#3d3d3d] rounded-full transition-colors"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setOpenCardMenu(!openCardMenu)
                        }}    
                    >
                        <EllipsisVertical size={18} />
                    </button>
                    {openCardMenu && (
                        <div className="absolute right-1 top-full w-32 bg-white dark:bg-[#222] border border-[#f2f2f2] dark:border-[#333] rounded-xl shadow-lg py-2 z-20 flex flex-col overflow-hidden">
                            <button
                                className="flex items-center gap-3 w-full rounded-lg px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white text-left transition-colors"
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    e.stopPropagation();
                                    setOpenCardMenu(false); 
                                    onEdit(video); 
                                }}
                            >
                                <Edit2 />
                                <span className="font-medium">Edit</span>
                            </button>
                            <button
                                className="flex items-center gap-3 w-full rounded-lg px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white text-left transition-colors"
                                onClick={(e) => { 
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setOpenCardMenu(false);  
                                    onDelete(video._id); 
                                }}
                            >
                                <Trash2 />
                                <span className="font-medium">Delete</span>
                            </button>
                        </div>
                    )}
                </div>
            )}
            <Link to={`/video/${video._id}`}>
                {/* Container: Verical bg default, Horizontal(flex) is small */}
                <div className={`flex gap-2 px-1 cursor-pointer ${isSmall ? "flex-col lg:flex-row" : "flex-col"}`}>
                    {/* Thumbnail */}
                    <div className={`relative ${isSmall ? "flex-1 min-w-40 h-24 lg:h-36" : "w-full lg:h-64"}`}>
                        <img 
                            src={video.thumbnailUrl} 
                            alt={video.title + "thumbnail"}
                            className="w-full h-full object-cover rounded-xl bg-white dark:bg-black hover:rounded-none transition-all duration-300"
                        />
                    </div>
                    {/* Details */}
                    <div className={`flex gap-3 lg:mt-1 ${isSmall ? "flex-1" : ""}`}>
                        {/* Channel Avatar */}
                        <img 
                            src={channel.channelAvatar || "/default_profile_pic.jpg"} 
                            alt={channel.username + "avatar"}
                            className={`${isSmall ? "lg:hidden" : "block"} ml-2 h-9 w-9 rounded-full object-cover bg-gray-500`} 
                        />
                        <div className="flex flex-col">
                            {/* Video Title */}
                            <h1 className={`font-bold dark:text-white leading-tight mb-1 ${isSmall ? "text-sm" : "text-base"}`}>{video.title}</h1>
                            {/* Channel Name */}
                            <h2 className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">{channel.channelName}</h2>
                            {/* Views • Date */}
                            <div className="text-xs text-gray-500">
                                {formatNumber(video.views)} views • {format(video.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;