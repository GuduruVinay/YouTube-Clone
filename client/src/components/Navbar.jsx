import { Menu, Search, Mic, Plus, CircleUserRound, EllipsisVertical, Bell, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateChannelModal from "./CreateChannelModal";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ isDark, setIsDark, setIsMenuOpen }) => {
    const { currentUser } = useSelector(state => state.user);

    // State for search query
    const [q, setQ] = useState("");

    const [openModal, setOpenModal] = useState(false);

    const location = useLocation();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <>
            <nav className="sticky top-0 z-50 h-14 dark:bg-[#0f0f0f] dark:text-white">
                <div className="flex justify-between items-center p-2.5 md:pl-4.5 md:pr-4">
                    {/* Menu & Logo */}
                    <div className="flex gap-1">
                        <button onClick={() => setIsMenuOpen(true)} className="hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl cursor-pointer"><Menu /></button>
                        <Link to="/" className="w-full">
                            <img src="/youtube_logo.png" alt="YouTube Logo" width={120} className="block dark:hidden" />
                            <img src="/youtube_logo_white.png" alt="YouTube White Logo" width={120} className="hidden dark:block"/>
                        </Link>
                    </div>
                    {/* Search */}
                    <div className="flex gap-2 md:gap-4">
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="outline-none hidden md:block pt-1.5 pb-1.5 pl-3 border border-[#d3d3d3] dark:border-[#303030] rounded-l-4xl lg:w-xl" 
                                onChange={(e) => setQ(e.target.value)} // Update state on type
                                onKeyDown={(e) => e.key === "Enter" && navigate(`/search?q=${q}`) } // Search on Enter key
                            />
                            <button 
                                className="cursor-pointer md:py-1.5 md:px-4 hover:bg-[#f0f0f0] dark:hover:bg-[#3d3d3d] md:border md:border-[#d3d3d3] dark:border-[#303030] dark:bg-[#212121] p-2 rounded-4xl md:rounded-l-none md:rounded-r-4xl md:border-l-0"
                                onClick={() => navigate(`/search?q=${q}`)} // Search on Click
                            >
                                <Search />
                            </button>
                        </div>
                        <button className="hidden md:block p-2 cursor-pointer bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl"><Mic /></button>
                        <button onClick={() => setIsDark(!isDark)} className="p-2 cursor-pointer bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl">
                            {isDark ? <Sun /> : <Moon />}
                        </button>
                    </div>
                    {/* User Actions */}
                    <div className="flex gap-2 md:gap-4">
                        {currentUser ? (
                            <div className="flex items-center gap-4">
                                <div>
                                    <button 
                                        className="cursor-pointer flex w-fit items-center gap-1 py-2 px-2 lg:px-4 bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl"
                                        onClick={() => setOpenModal(true)}    
                                    >
                                        <Plus />
                                        <span className="hidden lg:block font-medium">Create Channel</span>
                                    </button>
                                    {/* Avatar Dropdown Simulator */}
                                    <div className="relative group">
                                        <img 
                                            src={currentUser.avatar || "/default_profile_pic.jpg"} 
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full cursor-pointer bg-purple-500" 
                                        />
                                        {/* Simple Dropdown on Hover */}
                                        <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-[#222] border dark:border-[#333] rounded shadow-lg hidden group-hover:block p-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <button className="hidden md:block cursor-pointer"><Bell /></button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <button className="hidden md:block cursor-pointer"><EllipsisVertical /></button>
                                <Link to="/signin" state={{ from: location }} >
                                    <div className="flex w-fit items-center gap-2 text-[#065fd4] hover:bg-[#def1ff] dark:text-white py-1.5 px-2.5 border border-[#e5e5e5] dark:border-[#303030] dark:hover:bg-[#303030] rounded-4xl">
                                        <CircleUserRound />
                                        <span className="text-sm font-medium">Sign in</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>       
            </nav>

            {/* Render Modal conditionally */}
            {openModal && <CreateChannelModal setOpen={setOpenModal} />}
        </>
    );
};

export default Navbar;