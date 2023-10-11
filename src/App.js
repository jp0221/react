import React from 'react';
import HomePage from './components/HomePage';
import Customers from './components/Customers';
import Movies from './components/Movies';
import NotFound from './components/notfound';
import Reports from './components/Report';
import { BrowserRouter, Routes, Route,} from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/customers" element={<Customers />}/>
          <Route path="/Movies" element={<Movies />}/>
          <Route path="/Report" element={<Reports />}/>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;