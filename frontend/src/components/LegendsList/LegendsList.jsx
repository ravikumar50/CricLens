import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../PlayerCard/PlayerCard";

function LegendsList() {
  const legends = [
    "Sachin Tendulkar",
    "Chris Gayle",
    "Jacques Kallis",
    "Brian Lara",
    "Virat Kohli",
    "MS Dhoni",
    "Ricky Ponting",
    "Kapil Dev",
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const port = process.env.REACT_APP_BACKEND_PORT;
  console.log(port);
  
  useEffect(() => {
    async function getPlayers() {
      try {
        const requests = legends.map((name) =>
          axios.get(
            `http://localhost:${port}/api/players/search?name=${encodeURIComponent(name)}`
          )
        );

        const responses = await Promise.all(requests);

        const players = responses.map((res) => ({
          name: res.data.name,
          personalInfo: res.data.personalInfo,
          image: res.data.image,
          country: res.data.country,
          flag: res.data.flag,
        }));

        setData(players);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getPlayers();
  }, []);


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] gap-4">

        {/* Spinner */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>

        {/* Text */}
        <p className="text-gray-400 text-lg">Loading Legends...</p>

        {/* Optional GFG-style button */}
        <button
          disabled
          className="bg-accent px-6 py-2 rounded-lg opacity-50 cursor-not-allowed"
        >
          Loading...
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-1">
      {data.map((player, index) => (
        <PlayerCard key={index} {...player} />
      ))}
    </div>
  );
}

export default LegendsList;