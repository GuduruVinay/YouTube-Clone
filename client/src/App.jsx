import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Video from "./pages/Video";

function App() {
    return (
      <BrowserRouter>
        <div className="dark:bg-[#0f0f0f] dark:text-white'">
          <Routes>
            <Route path="/">
              <Route index element={ <Home /> } />
              <Route path="/signin" element={ <SignIn /> } />
              <Route path="/video/:videoId" element={ <Video /> } />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
}

export default App;
