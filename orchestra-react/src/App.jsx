import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Musicians from './pages/Musicians';
import Performances from './pages/Performances';
import Venues from './pages/Venues';
import Programs from './pages/Programs';
import SheetMusic from './pages/SheetMusic';
import MusiciansPerformance from './pages/MusiciansPerformance';
import Navigation from './components/Navigation';
import './App.css'

function App() {
  return (
    <Router>
      <div>
      <Navigation />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/musicians" element={<Musicians />} />
          <Route path="/performances" element={<Performances />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/sheetMusic" element={<SheetMusic />} />
          <Route path="/musiciansPerformance" element={<MusiciansPerformance />} />
          
        </Routes>
       
      </div>
    </Router>
  )
}

export default App
