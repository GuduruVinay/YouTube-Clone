import { Menu, House, Layers2, TvMinimalPlay, CircleUserRound, History, Settings, Flag, CircleQuestionMark, MessageSquareWarning } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
    // Helper Component for Sidebar Buttons
    const SidebarBtn = ({ icon, text, path="/" }) => (
        <Link to={path} className="w-full">
            <div className="flex items-center gap-5 hover:bg-[#f2f2f2] dark:hover:bg-[#212121] p-2 rounded-lg">
                {icon}
                <span className={`text-sm ${!isMenuOpen ? "hidden" : "block"}`}>{text}</span>
            </div>
        </Link>
    );

    return (
        <div>
            {/* Backdrop Overlay */}
            <div 
                className={`fixed inset-0 bg-black/50 z-90 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                onClick={() => setIsMenuOpen(false)}
            />
            {/* Siderbar Drawer */}
            <aside className={`fixed top-0 left-0 bottom-0 z-100 w-[60%] md:w-[30%] lg:w-[15%] flex flex-col gap-6 inset-y-0 pl-1 mr-1 md:pl-3 md:mr-3 p-2 pt-3 bg-white dark:bg-[#0f0f0f] dark:text-white transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>    
                <div className="flex gap-1 ml-1">
                    <button onClick={() => setIsMenuOpen(false)} className="hover:bg-[#e5e5e5] dark:hover:bg-[#212121] p-2 rounded-4xl cursor-pointer"><Menu /></button>
                    <Link to="/" className="w-full">
                        <img src="/youtube_logo.png" alt="YouTube Logo" width={120} className="block dark:hidden" />
                        <img src="/youtube_logo_white.png" alt="YouTube White Logo" width={120} className="hidden dark:block"/>
                    </Link>
                </div>
                <div className="flex flex-col pl-1 mr-4 gap-1">
                    <SidebarBtn icon={<House />} text="Home" />
                    {/* Redirect the remaining buttons to home page only for now*/}
                    <SidebarBtn icon={<Layers2 />} text="Shorts" />
                    <SidebarBtn icon={<TvMinimalPlay />} text="Subscriptions" />
                    <SidebarBtn icon={<CircleUserRound />} text="You" />
                    <SidebarBtn icon={<History />} text="History" />
                    <hr className="my-2 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]" />
                    <div className="px-4 py-2">
                        <p className="text-sm mb-3">Sign in to like videos, comment, and subscribe.</p>
                        <Link to="/signin" >                    
                            <div className="flex w-fit items-center gap-2 text-[#065fd4] dark:text-[#3a9cf0] hover:bg-[#def1ff] py-1.5 px-2.5 border border-[#e5e5e5] dark:border-[#303030] dark:hover:bg-[#263850] dark:hover:border-[#263850] rounded-4xl">
                                <CircleUserRound />
                                <span className="font-semibold text-sm">Sign in</span>
                            </div>
                        </Link>
                    </div>
                    <hr className="my-2 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]" />
                    <SidebarBtn icon={<Settings />} text="Settings" />
                    <SidebarBtn icon={<Flag />} text="Report history" />
                    <SidebarBtn icon={<CircleQuestionMark />} text="Help" />
                    <SidebarBtn icon={<MessageSquareWarning />} text="Send feedback" />
                    <hr className="my-2 border-[0.1] border-[#e5e5e5] dark:border-[#3f3f3f]" />
                </div>
            </aside>
        </div>
    )
}

export default Sidebar;