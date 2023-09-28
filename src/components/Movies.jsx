import React, { useEffect, useState } from "react";
import axios from 'axios';



const Movies = () => {
    const [Movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);

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

    return (
        <div>
            <header>
            <h1><a href="http://localhost:3000/">Home Page</a></h1>
               <link rel="stylesheet" href="HomePage.css" />
            </header>
            <div class="topnav">
                <a class="active" href="http://localhost:3000/Movies">Movies</a>
                <a href="http://localhost:3000/customers">Customers</a>
                <a href="#Reports">Reports</a>
            </div>
            <h1>List of Movies</h1>
            <div className="movies">
                <input type="text" value={search} onChange={e => handleChange(e.target.value)}/>
                <table id="movies">
                    <tr>
                        <th>Movie ID</th>
                        <th>Movie Title</th>
                        <th>Movie Description</th>
                        <th>Actor Names</th>
                        <th>Genre</th>
                    </tr>
                    {data.map(movie=>(
                    <tr key={movie.film_title}>
                        <td>{movie.film_id}</td>
                        <td>{movie.movie_title}</td>
                        <td>{movie.movie_description}</td>
                        <td>{movie.actor_names}</td>
                        <td>{movie.genre_name}</td>
                        <td><button type="button">Rent</button></td>
                    </tr>
                    ))}
                {data.length === 0 && <span>No records found to display!</span>}
                </table>
            </div>
        </div>
    )
};

export default Movies;