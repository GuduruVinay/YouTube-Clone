import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate}  from "react-router-dom";
import axios from "axios";
import { addChannel } from "../redux/userSlice";
import { X } from "lucide-react";

const UploadVideo = ({ openUploadVideo, setOpenUploadVideo }) => {
    const [inputs, setInputs] = useState({});

    const uploadVideoRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            // Call API to Upload Video
            // const res = await axios.post("http://localhost:5000/api/channels", inputs, {
            //     headers: { Authorization: `Bearer ${token}` }
            // });

            // Update Redux State (Add new channel ID to user's list)
            // dispatch(addChannel(res.data._id));

            // Close
            setOpenUploadVideo(false);

            // Redirect to new channel page
            // navigate(`/channel/${res.data._id}`);
        } catch(err) {
            console.error(err);
        }
    };

    // Handle Click Outside
    useEffect(() => {
        const handler = (e) => {
            // Check Upload Video
            if(openUploadVideo && uploadVideoRef.current && !uploadVideoRef.current.contains(e.target)) {
                setOpenUploadVideo(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [openUploadVideo]);

    return (
        <div className="fixed top-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
            <div ref={uploadVideoRef} className="bg-white dark:bg-[$202020] w-100 h-auto p-5 rounded-xl relative flex flex-col gap-4 dark:text-white">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 cursor-pointer p-1 hover:bg-gray-200 dark:hover:bg-[#303030] rounded-full"
                    onClick={() => setOpenUploadVideo(false)}
                >
                    <X />
                </button>
                <h1 className="text-xl font-bold text-center">Upload Video</h1>
                <div className="flex flex-col w-full justify-center gap-3">
                    <input
                        type="text"
                        placeholder="Video Title"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        type="text"
                        placeholder="Video URL"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        type="text"
                        placeholder="Thumbnail URL"
                        onChange={handleChange}
                        className="border border-gray-300 dark:border-[#303030] p-2 rounded bg-transparent outline-none focus:border-blue-500" 
                    />
                    <input
                        type="text"
                        placeholder="Category"
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
                        onClick={handleUpload}
                    >
                        Upload Video
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UploadVideo;