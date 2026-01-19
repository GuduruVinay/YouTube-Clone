import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate}  from "react-router-dom";
import axios from "axios";
import { uploadStart, uploadSuccess, uploadFailure } from "../redux/videoSlice"
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { videoSchema } from "../utils/validation";
import z from "zod";

const UploadVideo = ({ open, setOpen, existingVideo = null, setVideos }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [inputs, setInputs] = useState({});
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState("");

    const [userChannels, setUserChannels] = useState([]);

    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChannelNames = async () => {
            if(currentUser?.channels) {
                try {
                    // Create an array of API calls for each channel ID
                    const channelPromises = currentUser.channels.map(id => 
                        axios.get(`http://localhost:5000/api/channels/find/${id}`)
                    );
                    // Wait for all to finish
                    const responses = await Promise.all(channelPromises);
                    // Extract data
                    const channelsData = responses.map(res => res.data);
                    setUserChannels(channelsData);
                    // Set default selected channel to the first one found
                    if(channelsData.length > 0) {
                        setSelectedChannel(channelsData[0]._id);
                    }
                } catch(err) {
                    console.error("Failed to load user channels", err);
                }
            }
        };
        fetchChannelNames();
    }, [currentUser]);

    useEffect(() => {
        if(existingVideo) {
            setInputs({
                title: existingVideo.title,
                description: existingVideo.description,
                thumbnailUrl: existingVideo.thumbnailUrl,
                videoUrl: existingVideo.videoUrl
            });
            setTags(existingVideo.tags || []);
        }
    }, [existingVideo]);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTags = (e) => {
        setTags(e.target.value.split(","));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToValidate = {
            ...inputs,
            tags: Array.isArray(tags) ? tags : (typeof tags === "string" ? tags.split(",") : []),
            videoUrl: inputs.videoUrl || ""
        }
        // Zod Validation
        const result = videoSchema.safeParse(dataToValidate);
        if(!result.success) {
            // Get the first error message and show it
            // console.log(z.prettifyError(result.error));
            toast.error(result.error.issues[0].message);
            return;
        }
        // Video URL is mandatory for New uploads
        if(!existingVideo && !inputs.videoUrl) {
            toast.error("Video URL is required for new uploads");
            return;
        }
        setLoading(true);
        dispatch(uploadStart());
        try {
            if(existingVideo) {
                // Update Mode
                const res = await axios.put(`http://localhost:5000/api/videos/${existingVideo._id}`,
                { ...inputs, tags },
                { headers: { Authorization: `Bearer ${token}` }});
                // Update the list
                if(setVideos) {
                    setVideos(prev => prev.map(v => v._id === existingVideo._id ? res.data : v));
                }
                // Close
                setOpen(false);
            } else {
                // Create Mode
                // Call API to Upload Video
                const res = await axios.post("http://localhost:5000/api/videos", {
                    ...inputs,
                    tags,
                    channelId: selectedChannel
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Update Redux State
                dispatch(uploadSuccess(res.data));
                // Close
                setOpen(false);
                // Redirect to new channel page
                navigate(`/video/${res.data._id}`);
            }
        } catch(err) {
            console.error(err);
            dispatch(uploadFailure());
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    if(!open) return null;

    return (
        <div onClick={() => setOpen(false)} className="fixed top-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-[#202020] w-100 h-auto p-5 rounded-xl relative flex flex-col gap-4 dark:text-white">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#303030] rounded-full"
                    onClick={() => setOpen(false)}
                >
                    <X />
                </button>
                <h1 className="text-xl font-bold text-center">{existingVideo ? "Edit Video" : "Upload a New Video"}</h1>
                {/* Channel Selector */}
                {!existingVideo && (
                    <div>
                        <label className="text-sm mr-2">Select Channel :</label>
                        <select 
                            className="p-2 border border-gray-300 dark:border-[#373737] rounded bg-transparent dark:text-white"
                            onChange={(e) => setSelectedChannel(e.target.value)}
                            value={selectedChannel}
                        >
                            {userChannels.map(channel => (
                                <option key={channel._id} value={channel._id} className="text-black">
                                    {channel.channelName}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="flex flex-col w-full justify-center gap-3">
                    <input
                        name="title"
                        type="text"
                        placeholder="Video Title"
                        value={inputs.title || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    {!existingVideo && (
                        <input
                            name="videoUrl"
                            type="text"
                            placeholder="Video URL"
                            value={inputs.videoUrl || ""}
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                        />
                    )}
                    <input
                        name="thumbnailUrl"
                        type="text"
                        placeholder="Thumbnail URL"
                        value={inputs.thumbnailUrl || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        name="category"
                        type="text"
                        placeholder="Category (comma , separated)"
                        value={tags}
                        onChange={handleTags}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <textarea 
                        name="description"
                        rows={4}
                        placeholder="Tell viewers about your video..."
                        value={inputs.description || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500 resize-none" 
                    />
                    <button
                        className="self-center bg-[#3ea6ff] text-white w-fit font-bold px-4 py-2 rounded hover:bg-[#3ea6ff]/90 transition-colors mt-2"
                        onClick={handleSubmit}
                    >
                        {loading ? "Saving..." : (existingVideo ? "Update Video" : "Upload Video")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadVideo;