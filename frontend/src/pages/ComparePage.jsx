import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";

function ComparePage() {
  const [p1, setP1] = useState(null);
  const [p2, setP2] = useState(null);

  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);

  const [format, setFormat] = useState("ODI");
  const [loading, setLoading] = useState(false);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;



  // 🔍 Fetch suggestions
  const handleSearchChange = async (value, player) => {
    if (player === 1) {
      setP1(prev => ({ ...prev, name: value }));
    } else {
      setP2(prev => ({ ...prev, name: value }));
    }

    if (value.length < 2) {
      player === 1 ? setSuggestions1([]) : setSuggestions2([]);
      return;
    }

    try {
      const res = await axios.get(
        `${backendUrl}/api/players/suggest?name=${value}`
      );

      player === 1 ? setSuggestions1(res.data) : setSuggestions2(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  // ✅ Select suggestion
  const selectPlayer = (player, type) => {
    if (type === 1) {
      setP1(player);
      setSuggestions1([]);
    } else {
      setP2(player);
      setSuggestions2([]);
    }
  };

  const handleKeyDown = (e, player) => {
    if (e.key === "Enter") {
      const list = player === 1 ? suggestions1 : suggestions2;

      if (list.length > 0) {
        selectPlayer(list[0], player);
      } else {
        player === 1 ? setSuggestions1([]) : setSuggestions2([]);
      }
    }
  };

  // 🔍 Fetch player data
  const fetchPlayers = async () => {
    try {
      setLoading(true);

      const res1 = await axios.get(
        `${backendUrl}/api/players/search?playerId=${p1.id}`
      );

      const res2 = await axios.get(
        `${backendUrl}/api/players/search?playerId=${p2.id}`
      );

      setData1(res1.data);
      setData2(res2.data);
    } catch (err) {
      console.error(err);
      alert("Player not found");
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Compare helper
  const getBetter = (a, b) => {
    const valA = Number(a) || 0;
    const valB = Number(b) || 0;

    if (valA === valB) return "";
    return valA > valB ? "text-green-400 font-semibold" : "text-red-400";
  };

  return (
    <div className="min-h-screen bg-background text-white p-6 space-y-6">

      {/* 🔥 HEADER (FIXED ALIGNMENT) */}
      <div className="grid grid-cols-3 items-start text-center gap-6">

        {/* LEFT PLAYER */}
        <div className="flex flex-col items-center gap-3 relative">

          <div className="w-full max-w-xs relative">
            <input
              value={p1?.name || ""}
              onChange={(e) => handleSearchChange(e.target.value, 1)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              placeholder="Search Player 1"
              className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:ring-2 focus:ring-accent outline-none"
            />

            {suggestions1.length > 0 && (
              <div className="absolute w-full bg-card border border-border mt-1 rounded-lg shadow-lg z-10">
                {suggestions1.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => selectPlayer(player, 1)}
                    className="px-4 py-2 hover:bg-border cursor-pointer"
                  >
                    {player.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {data1 && (
            <Link to={`/player/${data1.id}/${slugify(data1.name)}`} className="flex flex-col items-center">
              <img
                src={data1.image}
                alt={data1.name}
                className="w-24 h-24 rounded-xl object-cover hover:scale-105 transition"
              />
              <h2 className="font-bold text-gray-800 hover:text-accent transition">
                {data1.name}
              </h2>
            </Link>
          )}
        </div>

        {/* CENTER (ALIGNED FIX) */}
        <div className="flex flex-col items-center justify-start gap-2 mt-1">
          <button
            onClick={fetchPlayers}
            disabled={loading || !p1?.id || !p2?.id}
            className="bg-accent px-6 py-2 rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
          >
            {loading ? "Loading..." : "Compare"}
          </button>

          <div className="text-4xl font-bold text-red-500">VS</div>
        </div>

        {/* RIGHT PLAYER */}
        <div className="flex flex-col items-center gap-3 relative">

          <div className="w-full max-w-xs relative">
            <input
              value={p2?.name || ""}
              onChange={(e) => handleSearchChange(e.target.value, 2)}
              onKeyDown={(e) => handleKeyDown(e, 2)}
              placeholder="Search Player 2"
              className="w-full px-4 py-2 rounded-lg bg-card border border-border focus:ring-2 focus:ring-accent outline-none"
            />

            {suggestions2.length > 0 && (
              <div className="absolute w-full bg-card border border-border mt-1 rounded-lg shadow-lg z-10">
                {suggestions2.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => selectPlayer(player, 2)}
                    className="px-4 py-2 hover:bg-border cursor-pointer"
                  >
                    {player.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {data2 && (
            <Link to={`/player/${data2.id}/${slugify(data2.name)}`} className="flex flex-col items-center">
              <img
                src={data2.image}
                alt={data2.name}
                className="w-24 h-24 rounded-xl object-cover hover:scale-105 transition"
              />
              <h2 className="font-bold text-gray-800 hover:text-accent transition">
                {data2.name}
              </h2>
            </Link>
          )}
        </div>
      </div>

      {/* 🔄 LOADING / EMPTY */}
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-accent"></div>
        </div>
      ) : !data1 || !data2 ? (
        <p className="text-center text-gray-400">
          Search players to compare
        </p>
      ) : (
        <>
          {/* 🟢 BASIC INFO */}
          <div className="bg-card p-4 rounded-xl">
            <h3 className="text-lg mb-3 font-semibold">Basic Info</h3>

            <table className="w-full text-center table-fixed">
              <tbody>
                {["role", "battingstyle", "bowlingstyle"].map((key) => (
                  <tr key={key} className="border-b border-border">
                    <td>{data1.personalInfo[key]}</td>
                    <td className="text-gray-400 capitalize">{key}</td>
                    <td>{data2.personalInfo[key]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 FORMAT SWITCH */}
          <div className="flex justify-center gap-3">
            {["Test", "ODI", "T20", "IPL"].map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`px-4 py-2 rounded-lg font-medium transition-all
                  ${
                    format === f
                      ? "bg-accent text-white"
                      : "bg-card text-gray-400 hover:bg-border"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* 🔵 BATTING */}
          <div className="bg-card p-4 rounded-xl">
            <h3 className="text-lg mb-3 font-semibold">
              Batting Stats ({format})
            </h3>

            <table className="w-full text-center table-fixed">
              <tbody>
                {Object.keys(data1.battingSummary).map((stat) => {
                  const v1 = data1.battingSummary[stat]?.[format];
                  const v2 = data2.battingSummary[stat]?.[format];

                  return (
                    <tr key={stat} className="border-b border-border">
                      <td className={getBetter(v1, v2)}>{v1 || "-"}</td>
                      <td className="text-gray-400">{stat}</td>
                      <td className={getBetter(v2, v1)}>{v2 || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 🔴 BOWLING */}
          <div className="bg-card p-4 rounded-xl">
            <h3 className="text-lg mb-3 font-semibold">
              Bowling Stats ({format})
            </h3>

            <table className="w-full text-center table-fixed">
              <tbody>
                {Object.keys(data1.bowlingSummary).map((stat) => {
                  const v1 = data1.bowlingSummary[stat]?.[format];
                  const v2 = data2.bowlingSummary[stat]?.[format];

                  return (
                    <tr key={stat} className="border-b border-border">
                      <td className={getBetter(v1, v2)}>{v1 || "-"}</td>
                      <td className="text-gray-400">{stat}</td>
                      <td className={getBetter(v2, v1)}>{v2 || "-"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default ComparePage;