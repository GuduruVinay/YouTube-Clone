import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Filters = ({ filter, setFilter }) => {
    const scrollRef = useRef(null);

    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);

    const categories = ["All", "Web Development", "Gaming", "Sports", "Music","React", "MongoDB","Funny", "Cricket", "Football", "Animation", "Live", "Game Development", "Movies", "Tech", "Education", "Coding", "Vlogs", "News"];

    // function to update button visibility of filter left & right buttons
    const updateBtnVisibility = () => {
        const { current } = scrollRef;
        if(current) {
            const { scrollLeft, scrollWidth, clientWidth } = current;
            // Show left button if we've scrolled away from the start
            setShowLeftBtn(scrollLeft > 0);
            // Show right button if there is still content to the right
            setShowRightBtn(scrollLeft < scrollWidth - clientWidth - 1);
        }
    }

    useEffect(() => {
        const { current } = scrollRef;
        if(current) {
            // Check visibility on mount
            updateBtnVisibility();
            // Add scroll listener
            current.addEventListener("scroll", updateBtnVisibility);
        }
        return () => current?.removeEventListener("scroll", updateBtnVisibility);
    }, []);

    // function to handle scroll 
    const handleScroll = (direction) => {
        const { current } = scrollRef;
        if(current) {
            const scrollAmount = 250;
            current.scrollBy({
               left: direction === "left" ? -scrollAmount : scrollAmount
            });
        }
    };

    // Helper Component for Filter Buttons
    const FilterBtn = ({ category }) => (
        <button
            onClick={() => setFilter(category)}
            className={`
                px-3 py-1.5 rounded-lg text-sm cursor-pointer font-semibold whitespace-nowrap transition-colors
                ${filter === category
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-[#e5e5e5] hover:bg-[#d9d9d9] dark:bg-[#272727] dark:hover:bg-[#3f3f3f] dark:text-white"
                }
            `} 
        >
            {category}
        </button>
    );

    return (
        <div className="flex items-center relative pt-3 pb-4 bg-white dark:bg-[#0F0F0F] dark:text-white">
            {showLeftBtn && (
                <button onClick={() => handleScroll("left")} className="cursor-pointer absolute left-2 z-10 rounded-full p-1.5 bg-white hover:bg-[#e5e5e5] dark:bg-[#0f0f0f] dark:hover:bg-[#3f3f3f] hover:scale-105 transition" ><ChevronLeft /></button>
            )}
            <div ref={ scrollRef } className="mx-5 gap-3 flex flex-nowrap overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth">
                {categories.map((item, index) => (
                    <FilterBtn key={index} category={item} />
                ))}
            </div>
            {showRightBtn && (
                <button onClick={() => handleScroll("right")} className="cursor-pointer absolute right-2 z-10 rounded-full p-1.5 bg-white hover:bg-[#e5e5e5] dark:bg-[#0f0f0f] dark:hover:bg-[#3f3f3f] hover:scale-105 transition"><ChevronRight /></button>
            )}
        </div>
    );
};

export default Filters;