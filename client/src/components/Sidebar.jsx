import { Menu, House, Layers2, TvMinimalPlay, CircleUserRound, History } from 'lucide-react';

// Helper Component for Sidebar Buttons
const SidebarBtn = ({ icon, text }) => (
    <button className='flex gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg'>
        {icon}
        <span>{text}</span>
    </button>
);

function Sidebar({setMenu}) {
    return (
        <aside className='flex flex-col gap-6 absolute inset-y-0 z-20 pl-1 mr-1 md:pl-3 md:mr-3 p-2 w-[60%] md:w-[30%] lg:w-[15%] bg-white dark:bg-[#0F0F0F] dark:text-white'>
            <div className='flex gap-1 ml-1'>
                <button onClick={() => setMenu(false)} className='hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl'><Menu /></button>
                <button>
                    <img src="../public/youtube_logo.png" alt="YouTube Logo" width={120} className='block dark:hidden' />
                    <img src="../public/youtube_logo_white.png" alt="YouTube White Logo" width={120} className='hidden dark:block'/>
                </button>
            </div>
            <div className='flex flex-col pl-1 mr-4 gap-1'>
                <SidebarBtn icon={<House />} text="Home" />
                <SidebarBtn icon={<Layers2 />} text="Shorts" />
                <SidebarBtn icon={<TvMinimalPlay />} text="Subscriptions" />
                <SidebarBtn icon={<CircleUserRound />} text="You" />
                <SidebarBtn icon={<History />} text="History" />
            </div>
        </aside>
    )
}

export default Sidebar;