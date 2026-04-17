import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ComparePage from "./pages/ComparePage";
import BrowsePage from "./pages/BrowsePage";
import PlayerDetail from "./pages/PlayerDetail";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <Routes>
           <Route path="/" element={<LandingPage/>}/>
           <Route path="/browse" element={<BrowsePage/>}/>
           <Route path="/compare" element={<ComparePage/>}/>
           <Route path="/player/:name" element={<PlayerDetail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
