import { Link } from "react-router-dom";

function PlayerCard({id, name, personalInfo, image, country, flag }) {

  return (

    
    

    <Link to={`/player/${id}/${name}`} className="no-underline">
      <div className="bg-card border border-border rounded-2xl p-4 w-[280px] h-[265px] hover:scale-[1.02] transition-all duration-300 shadow-md">
        
        {/* Top Section */}
        <div className="flex items-center gap-4">
          
          {/* Player Image */}
          <img
            src={image}
            alt={name}
            className="w-16 h-16 rounded-full object-cover border-2 border-accent"
          />

          {/* Name + Country */}
          <div>
            <h2 className="text-lg font-semibold text-white">{name}</h2>
            
            <div className="flex items-center gap-2 text-sm text-muted mt-1">
              <img src={flag} alt={country} className="w-5 h-5 rounded-full" />
              <span>{country.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-4"></div>

        {/* Bottom Section (Personal Info) */}
        <div className="text-sm text-muted space-y-1">
          <p><span className="text-white font-medium">Born:</span> {personalInfo.born}</p>
          <p><span className="text-white font-medium">Birthplace:</span> {personalInfo.birthplace}</p>
          <p><span className="text-white font-medium">Role:</span> {personalInfo.role}</p>
          <p><span className="text-white font-medium">Batting:</span> {personalInfo.battingstyle}</p>
          <p><span className="text-white font-medium">Bowling:</span> {personalInfo.bowlingstyle}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlayerCard;