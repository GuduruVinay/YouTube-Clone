import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import Channel from "./pages/Channel";

// Componets
import Navbar from "./components/Navbar";
import Sidebar from './components/Sidebar';

const THEME_KEY = "theme";

const Layout = ({isDark, setIsDark}) => {
  // State: Sidebar Toggle 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden dark:bg-[#0f0f0f] dark:text-white">
      {/* Sidebar */}
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto">
        <Navbar isDark={isDark} setIsDark={setIsDark} setIsMenuOpen={setIsMenuOpen} />
        {/* The Outlet is where Home, Video, or SignIn will render */}
        <Outlet />
      </div>
    </div>
  )
}

function App() {
  // State: Dark Mode
  const [isDark, setIsDark] = useState(() => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  // If a theme is saved, use it
  if(savedTheme) {
    return savedTheme === "dark";
  }
  // If NO theme is saved, Default to true (Dark Mode)
    return true;
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
    <BrowserRouter>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: isDark ? "#333" : "#fff",
            color: isDark ? "#fff" : "#333",
          },
        }}
      />
      <Routes>
        {/* Standlone Page (No Sidebar/Navbar) */}
        <Route path="/signin" element={ <SignIn /> } />
        {/* Main Application Layout */}
        <Route path="/" element={<Layout isDark={isDark} setIsDark={setIsDark} />}>
          {/* These are the children that get injected into <Outlet /> */}
          {/* Home page */}
          <Route index element={ <Home /> } />
          {/* Search Results */}
          <Route path="search" element={<Search />} />
          {/* Video Player Page */}
          <Route path="video/:videoId" element={ <Video /> } />
          {/* Channel Page */}
          <Route path="channel/:id" element={ <Channel /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
