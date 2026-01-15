import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const query = tags && tags.length > 0 ? `tags?tags=${tags}` : "random";
            // API call to get videos by tags
            const res = await axios.get(`http://localhost:5000/api/videos/${query}`);
            setVideos(res.data);
        };
        if(tags) fetchVideos();
    }, [tags]);

    return (
        <div className="flex flex-col gap-3">
            {videos.map((video) => (
                <Card type="sm" key={video._id} video={video} />
            ))}
        </div>
    );
};

export default Recommendation;