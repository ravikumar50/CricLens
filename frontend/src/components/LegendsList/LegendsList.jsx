import { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../PlayerCard/PlayerCard";

function LegendsList() {
  const legends = [
    {"id" : "25","name": "Sachin Tendulkar"},
    {"id" : "247","name": "Chris Gayle"},
    {"id" : "213","name": "Jacques Kallis"},
    {"id" : "240","name": "Brian Lara"},
    {"id" : "1413","name": "Virat Kohli"},
    {"id" : "265","name": "MS Dhoni"},
    {"id" : "38","name": "Ricky Ponting"},
    {"id" : "3838","name": "Kapil Dev"},
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  
  
  useEffect(() => {
    async function getPlayers() {
      try {
        const responses = await Promise.allSettled(
          legends.map((legend) =>
            axios.get(`${backendUrl}/api/players/search?playerId=${legend.id}`)
          )
        );

        

        const players = responses
          .filter(r => r.status === "fulfilled")
          .map(r => ({
            id : r.value.data.id,
            name: r.value.data.name,
            personalInfo: r.value.data.personalInfo,
            image: r.value.data.image,
            country: r.value.data.country,
            flag: r.value.data.flag,
          }));

          
          

        setData(players);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getPlayers();
  },[]);


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