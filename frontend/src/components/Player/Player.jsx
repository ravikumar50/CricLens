import { useState } from "react";
import Navbar from "../Navbar/Navbar";

function Player({ data }) {
  const [activeTab, setActiveTab] = useState("batting");
  const [showFullBio, setShowFullBio] = useState(false);

  if (!data) return <div className="text-white">Loading...</div>;

  const {
    name,
    image,
    country,
    flag,
    personalInfo,
    battingForm,
    bowlingForm,
    battingSummary,
    bowlingSummary,
    iccRankings,
    bioSummary,
    teams
  } = data;

  return (
    <div className=" text-white min-h-screen p-4 space-y-4">

      <Navbar/>

      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 flex items-center gap-6 shadow-lg">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-xl object-cover border-2 border-gray-600"
        />
        <div>
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <img src={flag} alt="flag" className="w-6 h-4" />
            <span className="uppercase text-gray-300">{country}</span>
          </div>
          <p className="mt-2 text-gray-400">{personalInfo.role}</p>
        </div>
      </div>

      {/* 🟢 PERSONAL INFO + TEAMS */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Personal Info */}
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Personal Info</h2>
          <div className="space-y-2 text-gray-300 text-sm">
            {Object.entries(personalInfo).map(([key, value]) => (
              <p key={key}>
                <span className="capitalize text-gray-400">{key}:</span> {value}
              </p>
            ))}
          </div>
        </div>

        {/* Teams */}
        <div className="bg-gray-900 p-4 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">Teams</h2>
          <div className="flex flex-wrap gap-2">
            {teams.map((team, i) => (
              <span
                key={i}
                className="bg-blue-600 px-3 py-1 rounded-full text-sm"
              >
                {team}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 🟡 RECENT FORM */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Batting Form */}
        <div className="bg-gray-900 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Batting Form</h2>

            <table className="w-full text-sm text-center table-fixed">
                <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                    <th className="w-1/4">Score</th>
                    <th className="w-1/4">OPPN.</th>
                    <th className="w-1/4">Format</th>
                    <th className="w-1/4">Date</th>
                </tr>
                </thead>

                <tbody>
                {battingForm.map((m, i) => (
                    <tr key={i} className="border-b border-gray-800">
                    <td>{m.scoreOrWickets}</td>
                    <td>{m.opponent}</td>
                    <td>{m.format}</td>
                    <td>{m.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>

        {/* Bowling Form */}
        <div className="bg-gray-900 p-4 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">Bowling Form</h2>

            <table className="w-full text-sm text-center table-fixed">
                <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                    <th className="w-1/4">Wickets</th>
                    <th className="w-1/4">OPPN.</th>
                    <th className="w-1/4">Format</th>
                    <th className="w-1/4">Date</th>
                </tr>
                </thead>

                <tbody>
                {bowlingForm.map((m, i) => (
                    <tr key={i} className="border-b border-gray-800">
                    <td>{m.scoreOrWickets}</td>
                    <td>{m.opponent}</td>
                    <td>{m.format}</td>
                    <td>{m.date}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      </div>

      {/* 🔴 STATS SECTION */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setActiveTab("batting")}
            className={`px-4 py-2 rounded ${activeTab === "batting" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Batting
          </button>
          <button
            onClick={() => setActiveTab("bowling")}
            className={`px-4 py-2 rounded ${activeTab === "bowling" ? "bg-blue-600" : "bg-gray-700"}`}
          >
            Bowling
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-center table-fixed">
                <thead>
                <tr className="text-gray-400 border-b border-gray-700">
                    <th className="w-1/5">Stat</th>
                    <th className="w-1/5">Test</th>
                    <th className="w-1/5">ODI</th>
                    <th className="w-1/5">T20</th>
                    <th className="w-1/5">IPL</th>
                </tr>
                </thead>

                <tbody>
                {Object.entries(
                    activeTab === "batting" ? battingSummary : bowlingSummary
                ).map(([stat, values]) => (
                    <tr key={stat} className="border-b border-gray-800">
                    <td>{stat}</td>
                    <td>{values.Test}</td>
                    <td>{values.ODI}</td>
                    <td>{values.T20}</td>
                    <td>{values.IPL}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
      </div>

      {/* 🟣 ICC RANKINGS */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">ICC Rankings</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {iccRankings.map((r, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded-lg text-center">
              <p className="text-gray-400">{r.format}</p>
              <p className="text-lg">Current: {r.current}</p>
              <p className="text-sm text-gray-500">Best: {r.best}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ⚫ BIO */}
      <div className="bg-gray-900 p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-3">Biography</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          {showFullBio ? bioSummary : bioSummary.slice(0, 500) + "..."}
        </p>
        <button
          onClick={() => setShowFullBio(!showFullBio)}
          className="mt-3 text-blue-400"
        >
          {showFullBio ? "Show Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}

export default Player;