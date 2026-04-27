import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import LegendsList from "../components/LegendsList/LegendsList";
import Navbar from "../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { slugify } from "../utils/slugify";


function BrowsePage() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  // 🔍 Handle search button / Enter
  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/player/${encodeURIComponent(query)}`);
    setSuggestions([]);
  };

  // 🎯 Select from dropdown
  const selectPlayer = (player) => {
    const slug = slugify(player.name);

    navigate(`/player/${player.id}/${slug}`);
    setQuery(player.name);
    setSuggestions([]);
    setActiveIndex(-1);
  };


  // ⚡ Debounced API call
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length < 2) {
        setSuggestions([]);
        setActiveIndex(-1);
        return;
      }

      try {
        setLoading(true);

        const res = await axios.get(
          `${backendUrl}/api/players/suggest?name=${query}`
        );

        setSuggestions(res.data); 
        setActiveIndex(-1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="h-screen flex flex-col px-3 py-1">

      {/* Navbar */}
      <Navbar />

      {/* 🔍 Search Bar */}
      <div className="w-full flex items-center gap-2 mb-2 relative">

        <input
          type="text"
          placeholder="Search player..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              if (suggestions.length > 0) {
                setActiveIndex((prev) => (prev + 1) % suggestions.length);
              }
            }

            else if (e.key === "ArrowUp") {
              e.preventDefault();
              if (suggestions.length > 0) {
                setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
              }
            }

            else if (e.key === "Enter") {
              if (suggestions.length > 0) {
                const index = activeIndex >= 0 ? activeIndex : 0;
                selectPlayer(suggestions[index]);
              } else {
                handleSearch();
              }
            }
          }}
          className="flex-1 px-4 py-2 rounded-xl bg-card border border-border text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />

        <button
          onClick={handleSearch}
          className="bg-accent hover:bg-blue-500 text-white px-5 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <Search size={18} />
          Search
        </button>

        {/* 🔥 Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-card border border-border mt-1 rounded-xl shadow-lg z-50">
            {suggestions.map((player, index) => (
              <div
                key={player.id}
                onClick={() => selectPlayer(player)}
                className={`px-4 py-2 cursor-pointer ${
                  index === activeIndex
                    ? "bg-accent text-white"
                    : "hover:bg-border"
                }`}
              >
                {player.name}
              </div>
            ))}
          </div>
        )}

        {/* ⏳ Loading (only when no suggestions yet) */}
        {loading && suggestions.length === 0 && (
          <div className="absolute top-full left-0 mt-1 px-4 py-2 text-gray-400">
            Searching...
          </div>
        )}
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