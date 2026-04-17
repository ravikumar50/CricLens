import { useParams } from "react-router-dom";
import Player from "../components/Player/Player";
import axios from "axios";
import { useEffect, useState } from "react";

function PlayerDetail(){

    const name = useParams().name;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();

    useEffect(()=>{
        async function fetchPlayerDetail(){
            try{
                const res = await axios.get(`http://localhost:5475/api/players/search?name=${encodeURIComponent(name)}`);
                if(res.data){
                    setData(res.data);
                }
            }catch(err){
                console.error(err);
            }finally{
                setLoading(false);      
            }
        }

        fetchPlayerDetail();
    },[name])
    return(
        <div>
            {loading ? <p className="text-center text-gray-950">Loading...</p> : <Player data={data} />}    
        </div>
    )
}

export default PlayerDetail;