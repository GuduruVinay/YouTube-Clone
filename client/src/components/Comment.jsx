import axios from "axios";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Comment = ({ comment, onDelete }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [channel, setChannel] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.description);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCommentUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/find/${comment.userId}`);
                setChannel(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchCommentUser();
    }, [comment.userId]);

    const handleDelete = async () => {
        if(!comment._id) return alert("Error: Comment ID is missing!");

        if(!window.confirm("Delete this comment?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/comments/${comment._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDelete(comment._id);
        } catch(err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/comments/${comment._id}`, 
                { description: editedText },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setIsEditing(false);
            comment.description = editedText;
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <div className="flex gap-2.5 my-6 group">
            <img 
                src={channel?.avatar || "/default_profile_pic.jpg"} 
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold dark:text-white">
                        {channel?.username || "Unknown User"} 
                        <span className="text-gray-500 font-normal ml-1">{format(comment.createdAt)}</span>
                    </span>
                    {/* CRUD Acitons */}
                    {currentUser?._id === comment.userId && !isEditing && (
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Edit2
                                className="text-[14px] cursor-pointer text-gray-500 hover:text-white"
                                onClick={() => setIsEditing(true)}
                            />
                            <Trash2
                                className="text-[14px] cursor-pointer text-gray-500 hover:text-red-500"
                                onClick={handleDelete}
                            />
                        </div>
                    )}
                </div>
                {/* Toggle: Show Text OR Edit Input */}
                {isEditing ? (
                    <div className="flex items-center gap-2 mt-1">
                        <input 
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            className="bg-transparent border border-white outline-none w-full pb-1 text-sm dark:text-white"
                            autoFocus 
                        />
                        <Check 
                            className="text-[18px] cursor-pointer text-green-500"
                            onClick={handleUpdate} 
                        />
                        <X
                            className="text-[18px] cursor-pointer text-red-500"
                            onClick={() => {
                                setIsEditing(false);
                                setEditedText(comment.description);
                            }} 
                        />
                    </div>
                ) : (
                    <span className="text-sm dark:text-white">{editedText}</span>
                )}
            </div>
        </div>
    );
};

export default Comment;