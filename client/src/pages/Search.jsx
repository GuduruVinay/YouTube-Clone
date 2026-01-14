import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";

const Search = () => {
    const [videos, setVideos] = useState([]);

    // useLocation().search returns "?q=searchTerm"
    const query = useLocation().search;

    useEffect(() => {
        const fetchVideos = async () => {
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
        <div className="flex flex-col w-full px-5 py-6">
            <h2 className="text-xl font-bold dark:text-white mb-5">Search Results</h2>
            <div className="flex flex-wrap gap-y-10 gap-x-5">
                {videos.map(video => (
                    <div key={video._id} className="w-full sm:w-75" >
                        <Card video={video} />
                    </div>
                ))}
                {videos.length === 0 && (
                    <h2 className="text-xl text-gray-500 mt-10 w-full text-center">
                        No videos found matching your search.
                    </h2>
                )}
            </div>
        </div>
    );
};

export default Search;