import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { LoadingHandler } from "../components/Handler";
import { channelDeleted, subscription } from "../redux/userSlice";
import UploadVideo from "../components/UploadVideo";
import { Edit2, Trash2, Upload } from "lucide-react";
import CreateChannel from "../components/CreateChannel";
import toast from "react-hot-toast";
import ConfirmPopup from "../components/ConfirmPopup";

const Channel = () => {
    // Get the ID from the URL (channel/:id)
    const { id } = useParams();
    const { currentUser } = useSelector((state) => state.user);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const token = localStorage.getItem("token");
    
    const [channel, setChannel] = useState(null);
    const [videos, setVideos] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [openUpload, setOpenUpload] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [confirmPopup, setConfirmPopup] = useState({
        isOpen: false,
        type: null,
        id: null
    });

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                // Get Channel Details
                const channelRes = await axios.get(`http://localhost:5000/api/channels/find/${id}`);
                setChannel(channelRes.data);
                // Get Videos for this hannel
                const videoRes = await axios.get(`http://localhost:5000/api/videos/channel/${id}`);
                setVideos(videoRes.data);
            } catch(err) {
                console.error(err);
            }
        };
        fetchChannelData();
    }, [id]);

    // Handle Subsription
    const handleSub = async () => {
        try {
            if(currentUser.subscribedChannels.includes(channel._id)) {
                await axios.put(`http://localhost:5000/api/users/unsub/${channel._id}`, {}, { headers: { Authorization: `Bearer ${token}` }})
            } else {
                await axios.put(`http://localhost:5000/api/users/sub/${channel._id}`, {}, { headers: { Authorization: `Bearer ${token}` }})
            }
            dispatch(subscription(channel._id));
            setChannel(prev => ({
                ...prev,
                subscribers: currentUser.subscribedChannels.includes(channel._id) ? prev.subscribers - 1 : prev.subscribers + 1
            }));
        } catch(err) {
            console.log(err);
        }
    };

    const clickDeleteChannel = () => {
        setConfirmPopup({
            isOpen: true,
            type: "channel",
            id: channel._id
        });
    };

    const clickDeleteVideo = (videoId) => {
        setConfirmPopup({
            isOpen: true,
            type: "video",
            id: videoId
        });
    };

    const handleConfirmDelete = async () => {
        if(confirmPopup.type === "channel") {
            try {
                await axios.delete(`http://localhost:5000/api/channels/${confirmPopup.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                dispatch(channelDeleted(confirmPopup.id));
                toast.success("Channel deleted successfully");
                navigate("/");
            } catch(err) {
                console.error(err);
                toast.error("Failed to delete channel");
            }
        } else if(confirmPopup.type === "video") {
            try {
                await axios.delete(`http://localhost:5000/api/videos/${confirmPopup.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Remove video from list
                setVideos((prev => prev.filter(v => v._id !== confirmPopup.id)));
                toast.success("Video deleted successfully");
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete video");
            }
        }
    };

    // Handle open edit video
    const handleEditVideo = (video) => {
        setSelectedVideo(video);
        setOpenUpload(true);
    }

    // Handle open video
    const handleOpenUpload = () => {
        setSelectedVideo(null);
        setOpenUpload(true);
    }

    if(!channel) return <LoadingHandler />

    return (
        <div className="flex flex-col">
            {/* Channel Banner */}
            <div className="h-32 md:h-52 w-full bg-linear-to-r from-blue-800 to-purple-800">
                {channel?.channelBanner && (
                    <img 
                        src={channel?.channelBanner} 
                        alt="" 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            {/* Channel Header Info */}
            <div className="flex flex-col md:flex-row lg:justify-center items-center md:items-start gap-2 md:gap-4 px-10 py-8 bg-[#f9f9f9] dark:bg-[#1e1e1e]">
                <img 
                    src={channel?.channelAvatar || "/default_profile_pic.jpg"}
                    alt="Channel Icon"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-[#1e1e1e] shadow-lg -mt-12 md:mt-0" 
                />
                <div className="flex flex-col lg:flex-row lg:gap-16 items-center md:items-start lg:items-center">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-center md:text-start text-2xl font-bold">{channel.channelName}</h1>
                        <div className="text-gray-500 text-sm flex gap-3">
                            <span>@{channel.handle}</span>
                            <span> • {channel.subscribers} subscribers</span>
                            <span> • {videos.length} videos</span>
                        </div>
                        <p className="text-sm text-gray-500 max-w-150 text-center md:text-left">
                            {channel.description || "No description available."}
                        </p>
                    </div>
                    <div className="mt-4">
                        {currentUser?._id === channel.owner ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleOpenUpload()}
                                    className="flex items-center gap-1 px-4 py-2 bg-[#3ea6ff] text-white font-bold rounded-full hover:bg-[#3ea6ff]/90 transition-colors"
                                >
                                    <Upload /> Upload<span className="hidden md:block">Video</span>
                                </button>
                                <button
                                    onClick={() => setOpenEdit(true)}
                                    className="flex items-center gap-1 px-4 py-2 bg-[#3ea6ff] text-white font-bold rounded-full hover:bg-[#3ea6ff]/90 transition-colors"
                                >
                                    <Edit2 /> Edit<span className="hidden md:block">Channel</span>
                                </button>
                                <button
                                    onClick={clickDeleteChannel}
                                    className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 /> Delete<span className="hidden md:block">Channel</span>
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleSub}
                                className={`mt-2 px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                                    currentUser?.subscribedChannels.includes(channel._id)
                                    ? "bg-gray-200 text-black dark:bg-[#303030] dark:text-white"
                                    : "bg-black text-white dark:bg-white dark:text-black"
                                }`}
                            >
                                {currentUser?.subscribedChannels.includes(channel._id) ? "Subscribed" : "Subscribe"}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* <hr className="border-gray-200 dark:border-[#3f3f3f]" /> */}
            <div className="border-b border-gray-200 dark:border-[#373737] mb-6"></div>

            {/* Channel Videos*/}
            <div className="px-4 lg:px-10 pb-10">
                <h2 className="pl-3 text-lg font-bold mb-4">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <Card 
                            key={video._id} 
                            video={video}
                            enableEdit={currentUser?._id === channel.owner}
                            onEdit={handleEditVideo}
                            onDelete={clickDeleteVideo} 
                        />
                    ))}
                    {videos.length === 0 && (
                        <p className="text-gray-500">This channel has no videos yet.</p>
                    )}
                </div>
            </div>
            {openUpload && (
                <UploadVideo 
                    open={openUpload} 
                    setOpen={setOpenUpload} 
                    existingVideo={selectedVideo}
                    setVideos={setVideos}
                />
            )}
            {openEdit && (
                <CreateChannel 
                    open={openEdit}
                    setOpen={setOpenEdit}
                    existingChannel={channel}
                    setChannelData={setChannel}
                />
            )}
            <ConfirmPopup 
                isOpen={confirmPopup.isOpen}
                onClose={() => setConfirmPopup({ ...confirmPopup, isOpen: false })}
                onConfirm={handleConfirmDelete}
                title={confirmPopup.type === "channel" ? "Delete Channel ?" : "Delete Video ?"}
                message={confirmPopup.type === "channel"
                    ? "Are you sure you want to delete this channel? All videos and subscribers will be lost permanently."
                    : "This video will be permanently deleted. You cannot undo this action."
                }
                confirmText="Yes, Delete"
            />
        </div>
    );
};

export default Channel;