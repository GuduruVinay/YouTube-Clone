import { useEffect, useState } from "react";
import Navbar from "./components/Navbar"
import VideoGrid from "./components/VideoGrid";

const THEME_KEY = "theme";

function App() {
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
    <div>
      <button onClick={() => setIsDark(!isDark)} className='w-10 h-10 absolute inset-y-2 inset-x-347 right-2 px-2 py-2 border rounded-full border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'>
        {isDark ? "☀️" : "🌙"}
      </button>

      <Navbar />
      <VideoGrid />

    </div>
  )
}

export default App
