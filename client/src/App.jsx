import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";
import Sidebar from './components/Sidebar';
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import Channel from "./pages/Channel";
import Search from "./pages/Search";

const THEME_KEY = "theme";

function Layout() {
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

  // Check if user is stored in Local Storage
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Handle User Logout
  function handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
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
    return (
      <BrowserRouter>
      {/* Global Dark Mode Wrapper */}
        <div className="dark:bg-[#0f0f0f] dark:text-white">
          <Routes>
            {/* Standlone Page (No Sidebar/Navbar) */}
            <Route path="/signin" element={ <SignIn /> } />
            {/* Wrap routes inside the Layout */}
            <Route path="/" element={<Layout />}>
              {/* These are the children that get injected into <Outlet /> */}
              <Route index element={ <Home /> } />
              <Route path="video/:videoId" element={ <Video /> } />
              <Route path="channel/:id" element={ <Channel /> } />
              <Route path="search" element={<Search />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
