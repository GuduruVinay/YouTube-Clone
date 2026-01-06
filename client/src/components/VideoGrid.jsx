import { House, Layers2, TvMinimalPlay, CircleUserRound } from 'lucide-react';
import Filters from './Filters';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';

// Helper Component for Side Menu Buttons
const SideMenuBtn = ({ path, icon, text }) => (
    <Link to={path} className='w-full'>
        <div className='flex flex-col gap-1 px-1 py-4 w-full rounded-lg items-center hover:bg-[#f2f2f2] dark:hover:bg-[#212121]'>
            {icon}
            <span className='text-[10px]'>{text}</span>
        </div>
    </Link>
);

function VideoGrid({ videos }) {
    return (
        <div className='flex flex-1 h-dvh overflow-y-auto dark:bg-[#0f0f0f] dark:text-white'>
            <div className='hidden md:flex flex-col gap-1 ml-1 items-center justify-start'>
                <SideMenuBtn path='/' icon={<House />} text="Home" />
                {/* Redirect the remaining buttons to home page only for now*/}
                <SideMenuBtn path='/' icon={<Layers2 />} text="Shorts" />
                <SideMenuBtn path='/' icon={<TvMinimalPlay />} text="Subscriptions" />
                <SideMenuBtn path='/' icon={<CircleUserRound />} text="You" />
            </div>
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='sticky top-0 z-10'>
                    <Filters />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-8 px-4 py-4 pb-10 w-full"> 
                {/* <div className="flex justify-between flex-wrap gap-2 gap-y-8"> */}
                    {videos.map((video) => (
                        <VideoCard key={video._id} video={video} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VideoGrid;