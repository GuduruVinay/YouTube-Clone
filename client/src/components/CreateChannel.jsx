import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate }  from "react-router-dom";
import axios from "axios";
import { createChannel, channelUpdated } from "../redux/userSlice";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { channelSchema } from "../utils/validation";
import z from "zod";

const CreateChannel = ({ open, setOpen, existingChannel = null, setChannelData }) => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Zod Validation
        const result = channelSchema.safeParse(inputs);
        if(!result.success) {
            // Get the first error message and show it
            // console.log(z.prettifyError(result.error));
            toast.error(result.error.issues[0].message);
            return;
        }
        setLoading(true);
        try {
            if(existingChannel) {
                // Update Mode
                const res = await axios.put(`http://localhost:5000/api/channels/${existingChannel._id}`, inputs, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                //  Update parent state instantly
                if(setChannelData && res.data && res.data._id) {
                    setChannelData(res.data);
                } else {
                    console.error("API returned invalid data");
                }
                // Update Redux State 
                dispatch(channelUpdated());
                // Close
                setOpen(false);
                toast.success("Channel updated successfully!");
            } else {
                // Create Mode
                const res = await axios.post("http://localhost:5000/api/channels", inputs, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Update Redux State (Add new channel ID to user's list)
                dispatch(createChannel(res.data._id));
                // Close
                setOpen(false);
                // Redirect to new channel page
                navigate(`/channel/${res.data._id}`);
                toast.success("Channel created successfully!");
            }
        } catch(err) {
            console.error(err);
            if(err.response?.status === 409) {
                toast.error("Handle already taken! Please choose another one.");
            } else {
                toast.error("Failed to create channel. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(existingChannel) {
            setInputs({
                channelName: existingChannel.channelName,
                handle: existingChannel.handle,
                channelAvatar: existingChannel.channelAvatar,
                channelBanner: existingChannel.channelBanner,
                description: existingChannel.description
            });
        }
    }, [existingChannel]);

    if(!open) return null;

    return (
        <div onClick={() => setOpen(false)} className="fixed top-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white dark:bg-[#0f0f0f] w-100 h-auto p-5 rounded-xl relative flex flex-col gap-4 dark:text-white">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#303030] rounded-full"
                    onClick={() => setOpen(false)}
                >
                    <X />
                </button>
                <h1 className="text-xl font-bold text-center">{existingChannel ? "Update Channel" : "Create Channel"}</h1>
                <div className="flex flex-col w-full justify-center gap-3">
                    <img 
                        src={inputs.channelAvatar || "/default_profile_pic.jpg"} 
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full self-center"
                    />
                    <input
                        name="channelName"
                        type="text"
                        placeholder="Channel Name"
                        value={inputs.channelName || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        name="handle"
                        type="text"
                        placeholder="@Handle"
                        value={inputs.handle || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        name="channelAvatar"
                        type="text"
                        placeholder="Avatar URL"
                        value={inputs.channelAvatar || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        name="channelBanner"
                        type="text"
                        placeholder="Banner URL"
                        value={inputs.channelBanner || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <textarea
                        name="description" 
                        rows={4}
                        placeholder="Tell viewers about your channel..."
                        value={inputs.description || ""}
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500 resize-none" 
                    />
                    <button
                    className="self-center bg-[#3ea6ff] text-white w-fit font-bold px-4 py-2 rounded hover:bg-[#3ea6ff]/90 transistion-colors mt-2"
                    onClick={handleSubmit}
                    >
                        {loading ? (existingChannel ? "Updating..." : "Creating...") : (existingChannel ? "Update Channel" : "Create Channel")}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChannel;