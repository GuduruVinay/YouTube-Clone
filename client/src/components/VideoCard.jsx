import { Link } from "react-router-dom";

function VideoCard({ video }) {
    return (
        <Link to={`/video/${video._id}`} className="no-underline">
            <div className="flex flex-col cursor-pointer gap-2 px-1">
                <img 
                    src={video.imgUrl} 
                    alt={video.title}
                    className="w-full h-48 lg:h-64 bg-[#999] rounded-xl object-cover hover:rounded-none transition-all duration-300"
                />
                <div className="flex mt-1 gap-3">
                    {/* Channel Avatar Placeholder */}
                    <div className="w-9 h-9 rounded-full bg-gray-500"></div>
                    <div className="flex flex-col">
                        <h1 className="text-base font-medium">{video.title}</h1>
                        <h2 className="text-sm my-1">LM3 Games</h2>
                        <div className="text-sm">
                            {video.views} views • 1 day ago
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default VideoCard;