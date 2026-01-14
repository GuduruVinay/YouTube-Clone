import axios from "axios";
import { useEffect, useState } from "react";
import Comment from "./Comment";

const Comments = ({ videoId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Get current user from local storage
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
                setComments(res.data);
            } catch(err) {
                console.error(err);
            }
        };
        fetchComments();
    }, [videoId]);

    // Handle Comment
    const handleComment = async () => {
        // Check if user is logged in first
        if(!currentUser) {
            alert("Please login to add a comment.");
            return;
        }

        // Check if the input is empty
        if(!newComment.trim()) {
            alert("Comment cannot be empty!");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5000/api/comments", {
                description: newComment,
                videoId,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Add new comment to top of list
            setComments([res.data, ...comments]);
            setNewComment("");
        } catch(err) {
            console.error(err);
        }
    }

    const handleDeleteFromList = (id) => {
        setComments(comments.filter(comment => comment._id !== id));
    }

    return (
        <div>
            <div>
                <p className="font-bold">Comments<span className="ml-2 font-extralight">{comments.length}</span></p>
            </div>
            <div className="flex items-center gap-2.5 w-full mb-6">
                <img 
                    src={currentUser?.avatar || "/default+profile_pic.jpg"} 
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full bg-slate-400" 
                />
                {/* Input Section */}
                <textarea
                    className="w-full resize-none border rounded-lg border-gray-500 outline-none p-1.5 overflow-hidden" 
                    placeholder="Add a comment..."
                    rows={3}
                    value={newComment}
                    onChange={(e) => {
                        setNewComment(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                    }} 
                />
                <button 
                    onClick={handleComment} 
                    className="shrink-0 bg-[#3ea6ff] rounded-full px-4 py-2 text-white dark:text-[#0f0f0f] font-bold text-sm cursor-pointer mt-0.5"
                >
                    Comment
                </button>
            </div>

            <hr className='hidden mt-3 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]' />

            {/* List of Comments */}
            {comments.map(comment => (
                <Comment 
                    key={comment._id} 
                    comment={comment}
                    onDelete={handleDeleteFromList} 
                />
            ))}
        </div>
    );
};

export default Comments;