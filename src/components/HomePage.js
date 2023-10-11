import React, { useState } from 'react';
import './HomePage.css';
import Top5Movies from './top5Movies';
import Top5Actors from './top5actors';


const HomePage = () => {
    const [show, setShow] = useState(false);

    const [actor, setActor] = useState(false);
    return (
        <div>
            <header>
               <a class="home" href='http://localhost:3000/'><h1>Home Page</h1></a>
               <link rel="stylesheet" href="HomePage.css" />
            </header>
            <main>
                <div class="topnav">
                    <a class="active" href="http://localhost:3000/Movies">Movies</a>
                    <a class="active" href="http://localhost:3000/customers">Customers</a>
                    <a class="active" href="http://localhost:3000/Report">Reports</a>
                </div>

                <div class="top5">
                <button type='button' onClick={()=>setShow(!show)}>List of Movies - Top 5 rented movies</button>
                    {
                        show && <Top5Movies />
                    }
                </div>
                <div class="top5">
                    <button type='button' onClick={()=>setActor(!actor)}>List of Actors - Top 5 actors by numbers of films</button>
                    {
                        actor && <Top5Actors />
                    }
                </div>
            </main>
        </div>
    );
}

export default HomePage;