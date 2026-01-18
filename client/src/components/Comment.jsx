import axios from "axios";
import { Edit2, EllipsisVertical, Trash2} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import ConfirmPopup from "./ConfirmPopup";

const Comment = ({ comment, onDelete }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [channel, setChannel] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.description);
    const [openCommentMenu, setOpenCommentMenu] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);

    const commentMenuRef = useRef(null);

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

    // Handle Click Outside
    useEffect(() => {
        const handler = (e) => {
            // Check Comment Menu
            if(openCommentMenu && commentMenuRef.current && !commentMenuRef.current.contains(e.target)) {
                setOpenCommentMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [openCommentMenu]);

    // Handle Delete Click
    const handleDeleteClick = () => {
        setOpenCommentMenu(false);
        setConfirmPopup(true);
    }

    // Confirm Delete
    const confirmDelete = async () => {
        if(!comment._id) return toast.error("Error: Comment ID is missing!");
        try {
            await axios.delete(`http://localhost:5000/api/comments/${comment._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            onDelete(comment._id);
            setOpenCommentMenu(false);
            toast.success("Comment Deleted");
        } catch(err) {
            console.log(err);
            toast.error('Failed to delete comment');
        } finally {
            setConfirmPopup(false);
        }
    };

    // Handle Update
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/comments/${comment._id}`, 
                { description: editedText },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setIsEditing(false);
            setOpenCommentMenu(false);
            comment.description = editedText;
            toast.success("Comment Updated");
        } catch(err) {
            console.log(err);
            toast.error("Failed to update comment");
        }
    };

    return (
        <div className="flex items-start gap-3 px-2 my-2 group">
            <img 
                src={channel?.avatar || "/default_profile_pic.jpg"} 
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col w-full gap-1 min-w-0">
                <div className="flex justify-between items-start h-6">
                    {!isEditing && (
                        <span className="text-xs font-bold dark:text-white flex items-center">
                            {channel?.username || "Unknown User"} 
                            <span className="text-gray-500 font-normal ml-2">{format(comment.createdAt)}</span>
                        </span>
                    )}
                    {/* Comment Dropdown */}
                    {currentUser?._id === comment.userId && !isEditing && (
                        <div className="relative" ref={commentMenuRef}>
                            <button 
                                className="cursor-pointer flex items-center justify-center w-8 h-8 hover:bg-[#d9d9d9] dark:hover:bg-[#3d3d3d] rounded-full transition-colors"
                                onClick={() => setOpenCommentMenu(!openCommentMenu)}    
                            >
                                <EllipsisVertical size={16} />
                            </button>
                            {openCommentMenu && (
                                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-[#222] border border-[#f2f2f2] dark:border-[#333] rounded-xl shadow-lg py-2 z-20 flex flex-col overflow-hidden">
                                    <button
                                        className="flex items-center gap-3 w-full rounded-lg px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white text-left transition-colors"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Edit2 />
                                        <span className="font-medium">Edit</span>
                                    </button>
                                    <button
                                        className="flex items-center gap-3 w-full rounded-lg px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white text-left transition-colors"
                                        onClick={handleDeleteClick}
                                    >
                                        <Trash2 />
                                        <span className="font-medium">Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* Toggle: Show Text OR Edit Input */}
                {isEditing ? (
                    <div className="flex flex-col w-full mt-1">
                        <div className="flex w-full">
                            <textarea
                                rows={1}
                                value={editedText}
                                onChange={(e) => {
                                    setEditedText(e.target.value)
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                className="w-full resize-none border-b border-gray-500 outline-none p-1.5 overflow-hidden"
                            />
                        </div>
                        <div className="self-end">
                            <div className="flex gap-2 justify-end mt-3">
                                <button 
                                    onClick={() => {
                                    setIsEditing(false);
                                    setOpenCommentMenu(false);
                                    setEditedText(comment.description);
                                }} 
                                    className="shrink-0 rounded-full px-4 py-2 text-black dark:text-white font-bold text-sm cursor-pointer mt-0.5"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={handleUpdate} 
                                    className="shrink-0 bg-[#3ea6ff] rounded-full px-4 py-2 text-white font-bold text-sm cursor-pointer mt-0.5"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <span className="text-sm dark:text-white leading-relaxed whitespace-pre-wrap wrap-break-word">{editedText}</span>
                )}
            </div>
            <ConfirmPopup 
                isOpen={confirmPopup}
                onClose={() => setConfirmPopup(false)}
                onConfirm={confirmDelete}
                title="Delete Comment ?"
                message="Are you sure you want to delete this comment? This action cannot be undone."
                confirmText="Delete"
            />
        </div>
    );
};

export default Comment;