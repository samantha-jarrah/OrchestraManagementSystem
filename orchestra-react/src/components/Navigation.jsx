// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Link to="/">Home</Link>
          <Link to="/musicians">Musicians</Link>
          <Link to="/performances">Performances</Link>
          <Link to="/venues">Venues</Link>
          <Link to="/programs">Programs</Link>
          <Link to="/sheetMusic">Sheet Music</Link>
          <Link to="/musiciansPerformance">Musicians Performance</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
