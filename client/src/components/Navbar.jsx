import { Menu, Search, Mic, Plus, CircleUserRound, EllipsisVertical } from 'lucide-react';

function Navbar() {
    return (
        <div className='flex justify-between items-center ml-2 mr-2 md:ml-3 md:mr-3 p-2'>
            <div className='flex gap-3'>
                <button><Menu /></button>
                <button>
                    <img src="../public/youtube_logo.png" alt="YouTube Logo" width={120} className='block dark:hidden' />
                    <img src="../public/youtube_logo_white.png" alt="YouTube White Logo" width={120} className='hidden dark:block'/>
                </button>
            </div>
            <div className='flex gap-4'>
                <div className='flex'>
                    <input type="text" placeholder='Search' className='hidden md:block pt-1.5 pb-1.5 pl-3 border border-[#d3d3d3] dark:border-[#303030] rounded-l-4xl lg:w-xl' />
                    <button className='md:pt-1.5 md:pb-1.5 md:pl-4 md:pr-4 md:border md:border-[#d3d3d3] dark:border-[#303030] dark:bg-[#212121] md:rounded-r-4xl md:border-l-0'><Search /></button>
                </div>
                <button className='hidden md:block p-2 bg-[#f2f2f2] dark:bg-[#212121] rounded-4xl'><Mic /></button>
            </div>
            {/* <Plus /> */}
            <div className='flex gap-4'>
                <button><EllipsisVertical /></button>
                <button className='flex gap-2 text-[#065fd4] dark:text-white pt-1 pb-1 pl-2.5 pr-2.5 border border-[#e5e5e5] dark:border-[#575757] rounded-4xl'>
                    <CircleUserRound />
                    <span>Sign in</span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;