import axios from "axios";
import { useEffect, useState } from "react";

function Comments({ videoId }) {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    // Get current user from local storage
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchComments() {
            try {
                const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
                setComments(res.data);
            } catch(err) {
                console.error("Error:", err.message);
            }
        };
        fetchComments();
    }, [videoId]);

    // Handle Comment
    async function handleComment() {
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
                desc: newComment,
                videoId,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Add new comment to top of list
            setComments([res.data, ...comments]);
            setNewComment("");
        } catch(err) {
            console.error(err);
            alert("Something went wrong while adding the comment.");
        }
    }

    return (
        <div>
            {/* Input Section */}
            <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                    {currentUser ? currentUser.username[0] : "?"}
                </div>
                <input
                    className="border-none border-b border-gray-500 bg-transparent outline-none p-1.5" 
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)} 
                />
                <button onClick={handleComment} className="text-[#3ea6ff] uppercase text-sm font-bold bg-transparent border-none cursor-pointer">Comment</button>
            </div>

            {/* List of Comments */}
            {comments.map(comment => (
                <div key={comment._id} className="flex gap-2.5 my-7">
                    <div className="w-12 h-12 rounded-full bg-gray-500"></div>
                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-medium">
                            User <span className="text-xs ml-1">1 day ago</span>
                        </span>
                        <span className="text-sm">{comment.desc}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comments;