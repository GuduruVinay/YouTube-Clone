import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "timeago.js";

function Comment({ comment }) {
    const [channel, setChannel] = useState({});

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

    return (
        <div className="flex gap-2.5 my-7">
            <img 
                src={channel.img || "/default_profile_pic.jpg"} 
                alt=""
                className="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col gap-1">
                <span className="text-sm font-medium">
                    {channel.name}
                    <span className="text-xs ml-1 font-normal text-gray-500">
                        {format(comment.createdAt)}
                    </span>
                </span>
                <span className="text-sm">
                    {comment.desc}
                </span>
            </div>
        </div>
    );
};

export default Comment;