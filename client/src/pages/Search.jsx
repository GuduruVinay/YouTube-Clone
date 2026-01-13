import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

function Search() {
    const [videos, setVideos] = useState([]);

    // useLocation().search returns "?q=searchTerm"
    const query = useLocation().search;

    useEffect(() => {
        async function fetchVideos() {
            try {
                const res = await axios.get(`http://localhost:5000/api/videos/search${query}`);
                setVideos(res.data);
            } catch(err) {
                console.error(err);
            }
        };
        fetchVideos();
    }, [query]);

    return (
        <div className="flex flex-wrap gap-y-10 gap-x-3 px-5 py-6">
            {videos.map(video => (
                <Card key={video._id} video={video} />
            ))}

            {videos.length === 0 && (
                <h2 className="text-xl text-gray-500 mt-10 w-full text-center">
                    No videos found matching your search.
                </h2>
            )}
        </div>
    )
}

export default Search;