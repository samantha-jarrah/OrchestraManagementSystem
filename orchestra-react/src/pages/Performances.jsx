import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';


function Performances() {
  // define state variables

  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [performancesData, setPerformancesData] = useState([]);
  const [programNames, setProgramNames] = useState([]);
  const [venueNames, setVenueNames] = useState([]);
  const [newPerformance, setNewPerformance] = useState({
    performanceName: '',
    performanceDate: '',
    programID: '',
    venueID: '',
  });

// define functions for updating state variables
useEffect(() => {
  // Fetch performance data from the server and update the state
  axios.get('http://flip3.engr.oregonstate.edu:7897/Performances')
    .then((response) => {
      setPerformancesData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching performance data:', error);
    });


   // Fetch program data from the server and update the state
   axios.get('http://flip3.engr.oregonstate.edu:7897/Programs')
   .then((response) => {
     setProgramNames(response.data);
   })
   .catch((error) => {
     console.error('Error fetching program names:', error);
    });

    // Fetch venue data from the server and update the state
    axios.get('http://flip3.engr.oregonstate.edu:7897/Venues')
    .then((response) => {
      setVenueNames(response.data);
    })
    .catch((error) => {
      console.error('Error fetching venue names:', error);
    });
    }, []);

// Formats date to MM-dd-yyyy    
const formatDate = (dateString) => {
  // Create a new date object from the date string
  const date = new Date(dateString);
  // Format the date and return it
  return format(date, 'MM-dd-yyyy'); 
};
      

  // Helper function to toggle form visibility
  const toggleForm = (formName) => {
    if (formName === 'addForm') {
      setIsAddFormVisible(!isAddFormVisible);
    }
  };

// Handle form submission
const handleSubmit = (event) => {
  // Prevent the default form action
  event.preventDefault();
  
  // send POST request to server
  axios.post(`http://flip3.engr.oregonstate.edu:7897/addPerformances`, newPerformance)
    .then((response) => {
      // Refresh the performances data after successful submission
      setPerformancesData([...performancesData, response.data]);
      // Clear the form
      setNewPerformance({
        performanceName: '',
        performanceDate: '',
        programID: '',
        venueID: '',
      });
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          console.error('Bad request: Please check your form data and try again.');
        } else if (error.response.status === 500) {
          console.error('Internal server error: Please try again later.');
        } else {
          console.error('An error occurred:', error.message);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server. Please check your internet connection.');
      } else {
        // Something else happened while setting up the request
        console.error('An error occurred:', error.message);
      }
    });
};

// Handle form input changes
const handleInputChange = (event) => {
  // variables to hold the name and value of the input that triggered the change
const { name, value } = event.target;
// update the state according to which input triggered the change
setNewPerformance((prevPerformance) => ({
  ...prevPerformance,
  [name]: value,
}));
};
  return (
    <div>
      <h1>Performances</h1>
     
      {/* Performances Table */}
      <table border="1">
        <thead>
        <tr>
          <th>ID</th>
          <th>Performance Name</th>
          <th>Date</th>
          <th>Program Name</th>
          <th>Venue Name</th>
        
        </tr>
        </thead>
        <tbody>

          {/* map over each performance and display a table row with the performance data */}
          {performancesData.map((performance) => (
            <tr key={performance.performanceID}>
              <td className="firstColumn">{performance.performanceID}</td>
              <td>{performance.performanceName}</td>
              <td>{formatDate(performance.performanceDate)}</td>
              <td>{performance.programName}</td>
              <td>{performance.venueName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Performance Form */}
      <div className="form-button">
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Performance'}
        </button>
        <form id="addForm" className={isAddFormVisible ? 'form-content' : 'hidden'} onSubmit={handleSubmit}>
          {/* Form Inputs */}
        <label htmlFor="performanceName">Name</label>
        <input 
          type="text" 
          id="performanceName" 
          name="performanceName" 
          value={newPerformance.performanceName} 
          onChange={handleInputChange} 
          required 
          /><br />
        <label htmlFor="performanceDate">Date</label>
        <input 
          type="date" 
          id="performanceDate" 
          name="performanceDate" 
          value={newPerformance.performanceDate} 
          onChange={handleInputChange} 
          required 
          /><br />
        <label htmlFor="programID">Program Name</label>
        <select 
          id="programID" 
          name="programID" 
          value={newPerformance.programID} 
          onChange={handleInputChange}>
            {/* Add a default option */}
            <option value="">None</option>
            {/* Map over the program names and create an option element for each one */}
            {programNames.map((program) => (
              <option key={program.programID} value={program.programID}>
                {program.programName}
              </option>
            ))}
          </select><br />
        <label htmlFor="venueID">Venue</label>
        <select 
          id="venueID" 
          name="venueID" 
          value={newPerformance.venueID} 
          onChange={handleInputChange}>
        <option value="">None</option>
            {/* Map over the venue names and create an option element for each one */}
            {venueNames.map((venue) => (
              <option key={venue.venueID} value={venue.venueID}>
                {venue.venueName}, {venue.cityState}
              </option>
            ))}
        </select><br/>
        <input type="submit" value="Submit" />
        </form>
      </div>


      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
            }
            

export default Performances;
