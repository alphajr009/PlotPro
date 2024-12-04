import React from 'react';
import Home from './Pages/Home';
import Plants from './Pages/Plants/Plants';
import Fertilizers from './Pages/Fertilizers/Fertilizers';
import AddFertilizer from './Pages/Fertilizers/AddFertilizers';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
<BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} exact />
          <Route path="/home" element={<Home />} exact />
          <Route path="/plants" element={<Plants />} exact />
          <Route path="/fertilizers" element={<Fertilizers />} exact />
          <Route path="/fertilizers/add" element={<AddFertilizer />} exact />
        </Routes>
      </BrowserRouter>
          </div>
  );
}

export default App;
