import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import z from "zod";
import { userUpdateSchema } from "../utils/validation";
import axios from "axios";
import toast from "react-hot-toast";
import { loginSuccess } from "../redux/userSlice";
import { X } from "lucide-react";

const UpdateUser = ({ open, setOpen, user }) => {
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch(); 

    const token = localStorage.getItem("token");

    // Pre-fill existing user data
    useEffect(() => {
        if(user) {
            setInputs({
                username: user.username,
                email: user.email,
                avatar: user.avatar || "",
            });
        }
    }, [user]);

    // Handle Change
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Handle Update
    const handleUpdate = async (e) => {
        e.preventDefault();
        // Zod Validation
        const result = userUpdateSchema.safeParse(inputs);
        if(!result.success) {
            // console.log(z.prettifyError(result.error));
            toast.error(result.error.issues[0].message);
            return;
        }
        setLoading(true);
        try {
            const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, inputs, {
                headers: { Authorization:  `Bearer ${token}`}
            });
            // Update Redux Store with new user data
            dispatch(loginSuccess(res.data));
            setOpen(false);
            toast.success("Profile updated successfully!");
        } catch(err) {
            console.error(err);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if(!open) return null;

    return (
        <div onClick={() => setOpen(false)} className="fixed inset-0 w-full h-full bg-black/70 flex items-center justify-center z-50">
            <div onClick={(e) => e.stopPropagation()} className="w-125 bg-white dark:bg-[#202020] p-4 rounded-xl flex flex-col gap-4 relative dark:text-white shadow-2xl border border-gray-200 dark:border-[#333]">
                <button
                    className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-[#333] rounded-full transition-colors"
                    onClick={() => setOpen(false)}
                >
                    <X />
                </button>
                <h1 className="text-2xl fonjt-bold mb-2">Edit Profile</h1>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-500">Username</label>
                        <input 
                            type="text" 
                            name="username"
                            value={inputs.username || ""}
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-[#373737] p-2.5 rounded bg-transparent focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-500">Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={inputs.email || ""}
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-[#373737] p-2.5 rounded bg-transparent focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-500">Avatar URL</label>
                        <input 
                            type="text"
                            name="avatar"
                            value={inputs.avatar || ""}
                            onChange={handleChange}
                            className="border border-gray-300 dark:border-[#373737] p-2.5 rounded bg-transparent focus:border-blue-500 outline-none transition-colors"
                        />
                    </div>
                </div>
                <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="mt-4 p-2.5 w-fit self-center bg-[#3ea6ff] text-white font-bold rounded-lg hover:bg-[#3ea6ff]/90 disabled:opacity-70 transition-colors"
                >
                    {loading ? "Updating" : "Update Profile"}
                </button>
            </div>
        </div>
    );
};

export default UpdateUser;