import { House, Layers2, TvMinimalPlay, CircleUserRound } from 'lucide-react';
import Filters from './Filters';
import VideoCard from './VideoCard';

// Helper Component for Side Menu Buttons
const SideMenuBtn = ({ icon, text }) => (
    <button className='flex flex-col gap-1 px-1 py-4 w-full rounded-lg items-center hover:bg-[#f2f2f2] dark:hover:bg-[#212121]'>
        {icon}
        <span className='text-[10px]'>{text}</span>
    </button>
);

function VideoGrid() {
    return (
        <div className='flex flex-1 h-dvh overflow-y-auto dark:bg-[#0f0f0f] dark:text-white'>
            <div className='hidden md:flex flex-col gap-1 ml-1 items-center justify-start'>
                <SideMenuBtn icon={<House />} text="Home" />
                <SideMenuBtn icon={<Layers2 />} text="Shorts" />
                <SideMenuBtn icon={<TvMinimalPlay />} text="Subscriptions" />
                <SideMenuBtn icon={<CircleUserRound />} text="You" />
            </div>
            <div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
                <div className='sticky top-0 z-10'>
                    <Filters />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-8 px-4 py-4 pb-20 w-full"> 
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                    <VideoCard />
                </div>
            </div>
        </div>
    )
}

export default VideoGrid;