import React from 'react';
import HomePage from './components/HomePage';
import Customers from './components/Customers';
import Movies from './components/Movies';
import { BrowserRouter, Routes, Route,} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/customers" element={<Customers />}/>
          <Route path="/Movies" element={<Movies />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;