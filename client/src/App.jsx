import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";


function App() {
    useEffect(() => {
      document.documentElement.classList.add("dark");
    }, []);

    return (
      <BrowserRouter>
        <div className="dark:bg-[#0f0f0f] dark:text-white'">
          <Routes>
            <Route path="/">
              <Route index element={ <Home /> } />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    )
}

export default App;
