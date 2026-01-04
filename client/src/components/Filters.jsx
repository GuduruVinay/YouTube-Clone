import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function Filters() {
    const scrollRef = useRef(null);

    const [showLeftBtn, setShowLeftBtn] = useState(false);
    const [showRightBtn, setShowRightBtn] = useState(true);

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
            current.addEventListener('scroll', updateBtnVisibility);
        }
        return () => current?.removeEventListener('scroll', updateBtnVisibility);
    }, []);

    // function to handle scroll 
    const handleScroll = (direction) => {
        const { current } = scrollRef;
        if(current) {
            const scrollAmount = 250;
            current.scrollBy({
               left: direction === 'left' ? -scrollAmount : scrollAmount
            });
        }
    };

    return (
        <div className='flex items-center relative py-2.5 dark:bg-[#0F0F0F] dark:text-white'>
            {showLeftBtn && (
                <button onClick={() => handleScroll('left')} className='absolute left-2 z-10 rounded-full p-1.5 bg-white hover:bg-[#e5e5e5] dark:bg-[#0f0f0f] dark:hover:bg-[#3f3f3f] hover:scale-105 transition' ><ChevronLeft /></button>
            )}
            <div ref={ scrollRef } className='mx-5 gap-2 flex flex-nowrap overflow-x-auto whitespace-nowrap no-scrollbar scroll-smooth'>
                {["All", "Web Development", "Cricket", "Football", "Gaming", "Sports", "Music", "Animation", "Live", "Game Development", "Movies", "Technology", "Education", "Coding", "Vlogs", "News"].map((item) => (
                    <button key={item} className='px-4 py-1.5 flex-none rounded-lg bg-[#f2f2f2] dark:bg-[#272727] dark:text-white hover:bg-gray-200 dark:hover:bg-[#3f3f3f] transition'>
                        {item}
                    </button>
                ))}
            </div>
            {showRightBtn && (
                <button onClick={() => handleScroll('right')} className='absolute right-2 z-10 rounded-full p-1.5 bg-white hover:bg-[#e5e5e5] dark:bg-[#0f0f0f] dark:hover:bg-[#3f3f3f] hover:scale-105 transition'><ChevronRight /></button>
            )}
        </div>
    );
}

export default Filters;