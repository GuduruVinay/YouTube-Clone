import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

function Recommendation({ tags }){
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        async function fetchVideos() {
            // API call to get videos by tags
            const res = await axios.get(`https://localhost:5000/api/videos/tags?tags=${tags}`);
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