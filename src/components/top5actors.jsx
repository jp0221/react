import React, { useEffect, useState } from "react";
import axios from 'axios';

const Top5Actors = () => {
    const [Actors, setActors] = useState([]);
    const [selectedActor, setSelectedActor] = useState(null);

    useEffect(()=>{
        const fetchTop5 = async () => {
            try{
                const res = await axios.get("http://localhost:5000/top5actors");
                setActors(res.data)
                console.log(res)
            } catch(err){
                console.log(err);
            }
        }
        fetchTop5()
    },[]);

    const handleActorClick = (actor) => {
        setSelectedActor(actor);
    }

    return (
        <div>
            <div className="Top 5">
                <table>
                    <tr>
                        <th>Actor ID</th>
                        <th>Actor Name</th>
                        <th>Movie Count</th>
                    </tr>
                    {Actors.map(actor=>(
                    <tr>
                        <td>{actor.actor_id}</td>
                        <td><button onClick={() => handleActorClick(actor)}>{actor.first_name + ' ' + actor.last_name}</button></td>
                        <td>{actor.movie_count}</td>
                    </tr>
                ))}
                </table>
            </div>
            {selectedActor && (
                <div className="Actor Description">
                    <h2>{selectedActor.first_name + ' ' + selectedActor.last_name}</h2>
                    <p><h3>Top Rented Movies:</h3>{selectedActor.top_rented_movies}</p>
                </div>
            )}
        </div>
    )
};

export default Top5Actors;