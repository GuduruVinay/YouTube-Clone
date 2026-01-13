import axios from "axios";
import { Check, Edit2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

function Comment({ comment, onDelete }) {
    const [channel, setChannel] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.desc);

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchCommentUser() {
            try {
                const res = await axios.get(`http://localhost:5000/api/users/find/${comment.userId}`);
                setChannel(res.data);
            } catch(err) {
                console.error(err);
            }
        };
        fetchCommentUser();
    }, [comment.userId]);

    async function handleDelete() {
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
    }

    async function handleUpdate() {
        try {
            await axios.put(`http://localhost:5000/api/comments/${comment._id}`, 
                { desc: editedText },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setIsEditing(false);
            comment.desc = editedText;
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="flex gap-2.5 my-6 group">
            <img 
                src={channel?.img || "/default_profile_pic.jpg"} 
                alt=""
                className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold">
                        {channel?.username} <span className="text-gray-500 font-normal ml-1">{format(comment.createdAt)}</span>
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
                            type="text"
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
                                setEditedText(comment.desc);
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