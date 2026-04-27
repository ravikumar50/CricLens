import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Player from "../components/Player/Player";

function PlayerDetail() {
  const { id, name } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    async function fetchPlayerDetail() {
      try {
        setLoading(true);
        setNotFound(false);

        const res = await axios.get(
          `${backendUrl}/api/players/search?playerId=${id}`
        );

        if (res.data && res.data.name) {
          setData({
            name : name,
            ...res.data
          });
          
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayerDetail();
  }, [name]);

  // ✅ Loading state
  if (loading) {
    return <p className="text-black text-center mt-10">Loading...</p>;
  }

  // ❌ Not Found UI
  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">
          Player Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          No player found with name "<span className="font-semibold">{name}</span>"
        </p>

        <a
          href="/browse"
          className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          Go Back
        </a>
      </div>
    );
  }

  // ✅ Normal UI
  return (
    <div>
      <Player data={data} />
    </div>
  );
}

export default PlayerDetail;