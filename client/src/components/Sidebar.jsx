import { Menu, House, Layers2, TvMinimalPlay, CircleUserRound, History } from 'lucide-react';

function Sidebar({setMenu}) {
    return (
        <div className='flex flex-col gap-6 absolute inset-y-0 pl-4 mr-1 md:pl-3 md:mr-3 p-2 w-[60%] md:w-[30%] lg:w-[15%] dark:bg-[#0F0F0F] dark:text-white'>
            <div className='flex gap-1 ml-1'>
                <button onClick={() => setMenu(false)} className='hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl'><Menu /></button>
                <button>
                    <img src="../public/youtube_logo.png" alt="YouTube Logo" width={120} className='block dark:hidden' />
                    <img src="../public/youtube_logo_white.png" alt="YouTube White Logo" width={120} className='hidden dark:block'/>
                </button>
            </div>
            <div className='flex flex-col pl-1 mr-4'>
                <button className='flex gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg'>
                    <House />
                    <span>Home</span>
                </button>
                <button className='flex gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg'>
                    <Layers2 />
                    <span>Shorts</span>
                </button>
                <button className='flex gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg'>
                    <TvMinimalPlay />
                    <span>Subscriptions</span>
                </button>
                <button className='flex gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg'>
                    <CircleUserRound />
                    <span>You</span>
                </button>
                <button className='flex gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg'>
                    <History />
                    <span>History</span>
                </button>
            </div>
        </div>
    )
}

export default Sidebar;