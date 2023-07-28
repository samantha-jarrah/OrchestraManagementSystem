import React, { useState, useEffect } from 'react';

function MusiciansPerformance() {
  const [musiciansPerformances, setMusiciansPerformances] = useState([]);

  useEffect(() => {
    // Fetch data from the backend and update the state
    fetchMusiciansPerformances();
  }, []);

  // Function to fetch musicians performances data from the backend
  const fetchMusiciansPerformances = async () => {
    try {
      // Replace 'your-backend-url' with the actual URL to fetch data from the backend
      const response = await fetch('your-backend-url/musiciansPerformances');
      const data = await response.json();
      setMusiciansPerformances(data);
    } catch (error) {
      console.error('Error fetching musicians performances data:', error);
    }
  };

  return (
    <div>
      <h1>Musicians Performances</h1>
      <table border="1">
        <tr>
          <th>ID</th>
          <th>Musician Name</th>
          <th>Performance Name</th>
        </tr>
        {musiciansPerformances.map((performance) => (
          <tr key={performance.musicianPerformanceID}>
            <td>{performance.musicianPerformanceID}</td>
            <td>{performance.musicianName}</td>
            <td>{performance.performance}</td>
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
