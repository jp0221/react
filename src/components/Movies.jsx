import React, { useEffect, useState } from "react";
import axios from 'axios';



const Movies = () => {
    const [Movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    

    useEffect(()=>{
        const fetchAllMovies = async () => {
            try{
                const res = await axios.get("http://localhost:5000/movies");
                setMovies(res.data)
                setData(res.data)
                console.log(res)
            } catch(err){
                console.log(err);
            }
        }
        fetchAllMovies()
    },[]);

    const handleChange = value => {
        setSearch(value);
        filterData(value);
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue) {
            setData(Movies);
        } else {
            const filteredData = Movies.filter(item => {
                return (
                    item.movie_title.toLowerCase().includes(lowerCaseValue) ||
                    item.actor_names.toLowerCase().includes(lowerCaseValue) ||
                    item.genre_name.toLowerCase().includes(lowerCaseValue)
                );
            });
            setData(filteredData);
        }
    }

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie === selectedMovie ? null : movie);
    };

    return (
        <div>
            <header>
            <h1><a class="home" href="http://localhost:3000/">Home Page</a></h1>
                <link rel="stylesheet" href="HomePage.css" />
            </header>
            <div class="topnav">
                <a class="active" href="http://localhost:3000/Movies">Movies</a>
                <a class="active" href="http://localhost:3000/customers">Customers</a>
                <a class="active" href="#Reports">Reports</a>
            </div>
            <h1>List of Movies</h1>
            <div className="movies">
                <input type="text" value={search} onChange={e => handleChange(e.target.value)}/>
                <table id="movies">
                    <tr>
                        <th>Movie ID</th>
                        <th>Movie Title</th>
                        <th>Actor Names</th>
                        <th>Genre</th>
                    </tr>
                    {data.map(movie=>(
                    <React.Fragment key={movie.film_title}>
                        <tr key={movie.film_title}>
                            <td>{movie.film_id}</td>
                            <td><button type="button" onClick={() => handleMovieClick(movie)}>{movie.movie_title}</button></td>
                            <td>{movie.actor_names}</td>
                            <td>{movie.genre_name}</td>
                            <td><button type="button">Rent</button></td>
                        </tr>
                        {selectedMovie === movie && (
                            <tr>
                                <td colSpan="4">
                                    <div className="movie-details">
                                        <h2>Movie Details</h2>
                                        <p>Title: {selectedMovie.movie_title}</p>
                                        <p>Description: {selectedMovie.movie_description}</p>
                                        <p>Rental Rate: {selectedMovie.rental_rate}</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                    ))}
                {data.length === 0 && <span>No records found to display!</span>}
                </table>
            </div>
        </div>
    )
};

export default Movies;