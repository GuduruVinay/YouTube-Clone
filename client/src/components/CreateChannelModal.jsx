import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addChannel } from "../redux/userSlice";
import { X } from "lucide-react";


const CreateChannelModal = ({ setOpen }) => {
    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            // Call API to create channel
            const res = await axios.post("http://localhost:5000/api/channels", inputs, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            // Update Redux State (Add new channel ID to user's list)
            dispatch(addChannel(res.data._id));

            // Close Modal
            setOpen(false);

            // Redirect to new hannel page
            NavigationHistoryEntry(`/channel/${res.data._id}`);
        } catch(err) {
            console.error(err);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-enter z-50">
            <div className="bg-white dark:bg-[$202020] w-[400px] h-auto p-5 rounded-xl relative flex flex-col gap-4 dark:text-white">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#303030] rounded-full"
                    onClick={() => setOpen(false)}
                >
                    <X size={20} />
                </button>

                <h1 className="text-xl font-bold text-center">Create Channel</h1>
            
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold">Channel Name</label>
                    <input
                        name="channelName" 
                        type="text"
                        placeholder="e.g. Code with LM3"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />

                    <label className="text-sm font-semibold">Description</label>
                    <textarea
                        name="description" 
                        rows={4}
                        placeholder="Tell viewers about your channel..."
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500 resize-none" 
                    />
                </div>

                <button
                    className="bg-[#3ea6ff] text-black font-bold py-2 rounded hover:bg-[#3ea6ff]/90 transistion-colors mt-2"
                    onClick={handleCreate}
                >
                    Create Channel
                </button>
            </div>
        </div>
    );
};

export default CreateChannelModal;