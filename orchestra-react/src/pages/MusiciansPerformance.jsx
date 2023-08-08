import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MusiciansPerformance() {
  // Declare and initialize state variables
  const [musiciansPerformances, setMusiciansPerformances] = useState([]);

  useEffect(() => {
    // Get data from the backend and update the state
    axios.get('http://flip3.engr.oregonstate.edu:7897/MusiciansPerformances')
      .then((response) => {
        setMusiciansPerformances(response.data);
      })
      .catch((error) => {
        console.error('Error fetching musicianPerformance data:', error);
      });
  }, []);

  

  return (
    <div>
      <h1>Musicians Performances</h1>

      {/* musiciansPerformances table */}
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Musician Name</th>
            <th>Performance Name</th>
          </tr>
        </thead>

        {/* map over the musiciansPerformances array to populate the table */}
        {musiciansPerformances.map((musicianPerformance) => (
          <tr key={musicianPerformance.musiciansPerformancesID}>
            <td className="firstColumn">{musicianPerformance.musiciansPerformancesID}</td>
            <td>{musicianPerformance.musicianName}</td>
            <td>{musicianPerformance.performanceName}</td>
          </tr>
        ))}
      </table>

      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default MusiciansPerformance;
