import { Link } from "react-router-dom";

function Navbar(){
    return(
        <Link to="/">
            <h1 className="text-4xl font-black text-accent text-center mb-2">
                CricLens
            </h1>
        </Link>
    )
}

export default Navbar;  