import axios from "axios";
import { House, Layers2, TvMinimalPlay, CircleUserRound } from "lucide-react";
import Filters from "../components/Filters";
import Card from "../components/Card";
import { Link } from "react-router-dom";
import { LoadingHandler } from "../components/Handler";
import { useEffect, useState } from "react";

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            // If filter is "All", fetch random. Else fetch by tag
            const query = filter === "All" ? "random" : `tags?tags=${filter.toLowerCase()}`;
            try {
                const res = await axios.get(`http://localhost:5000/api/videos/${query}`);
                setVideos(res.data);
            } catch(err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchVideos();
    }, [filter]);

    // Helper Component for Side Menu Buttons
    const SideMenuBtn = ({ icon, text, path="/" }) => (
        <Link to={path} className="w-full">
            <div className="flex flex-col gap-1 px-1 py-4 w-full rounded-lg items-center hover:bg-[#f2f2f2] dark:hover:bg-[#212121]">
                {icon}
                <span className="text-[10px]">{text}</span>
            </div>
        </Link>
    );

    return (
        <div className="flex flex-1 h-dvh overflow-y-auto dark:bg-[#0f0f0f] dark:text-white">
            <div className="hidden md:flex flex-col gap-1 ml-1 items-center justify-start">
                <SideMenuBtn icon={<House />} text="Home" />
                {/* Redirect the remaining buttons to home page only for now*/}
                <SideMenuBtn icon={<Layers2 />} text="Shorts" />
                <SideMenuBtn icon={<TvMinimalPlay />} text="Subscriptions" />
                <SideMenuBtn icon={<CircleUserRound />} text="You" />
            </div>
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <div className="sticky top-0 z-10">
                    <Filters filter={filter} setFilter={setFilter} />
                </div>
                {loading ? (
                    <LoadingHandler />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-8 px-4 py-4 pb-20 w-full">
                        {videos.map((video) => (
                            <Card key={video._id} video={video} />
                        ))}
                    </div>
                )}
                {!loading && videos.length === 0 && (
                    <h2 className="col-span-full text-center text-xl text-gray-500 mt-10">
                        No videos found for "{filter}".
                    </h2>
                )}
            </div>
        </div>
    );
};

export default Home;