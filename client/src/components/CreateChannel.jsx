import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate}  from "react-router-dom";
import axios from "axios";
import { addChannel } from "../redux/userSlice";
import { X } from "lucide-react";

const CreateChannel = ({ openCreateChannel, setOpenCreateChannel }) => {
    const [inputs, setInputs] = useState({});

    const createChannelRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // Call API to create channel
            const res = await axios.post("http://localhost:5000/api/channels", inputs, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Update Redux State (Add new channel ID to user's list)
            dispatch(addChannel(res.data._id));

            // Close
            setOpenCreateChannel(false);

            // Redirect to new channel page
            navigate(`/channel/${res.data._id}`);
        } catch(err) {
            console.error(err);
        }
    };

    // Handle Click Outside
    useEffect(() => {
        const handler = (e) => {
            // Check Create Channel
            if(openCreateChannel && createChannelRef.current && !createChannelRef.current.contains(e.target)) {
                setOpenCreateChannel(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [openCreateChannel]);

    return (
        <div className="fixed top-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div ref={createChannelRef} className="bg-white dark:bg-[$202020] w-100 h-auto p-5 rounded-xl relative flex flex-col gap-4 dark:text-white">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#303030] rounded-full"
                    onClick={() => setOpenCreateChannel(false)}
                >
                    <X />
                </button>
                <h1 className="text-xl font-bold text-center">Create Channel</h1>
                <div className="flex flex-col w-full justify-center gap-3">
                    <img 
                        src={"/default_profile_pic.jpg"} 
                        alt="User Avatar"
                        className="w-32 h-32 rounded-full self-center"
                    />
                    <input
                        type="text"
                        placeholder="Channel Name"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        type="text"
                        placeholder="@Handle"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        type="text"
                        placeholder="Avatar URL"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        type="text"
                        placeholder="Banner URL"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <textarea 
                        rows={4}
                        placeholder="Tell viewers about your channel..."
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500 resize-none" 
                    />
                    <button
                        className="self-center bg-[#3ea6ff] text-white w-fit font-bold px-4 py-2 rounded hover:bg-[#3ea6ff]/90 transistion-colors mt-2"
                        onClick={handleCreate}
                    >
                        Create Channel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateChannel;