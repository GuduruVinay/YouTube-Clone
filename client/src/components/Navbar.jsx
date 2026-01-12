import { Menu, Search, Mic, Plus, CircleUserRound, EllipsisVertical, Bell, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

function Navbar({ isDark, setIsDark, setIsMenuOpen, user, handleLogout }) {
    const location = useLocation();

    return (
        <nav className='sticky top-0 z-50 h-14 dark:bg-[#0f0f0f] dark:text-white'>
            <div className='flex justify-between items-center p-2.5 md:pl-4.5 md:pr-4'>
                <div className='flex gap-1'>
                    <button onClick={() => setIsMenuOpen(true)} className='hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl cursor-pointer'><Menu /></button>
                    <Link to='/' className='w-full'>
                        <img src="/youtube_logo.png" alt="YouTube Logo" width={120} className='block dark:hidden' />
                        <img src="/youtube_logo_white.png" alt="YouTube White Logo" width={120} className='hidden dark:block'/>
                    </Link>
                </div>
                <div className='flex gap-2 md:gap-4'>
                    <div className='flex'>
                        <input type="text" placeholder='Search' className='outline-none hidden md:block pt-1.5 pb-1.5 pl-3 border border-[#d3d3d3] dark:border-[#303030] rounded-l-4xl lg:w-xl' />
                        <button className='cursor-pointer md:py-1.5 md:px-4 hover:bg-[#f0f0f0] dark:hover:bg-[#3d3d3d] md:border md:border-[#d3d3d3] dark:border-[#303030] dark:bg-[#212121] p-2 rounded-4xl md:rounded-l-none md:rounded-r-4xl md:border-l-0'><Search /></button>
                    </div>
                    <button className='hidden md:block p-2 cursor-pointer bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl'><Mic /></button>
                    <button onClick={() => setIsDark(!isDark)} className='p-2 cursor-pointer bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl'>
                        {isDark ? <Sun /> : <Moon />}
                    </button>
                </div>
                <div className='flex gap-2 md:gap-4'>
                    {user ? (
                        <div className='flex items-center gap-4'>
                            <div>
                                <button className='cursor-pointer flex w-fit items-center gap-1 py-2 px-2 lg:px-4 bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl'>
                                    <Plus />
                                    <span className='hidden lg:block font-medium'>Create</span>
                                </button>
                            </div>
                            <button className='hidden md:block cursor-pointer'><Bell /></button>
                            <div className='flex items-center gap-5 font-medium'>
                                <div className='flex items-center gap-2 cursor-pointer' onClick={handleLogout}>
                                    {/* <div className='w-8 h-8 rounded-full bg-[#9fc1fe] flex items-center justify-center'>
                                        {user.username[0].toUpperCase()}
                                    </div> */}
                                    <img src="/default_profile_pic.jpg" alt="Profile Pic" className='rounded-full w-8' />
                                    <span className='hidden md:block'>{user.username}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <button className='hidden md:block cursor-pointer'><EllipsisVertical /></button>
                            <Link to='/signin' state={{ from: location }} >
                                <div className='flex w-fit items-center gap-2 text-[#065fd4] hover:bg-[#def1ff] dark:text-white py-1.5 px-2.5 border border-[#e5e5e5] dark:border-[#303030] dark:hover:bg-[#303030] rounded-4xl'>
                                    <CircleUserRound />
                                    <span className='text-sm font-medium'>Sign in</span>
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
            </div>       
        </nav>
    );
};

export default Navbar;