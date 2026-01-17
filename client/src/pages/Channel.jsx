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

    // Handle Delete Channel
    const handleDeleteChannel = async () => {
        if(!window.confirm("Are you sure you want to delete this channel? All videos will be lost.")) return;
        try {
            await axios.delete(`http://localhost:5000/api/channels/${channel._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(channelDeleted(channel._id));
            alert("Channel deleted successfully");
            navigate("/");
        } catch(err) {
            console.error(err);
            alert("Failed to delete channel");
        }
    };

    // Handle Delete Video
    const handleDeleteVideo = async (videoId) => {
        if(!window.confirm("Are you sure you want to delete this video?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/videos/${videoId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Remove video from list
            setVideos((prev => prev.filter(v => v._id !== videoId)));
        } catch (err) {
            console.error(err);
        }
    }

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
        <div className="flex flex-col w-full h-full dark:text-white overflow-y-auto">
            {/* Channel Banner */}
            <div className="h-37.5 md:h-50 w-full bg-linear-to-r from-blue-800 to-purple-800">
                {channel.channelBanner && (
                    <img 
                        src={channel.channelBanner} 
                        alt="Channel Banner" 
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            {/* Channel Header Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5 px-10 py-8 bg-[#f9f9f9] dark:bg-[#1e1e1e]">
                <img 
                    src={channel.channelAvatar || "/default_profile_pic.jpg"}
                    alt="Channel Icon"
                    className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-[#1e1e1e] shadow-lg -mt-12 md:mt-0" 
                />

                <div className="flex flex-col items-center md:items-start flex-1 gap-2">
                    <h1 className="text-2xl font-bold">{channel.channelName}</h1>
                    <div className="text-gray-500 text-sm flex gap-3">
                        <span>@{channel.handle}</span>
                        <span> • {channel.subscribers} subscribers</span>
                        <span> • {videos.length} videos</span>
                    </div>
                    <p className="text-sm text-gray-500 max-w-150 text-center md:text-left">
                        {channel.description || "No description available."}
                    </p>
                    <div className="mt-4">
                        {currentUser?._id === channel.owner ? (
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleOpenUpload()}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#3ea6ff] text-white font-bold rounded-full hover:bg-[#3ea6ff]/90 transition-colors"
                                >
                                    <Upload /> Upload Video
                                </button>
                                <button
                                    onClick={() => setOpenEdit(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-[#3ea6ff] text-white font-bold rounded-full hover:bg-[#3ea6ff]/90 transition-colors"
                                >
                                    <Edit2 /> Edit Channel
                                </button>
                                <button
                                    onClick={handleDeleteChannel}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <Trash2 /> Delete Channel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={handleSub}
                                className={`mt-2 px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                                    currentUser.subscribedChannels.includes(channel._id)
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
            <div className="px-10 pb-10">
                <h2 className="text-lg font-bold mb-4">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.map((video) => (
                        <Card 
                            key={video._id} 
                            video={video}
                            enableEdit={currentUser?._id === channel.owner}
                            onEdit={handleEditVideo}
                            onDelete={handleDeleteVideo} 
                        />
                    ))}
                    {videos.length === 0 && (
                        <p className="text-gray-500">This channel has no videos yet.</p>
                    )}
                </div>
            </div>
            {openUpload && (
                <UploadVideo 
                    openUploadVideo={openUpload} 
                    setOpenUploadVideo={setOpenUpload} 
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
        </div>
    );
};

export default Channel;