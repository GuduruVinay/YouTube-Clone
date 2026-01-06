import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import VideoGrid from "../components/VideoGrid";

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/videos/random");
                setVideos(res.data);
            } catch(err) {
                console.error("Error:", err.message);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className="h-dvh overflow-hidden">
            <Navbar />
            <VideoGrid videos={videos} />
        </div>
    );
}

export default Home;