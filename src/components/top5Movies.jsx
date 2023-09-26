import React, { useEffect, useState } from "react";
import axios from 'axios';

const Top5Movies = () => {
    const [Movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(()=>{
        const fetchTop5 = async () => {
            try{
                const res = await axios.get("http://localhost:5000/top5movies");
                setMovies(res.data)
                console.log(res)
            } catch(err){
                console.log(err);
            }
        }
        fetchTop5()
    },[]);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    }

    return (
        <div>
            <div className="Top 5">
                <table>
                    <tr>
                        <th>Movie Title</th>
                        <th>Rental Count</th>
                    </tr>
                    {Movies.map(movie=>(
                    <tr key={movie.title}>
                        <td><button onClick={() => handleMovieClick(movie)}>{movie.title}</button></td>
                        <td>{movie.rented}</td>
                    </tr>
                ))}
                </table>
            </div>
            {selectedMovie && (
                <div className="Movie Description">
                    <h2>{selectedMovie.title}</h2>
                    <p>{selectedMovie.description}</p>
                </div>
            )}
        </div>
    )
};

export default Top5Movies;