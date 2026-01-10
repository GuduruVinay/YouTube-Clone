import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";
import Navbar from "./components/Navbar";

function Layout() {
  return (
    <div className="flex bg-[#181818] min-h-screen">
      {/* Main Content Area */}
      <div className="h-dvh overflow-hidden">
        <Navbar />
        {/* The Outlet is where Home, Video, or SignIn will render */}
        <div>
          <Outlet />
        </div>
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
            {/* Wrap routes inside the Layout */}
            <Route path="/" element={<Layout />}>
              {/* These are the children that get injected into <Outlet /> */}
              <Route index element={ <Home /> } />
              <Route path="signin" element={ <SignIn /> } />
              <Route path="video/:videoId" element={ <Video /> } />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
}

export default App;
