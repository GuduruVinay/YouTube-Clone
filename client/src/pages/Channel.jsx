import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import VideoCard from "../components/VideoCard";

function Channel() {
    const [channel, setChannel] = useState({});
    const [videos, setVideos] = useState([]);

    // Get the ID from the URL (channel/:id)
    const { id } = useParams();

    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Channel Data (User info)
                const channelRes = await axios.get(`http://localhost:5000/api/users/find/${id}`);
                setChannel(channelRes.data);

                // Fetch Channel Videos
                const videoRes = await axios.get(`http://localhost:5000/api/videos/user/${id}`);
                setVideos(videoRes.data); 
            } catch(err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="flex flex-col gap-5 px-5 md:px-12 py-5">
            {/* Channel Header */}
            <div className="flex items-center gap-5 mb-5">
                {/* Profile Image */}
                <img 
                    src={channel.img || "/default_profile_pic.jpg"}
                    alt="Channel Avatar"
                    className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover bg-gray-500" 
                />

                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl md:text-3xl font-bold">{channel.name}</h1>
                    <span>@{channel.name} • {channel.subscribers} subscribers</span>
                    <p className="text-sm text-gray-500 max-w-125">{channel.email} • This is the channel description area.</p>
                    {currentUser?._id === channel._id ? (
                        <button className="mt-3 px-4 py-2 bg-[#f2f2f2] dark:bg-[#272727] text-black dark:text-white font-bold rounded-full text-sm w-fit hover:bg-[#d9d9d9] dark:hover:bg-[#3f3f3f]">
                            Customize Channel
                        </button>
                    ) : (
                        <button className="mt-3 px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full text-sm w-fit hover:bg-gray-800 dark:hover:bg-gray-200">
                            Subscribe
                        </button>
                    )}
                </div>
            </div>

            <hr className="border-gray-200 dark:border-[#3f3f3f]" />

            {/* Video Grid */}
            <div>
                <h2 className="text-lg font-bold mb-4 dark:text-white">Videos</h2>
                <div className="flex flex-wrap gap-y-10 gap-x-3">
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                    {videos.length === 0 && (
                        <p className="text-gray-500">This channel has no videos yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Channel;