import { Menu, Search, Mic, Plus, CircleUserRound, EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Filters from './Filters';

function Navbar() {
    const [menu, setMenu] = useState(false);
    
    return (
        <nav className='dark:bg-[#0F0F0F] dark:text-white'>
            {menu && <Sidebar setMenu={setMenu} />}
            <div className='flex justify-between items-center p-2 pl-4 pr-2 md:pl-6 md:pr-4 lg:pl-4'>
                <div className='flex gap-1'>
                    <button onClick={() => setMenu(true)} className='hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl'><Menu /></button>
                    <button>
                        <img src="../public/youtube_logo.png" alt="YouTube Logo" width={120} className='block dark:hidden' />
                        <img src="../public/youtube_logo_white.png" alt="YouTube White Logo" width={120} className='hidden dark:block'/>
                    </button>
                </div>
                <div className='flex gap-4'>
                    <div className='flex'>
                        <input type="text" placeholder='Search' className='hidden md:block pt-1.5 pb-1.5 pl-3 border border-[#d3d3d3] dark:border-[#303030] rounded-l-4xl lg:w-xl' />
                        <button className='md:py-1.5 md:pl-4 md:pr-4 hover:bg-[#f0f0f0] dark:hover:bg-[#3d3d3d] md:border md:border-[#d3d3d3] dark:border-[#303030] dark:bg-[#212121] md:rounded-r-4xl md:border-l-0'><Search /></button>
                    </div>
                    <button className='hidden md:block p-2 bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl'><Mic /></button>
                </div>
                {/* <Plus /> */}
                <div className='flex gap-2 md:gap-4'>
                    <button><EllipsisVertical /></button>
                    <button className='flex gap-2 text-[#065fd4] hover:bg-[#def1ff] dark:text-white py-1.5 px-2.5 border border-[#e5e5e5] dark:border-[#303030] dark:hover:bg-[#303030] rounded-4xl'>
                        <CircleUserRound />
                        <span className='font-semibold'>Sign in</span>
                    </button>
                </div>
            </div>
            <Filters />
        </nav>
    );
};

export default Navbar;