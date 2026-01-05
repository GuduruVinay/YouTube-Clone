import { Menu, Search, Mic, Plus, CircleUserRound, EllipsisVertical, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const THEME_KEY = "theme";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // State: Dark Mode
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem(THEME_KEY) === "dark";
    });

    // Effect: Dark Mode
    useEffect(() => {
        if(isDark) {
        document.documentElement.classList.add("dark");
        localStorage.setItem(THEME_KEY, "dark");
        } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem(THEME_KEY, "light");
        }
    }, [isDark]);

    return (
        <nav className='dark:bg-[#0f0f0f] dark:text-white'>
            {isMenuOpen && <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />}
            <div className='flex justify-between items-center p-2 md:pl-4.5 md:pr-4'>
                <div className='flex gap-1'>
                    <button onClick={() => setIsMenuOpen(true)} className='hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl'><Menu /></button>
                    <button>
                        <img src="/youtube_logo.png" alt="YouTube Logo" width={120} className='block dark:hidden' />
                        <img src="/youtube_logo_white.png" alt="YouTube White Logo" width={120} className='hidden dark:block'/>
                    </button>
                </div>
                <div className='flex gap-2 md:gap-4'>
                    <div className='flex'>
                        <input type="text" placeholder='Search' className='hidden md:block pt-1.5 pb-1.5 pl-3 border border-[#d3d3d3] dark:border-[#303030] rounded-l-4xl lg:w-xl' />
                        <button className='md:py-1.5 md:pl-4 md:pr-4 hover:bg-[#f0f0f0] dark:hover:bg-[#3d3d3d] md:border md:border-[#d3d3d3] dark:border-[#303030] dark:bg-[#212121] p-2 rounded-4xl md:rounded-l-none md:rounded-r-4xl md:border-l-0'><Search /></button>
                    </div>
                    <button className='hidden md:block p-2 bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl'><Mic /></button>
                    <button onClick={() => setIsDark(!isDark)} className='p-2 bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl'>
                        {isDark ? <Sun /> : <Moon />}
                    </button>
                </div>
                {/* <Plus /> */}
                <div className='flex gap-2 md:gap-4'>
                    <button className='hidden md:block'><EllipsisVertical /></button>
                    <button className='flex items-center gap-2 text-[#065fd4] hover:bg-[#def1ff] dark:text-white py-1.5 px-2.5 border border-[#e5e5e5] dark:border-[#303030] dark:hover:bg-[#303030] rounded-4xl'>
                        <CircleUserRound />
                        <span className='text-sm font-semibold'>Sign in</span>
                    </button>
                </div>
            </div>       
        </nav>
    );
};

export default Navbar;