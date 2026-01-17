import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { commentSchema } from "../utils/validation";
import z from "zod";

const Comments = ({ videoId }) => {
    const { currentUser } = useSelector((state) => state.user);

    const [comments, setComments] = useState([]);
    const [description, setDescription] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
                setComments(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        fetchComments();
    }, [videoId]);

    // Handle Add Comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if(e.key === "Enter" || e.type === "click") {
            // Check if user is logged in first
            if(!currentUser) {
                toast.error("Please sign in to comment.");
                return;
            }
            // Zod Validation
            const result = commentSchema.safeParse({ description });
            if(!result.success) {
                // console.log(z.prettifyError(result.error));
                toast.error(result.error.issues[0].message);
                return;
            }
            try {
                const res = await axios.post("http://localhost:5000/api/comments", {
                    description: description,
                    videoId,
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Add new comment to top of list
                setComments([res.data, ...comments]);
                setDescription(""); // Clear input
                toast.success("Comment posted!");
            } catch(err) {
                console.log(err);
                toast.error("Failed to post comment");
            }
        }
    };

    // Handle Delete Comment
    const handleDeleteFromList = (id) => {
        setComments(comments.filter(comment => comment._id !== id));
    }

    return (
        <div>
            <div className="flex p-2 items-center justify-between">
                <p className="font-bold">Comments<span className="ml-2 font-extralight">{comments.length}</span></p>
            </div>
            <div className="flex flex-col items-center w-full p-2">
                <div className="flex w-full">
                    <img 
                        src={currentUser?.avatar || "/default_profile_pic.jpg"} 
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full bg-slate-400 mr-3" 
                    />
                    {/* Input Section */}
                    <textarea
                        className="w-full resize-none border-b border-gray-500 outline-none p-1.5 overflow-hidden" 
                        placeholder="Add a comment..."
                        rows={1}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                        }} 
                    />
                </div>
                <div className="self-end">
                    {description && (
                        <div className="flex gap-2 mt-2">
                            <button 
                                onClick={() => setDescription("")} 
                                className="shrink-0 rounded-full px-4 py-2 text-black dark:text-white font-bold text-sm cursor-pointer mt-0.5"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleAddComment} 
                                className="shrink-0 bg-[#3ea6ff] rounded-full px-4 py-2 text-white font-bold text-sm cursor-pointer mt-0.5"
                            >
                                Comment
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <hr className='hidden mt-3 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]' />

            {/* List of Comments */}
            <div className="flex flex-col">
                {comments.map((comment, index) => (
                    <div 
                        key={comment._id}
                        className={`${index === 0 ? "block" : (isExpanded ? "block" : "hidden lg:block")}`}
                    >
                        <Comment 
                            comment={comment}
                            onDelete={handleDeleteFromList}
                        />
                    </div>
                ))}
                {comments.length > 1 && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="cursor-pointer w-full py-2 bg-gray-100 dark:bg-[#272727] rounded-full text-sm font-medium lg:hidden hover:bg-gray-200 dark:hover:bg-[#3f3f3f] dark:text-white transition-colors"
                    >
                        {isExpanded ? "Hide comments" : `Show ${comments.length - 1} more comments`}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Comments;