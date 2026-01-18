import { Menu, Search, Plus, CircleUserRound, Sun, Moon, ArrowLeft, LogOut, Video, TvMinimal, Trash2, Edit2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateChannel from "./CreateChannel";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import UploadVideo from "./UploadVideo";
import axios from "axios";
import toast from "react-hot-toast";
import UpdateUser from "./UpdateUser";
import ConfirmPopup from "./ConfirmPopup";

const Navbar = ({ isDark, setIsDark, setIsMenuOpen }) => {
    const { currentUser, channelUpdateTrigger } = useSelector(state => state.user);

    // State for search query
    const [q, setQ] = useState("");

    // State for Mobile Search Overlay
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    
    // Dropdowns
    const [openUserMenu, setOpenUserMenu] = useState(false);
    const [openCreateMenu, setOpenCreateMenu] = useState(false);
    
    // Modals
    const [openCreateChannel, setOpenCreateChannel] = useState(false);
    const [openUploadVideo, setOpenUploadVideo] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [userChannels, setUserChannels] = useState([]);

    // Refs for Click Outside
    const userMenuRef = useRef(null);
    const createMenuRef = useRef(null);

    const token = localStorage.getItem("token");

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Fetch Channel Details
    useEffect(() => {
        const fetchChannels = async () => {
            if(currentUser && currentUser?.channels && currentUser.channels.length > 0) {
                try {
                    // Create an array of API calls for each channel ID
                    const channelPromises = currentUser.channels.map(id => 
                        axios.get(`http://localhost:5000/api/channels/find/${id}`)
                    );
                    // Wait for all to finish
                    const responses = await Promise.all(channelPromises);
                    // Filter out any null responses
                    const validChannels = responses.filter(res => res !== null && res.data).map(res => res.data);
                    setUserChannels(validChannels);
                } catch(err) {
                    console.error("Failed to fetch channels", err);
                }
            } else {
                // If user has no channels, reset state
                setUserChannels([]);
            }
        };
        fetchChannels();
    }, [currentUser, channelUpdateTrigger]);

    // Handle Click Outside
    useEffect(() => {
        const handler = (e) => {
            // Check User Menu
            if(openUserMenu && userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setOpenUserMenu(false);
            }
            // Check Create Menu 
            if(openCreateMenu && createMenuRef.current && !createMenuRef.current.contains(e.target)) {
                setOpenCreateMenu(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, [openUserMenu, openCreateMenu]);

    // Handle Logout
    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        setOpenUserMenu(false);
        toast.success("Logged out successfully");
    };

    // Handle Search
    const handleSearch = () => {
        // Prevent empty searches or spaces-only searches
        if(!q || q.trim() === "" ) return;
        // Navigate is valid
        navigate(`/search?q=${q}`)
        // Close mobile search after searching
        setShowMobileSearch(false);
    };

    // Handle Create Channel
    const handleCreateChannel = () => {
        setOpenCreateChannel(true);
        setOpenCreateMenu(false);
    }

    // Handle Upload Video
    const handleUploadVideo = () => {
        if(userChannels.length > 0) {
            setOpenUploadVideo(true);
            setOpenCreateMenu(false);
        } else {
            toast.error("Please create a channel first to upload videos!");
        }
    }

    // Handle Delete Account
    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${currentUser._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            dispatch(logout());
            navigate("/");
            toast.success("Account deleted successfully");
        } catch(err) {
            console.error(err);
            toast.error("Failed to delete account");
        }
    };

    return (
        <>
            <nav className="sticky top-0 z-50 h-14 bg-white dark:bg-[#0f0f0f] dark:text-white">
                {/* Mobile Search Overlay */}
                {showMobileSearch && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center px-2 z-60 bg-white dark:bg-[#0f0f0f]">
                        {/* Back Button */}
                        <button
                            onClick={() => setShowMobileSearch(false)}
                            className="p-2 mr-2 hover:bg-gray-200 dark:hover:bg-[#272727] rounded-full"
                        >
                            <ArrowLeft />
                        </button>
                        {/* Mobile Input */}
                        <div className="flex w-full">
                            <input 
                                type="text"
                                autoFocus
                                placeholder="Search"
                                onChange={(e) => setQ(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full px-4 py-2 border border-[#d3d3d3] dark:border-[#303030] rounded-l-full dark:bg-[#121212] dark:text-white outline-none focus:border-blue-500" 
                            />
                            <button
                                onClick={handleSearch}
                                className="px-5 bg-gray-100 dark:bg-[#222] md:border-[#d3d3d3] dark:border-[#303030] border-l-0 border-gary-300 rounded-r-full hover:bg-gray-200 dark:hover:bg-[#303030] dark:text-white"
                            >
                                <Search />
                            </button>
                        </div>
                    </div>
                )}
                <div className="flex justify-between items-center p-2.5 md:pl-4.5 md:pr-4">
                    {/* Menu & Logo */}
                    <div className="flex gap-1">
                        <button onClick={() => setIsMenuOpen(true)} className="hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl cursor-pointer"><Menu /></button>
                        <Link to="/" className="w-full">
                            <img src="/youtube_logo.png" alt="YouTube Logo" width={120} className="block dark:hidden" />
                            <img src="/youtube_logo_white.png" alt="YouTube White Logo" width={120} className="hidden dark:block"/>
                        </Link>
                    </div>
                    {/* Desktop Search */}
                    <div className="hidden md:flex gap-2 md:gap-4">
                        <div className="flex">
                            <input 
                                type="text" 
                                placeholder="Search"
                                className="hidden md:block outline-none focus:border-blue-500 pt-1.5 pb-1.5 pl-3 border border-[#d3d3d3] dark:border-[#303030] rounded-l-full lg:w-xl" 
                                onChange={(e) => setQ(e.target.value)} // Update state on type
                                onKeyDown={(e) => e.key === "Enter" && handleSearch() } // Search on Enter key
                            />
                            <button 
                                className="cursor-pointer md:py-1.5 md:px-4 hover:bg-[#f0f0f0] dark:hover:bg-[#3d3d3d] md:border md:border-[#d3d3d3] dark:border-[#303030] dark:bg-[#212121] p-2 rounded-4xl md:rounded-l-none md:rounded-r-4xl md:border-l-0"
                                onClick={handleSearch} // Search on Click
                            >
                                <Search />
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowMobileSearch(true)} 
                        className="md:hidden p-2 cursor-pointer bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl"
                    >
                        <Search />
                    </button>
                    {/* User Actions */}
                    <div className="flex gap-2 md:gap-4">
                        <button onClick={() => setIsDark(!isDark)} className="p-2 cursor-pointer bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-full">
                            {isDark ? <Sun /> : <Moon />}
                        </button>
                        {currentUser ? (
                            <div className="relative flex items-center gap-4">
                                {/* Create Dropdown */}
                                <div ref={createMenuRef}>
                                    <button 
                                        className="cursor-pointer flex w-fit items-center gap-1 py-2 px-2 lg:px-4 bg-[#f2f2f2] hover:bg-[#d9d9d9] dark:bg-[#212121] dark:hover:bg-[#3d3d3d] rounded-4xl"
                                        onClick={() => setOpenCreateMenu(!openCreateMenu)}    
                                    >
                                        <Plus />
                                        <span className="hidden md:block font-medium">Create</span>
                                    </button>
                                    {openCreateMenu && (
                                        <div className="absolute justify-center right-0 top-full mt-2 w-50 bg-white dark:bg-[#222] border border-[#f2f2f2] dark:border-[#333] rounded-xl shadow-xl py-2 z-10">
                                            <button
                                                onClick={handleCreateChannel}
                                                className="flex items-center gap-3 w-full rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white transition-colors"
                                            >
                                                <TvMinimal /> 
                                                <span className="font-medium">Create Channel</span>
                                            </button>
                                            <button
                                                onClick={handleUploadVideo}
                                                className={`flex items-center gap-3 w-full rounded-lg px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#333] transition-colors ${userChannels.length === 0 ? "text-gray-400 cursor-not-allowed" : "text-black dark:text-white"}`}
                                            >
                                                <Video /> 
                                                <span className="font-medium">Upload Video</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {/* Avatar Dropdown */}
                                <div ref={userMenuRef}>
                                    <img 
                                        src={currentUser?.avatar || "/default_profile_pic.jpg"} 
                                        alt="User Avatar"
                                        onClick={() => setOpenUserMenu(!openUserMenu)}
                                        className="w-8 h-8 rounded-full cursor-pointer" 
                                    />
                                    {openUserMenu && (
                                        <div className="absolute justify-center right-0 top-full mt-2 w-50 bg-white dark:bg-[#222] border border-[#f2f2f2] dark:border-[#333] rounded-xl shadow-xl pt-2 z-10">
                                            <div className="flex flex-col gap-2 items-center justify-center px-4 pt-2 pb-3 border-b border-[#f2f2f2] dark:border-[#333]">
                                                <img 
                                                    src={currentUser?.avatar || "/default_profile_pic.jpg"} 
                                                    alt="User Avatar"
                                                    className="w-16 h-16 rounded-full"
                                                />
                                                <p className="text-sm font-medium dark:text-white truncate">{currentUser.username}</p>
                                                <p className="text-sm font-medium dark:text-white truncate">{currentUser.email}</p>
                                            </div>
                                            {userChannels.length > 0 && (
                                                <div className="flex flex-col justify-center items-center py-2 border-b border-[#f2f2f2] dark:border-[#333]">
                                                    <span className="px-4 mb-1 text-xs font-semibold uppercase text-center">My Channels</span>
                                                    {userChannels.map(channel => (
                                                        <Link
                                                            to={`/channel/${channel._id}`}
                                                            key={channel._id}
                                                            className="flex items-center w-full gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer"
                                                            onClick={() => setOpenUserMenu(false)}
                                                        >
                                                            <img 
                                                                src={channel.channelAvatar || "/default_profile_pic.jpg"} 
                                                                alt="Channel Avatar"
                                                                className="w-6 h-6 rounded-full object-cover" 
                                                            />
                                                            <span>{channel.channelName}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                            <button
                                                onClick={() => { setOpenUpdate(true); setOpenUserMenu(false); }}
                                                className="flex justify-center items-center gap-3 w-full rounded-lg py-3 hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white transition-colors"
                                            >
                                               <Edit2 /> 
                                               <span className="text-sm font-medium">Edit Profile</span>
                                            </button>
                                            <button
                                                onClick={handleLogout}
                                                className="flex justify-center items-center gap-3 w-full rounded-lg py-3 hover:bg-gray-100 dark:hover:bg-[#333] dark:text-white transition-colors"
                                            >
                                               <LogOut /> 
                                               <span className="text-sm font-medium">Sign out</span>
                                            </button>
                                            <div className="border-t border-gray-200 dark:border-[#333] mt-1 pt-1">
                                                <button
                                                    className="flex items-center justify-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-red-600 w-full text-left transition-colors"
                                                    onClick={() => {setOpenDelete(true); setOpenUserMenu(false); }}
                                                >
                                                    <Trash2 />
                                                    <span>Delete Account</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <Link to="/signin" state={{ from: location }} >
                                <div className="flex w-fit items-center gap-2 text-[#065fd4] hover:bg-[#def1ff] dark:text-white py-1.5 px-2.5 border border-[#e5e5e5] dark:border-[#303030] dark:hover:bg-[#303030] rounded-4xl">
                                    <CircleUserRound />
                                    <span className="text-sm font-medium">Sign in</span>
                                </div>
                            </Link>
                        )}
                    </div>
                </div>       
            </nav>

            {/* Render conditionally */}
            {openCreateChannel && <CreateChannel open={openCreateChannel} setOpen={setOpenCreateChannel} />}

            {openUploadVideo && <UploadVideo open={openUploadVideo} setOpen={setOpenUploadVideo} />}       
        
            {openUpdate && <UpdateUser open={openUpdate} setOpen={setOpenUpdate} user={currentUser} />}

            <ConfirmPopup 
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleDeleteAccount}
                title="Delete Account ?"
                message="Are you sure you want to delete your account permanently? This action cannot be undone and you will lose all your videos and channels."
                confirmText="Delete My Account"
            />
        </>
    );
};

export default Navbar;