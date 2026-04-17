import { Link } from 'react-router-dom';
import { Search, Scale } from 'lucide-react';

const LandingPage = () => {
  return (

    // Recommended change for LandingPage.jsx wrapper
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      {/* Branding with glow effect */}
      
      <h1 className="text-8xl font-black text-accent tracking-tighter mb-6 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        CricLens
      </h1>
      
      <p className="max-w-2xl text-xl text-muted leading-relaxed mb-12 font-medium text-black">
        The ultimate cricket analytics hub. Search for any player to get live career stats, 
        ICC rankings, and recent form directly from the field.
      </p>

      <div className="flex flex-col gap-6">
        <Link 
          to="/browse" 
          className="flex items-center justify-center gap-2 bg-accent hover:bg-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/20"
        >
          <Search size={24} />
          Browse Players
        </Link>
        
        <Link 
          to="/compare" 
          className="flex items-center justify-center gap-2 bg-card border border-border hover:border-accent text-foreground px-8 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 shadow-sm"
        >
          <Scale size={24} />
          Compare Players
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;