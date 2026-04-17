function Player({data}){

    console.log(data);
    
    return(
        <div>
            <h1 className="text-black">Player Detail for {data.name}</h1>
        </div>
    )
}

export default Player;