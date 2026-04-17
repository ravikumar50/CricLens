import { useState } from "react";
import { Search } from "lucide-react";
import LegendsList from "../components/LegendsList/LegendsList";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

function BrowsePage() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return; 
    navigate(`/player/${encodeURIComponent(query)}`);
  };

  return (
    <div className="h-screen flex flex-col px-3 py-1">

      {/* Title */}
       <Navbar/>

      {/* Search Bar */}
      <div className="w-full flex items-center gap-2 mb-2">
        <input
          type="text"
          placeholder="Search player..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 px-4 py-2 rounded-xl bg-card border border-border text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />

        <button
          onClick={handleSearch}
          className="bg-accent hover:bg-blue-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-3">
        Our Legends
      </h2>

      {/* Legends List */}
      <div className="flex-1 overflow-y-auto">
        <LegendsList />
      </div>
    </div>
  );
}

export default BrowsePage;