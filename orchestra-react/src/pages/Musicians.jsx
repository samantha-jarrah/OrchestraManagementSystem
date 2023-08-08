import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";

// manage musicians page component
function Musicians() {
  
  // state variables to control visibility of different forms
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  
  // state variables to hold musician data
  const [musiciansData, setMusiciansData] = useState([]);
  const [newMusician, setNewMusician] = useState({
    musicianName: '',
    musicianPhone: '',
    musicianEmail: '',
    instrument: '',
  });
  const [updateMusician, setUpdateMusician] = useState({
    musicianID: '',
    musicianName: '',
    musicianPhone: '',
    musicianEmail: '',
    instrument: '',
  });
  
  // state variables to hold performance data
  const [performancesData, setPerformancesData] = useState([]);
  const [selectedPerformance, setSelectedPerformance] = useState('');
  const [selectedMusicianID, setSelectedMusicianID] = useState('');
  const [isAddPerformanceFormVisible, setIsAddPerformanceFormVisible] = useState(false);

  


  // Fetch musician and performance data from the server using the useEffect hook
  useEffect(() => {
    // Fetch musician data from the server and update the state
    axios.get('http://flip3.engr.oregonstate.edu:7897/Musicians')
      .then((response) => {
        setMusiciansData(response.data);

      // Set the updateMusician state with the first musician's data
      if (response.data.length > 0) {
        const firstMusician = response.data[0];
        setUpdateMusician({
          musicianID: firstMusician.musicianID,
          musicianName: firstMusician.musicianName,
          musicianPhone: firstMusician.musicianPhone,
          musicianEmail: firstMusician.musicianEmail,
          instrument: firstMusician.instrument,
        });
      }
    })
      .catch((error) => {
        console.error('Error fetching musician data:', error);
      });

      // Fetch performance data from the server and update the state
  axios.get('http://flip3.engr.oregonstate.edu:7897/Performances')
  .then((response) => {
    setPerformancesData(response.data);
  })
  .catch((error) => {
    console.error('Error fetching performance data:', error);
  });

  }, []);

  // Helper function to toggle form visibility
  const toggleForm = (formName) => {
    if (formName === 'addForm') {
      setIsAddFormVisible(!isAddFormVisible);
    } else if (formName === 'updateForm') {
      setIsUpdateFormVisible(!isUpdateFormVisible);
    } else if (formName === 'addPerformanceForm') {
      setIsAddPerformanceFormVisible(!isAddPerformanceFormVisible);
    }
  };



// Handle form input changes
const handleInputChange = (event) => {
  // Extract the name and value properties from the event.target (input element)
  const { name, value } = event.target;

  // Update the 'newMusician' state using the setter function and the previous state
  setNewMusician((prevMusician) => ({
    ...prevMusician,
    [name]: value,
  }));
  };


  
  // Handle update form input changes
  
  const handleUpdateChange = (event) => {
    const { name, value } = event.target;

    console.log("Name:", name); // Log the name of the field being updated to the console
    console.log("Value:", value);
  
    // Check if the updated field is 'musicianID'
    if (name === 'musicianID') {

      // Parse the selected musician ID as an integer
      const selectedMusicianID = parseInt(event.currentTarget.value, 10);
      console.log("Selected Musician ID:", selectedMusicianID);

      console.log('All Musicians Data:', musiciansData);

      // Find the selected musician based on the musicianID
      const selectedMusician = musiciansData.find((musician) => musician.musicianID === selectedMusicianID);
      console.log("Selected Musician:", selectedMusician);
      
      // Update the 'updateMusician' state with the selected musician's data
      setUpdateMusician((prevMusician) => ({
        ...prevMusician,
        [name]: selectedMusicianID,
        musicianName: selectedMusician ? selectedMusician.musicianName : '',
        musicianPhone: selectedMusician ? selectedMusician.musicianPhone : '',
        musicianEmail: selectedMusician ? selectedMusician.musicianEmail : '',
        instrument: selectedMusician ? selectedMusician.instrument : '',
      }));
    } else {

      // For other fields, update the state with the new value
      setUpdateMusician((prevMusician) => ({
        ...prevMusician,
        [name]: value,
      }));
    }
  };

  // Handle form submission
const handleSubmit = (event) => {
  // Prevent the default form action
  event.preventDefault();

  // Send a POST request to the server with the new musician data in the request body
  axios.post(`http://flip3.engr.oregonstate.edu:7897/addMusician`, newMusician)
    .then((response) => {
      // Refresh the performances data after successful submission
      setMusiciansData([...musiciansData, response.data]);
      // Clear the form
      setNewMusician({
        musicianName: '',
        musicianPhone: '',
        musicianEmail: '',
        instrument: '',
      });
    })
    .catch((error) => {
      // Handle errors that occur during the request
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 400) {
          // invalid request data
          console.error('Bad request: Please check your form data and try again.');
        } else if (error.response.status === 500) {
          // internal server error
          console.error('Internal server error: Please try again later.');
        } else {
          // some other error
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

// Handle update form submission
const handleUpdateSubmit = (event, musicianID) => {
  // Prevent the default form action
  event.preventDefault();
  console.log("Musician ID:", musicianID);

  // Construct the URL for the PUT request
  const updateURL = `http://flip3.engr.oregonstate.edu:7897/updateMusician/${musicianID}`;

  // Send a PUT request to the server with the updated musician data in the request body
  axios.put(updateURL, updateMusician) 
    .then((response) => {
      // Update the musiciansData array with the updated musician data
      const updatedMusicians = musiciansData.map((musician) =>
        musician.musicianID === musicianID ? { ...musician, ...updateMusician } : musician
      );
      setMusiciansData(updatedMusicians);
      // Clear the form
      setUpdateMusician({
        musicianID: '',
        musicianName: '',
        musicianPhone: '',
        musicianEmail: '',
        instrument: '',
      });
    })
    .catch((error) => {
      if (error.response) {
        // Handle error responses as needed
        if (error.response.status === 400) {
          // invalid request data
          console.error('Bad request: Please check your form data and try again.');
        } else if (error.response.status === 500) {
          // internal server error
          console.error('Internal server error: Please try again later.');
        } else {
          // some other error
          console.error('An error occurred:', error.message);
        }
      } else if (error.request) {
        // Handle errors that occur while setting up the request
        console.error('No response received from the server. Please check your internet connection.');
      } else {
        // Something else happened while setting up the request
        console.error('An error occurred:', error.message);
      }
    });
};


  
  // Handle delete button click
  const handleDeleteClick = (musicianID) => {
    // Send a DELETE request to the server with the musician ID in the URL
    axios.delete(`http://flip3.engr.oregonstate.edu:7897/deleteMusician/${musicianID}`)
      .then((response) => {
        if (response.status === 200) {
          // Refresh the musicians data after successful deletion
          setMusiciansData(musiciansData.filter(musician => musician.musicianID !== musicianID));

          // log success message to the console
          console.log(`Musician with ID ${musicianID} deleted successfully.`);
        } else {

          // log unexpected response code to the console
          console.error(`Unexpected response status: ${response.status}`);
        }
      })
      .catch((error) => {

        // Handle errors that occur during the request
        console.error(`Error deleting musician with ID ${musicianID}:`, error.message);
      });
  };

  // Handle musician select
  const handleMusicianSelect = (event) => {

    // set the selected musician ID state to the value selected in the dropdown
    setSelectedMusicianID(event.target.value); 
  };
  
  // Handle performance select
  const handlePerformanceSelect = (event) => {
    // set the selected performance state to the value selected in the dropdown
    setSelectedPerformance(event.target.value);
  };

  // Handle add musician to performance form submission
  const handleAddToPerformanceSubmit = (event) => {
    // Prevent the default form action
    event.preventDefault();
    
    // Check that both a musician and a performance have been selected
    if (!selectedMusicianID || !selectedPerformance) {
      // If not, log an error message to the console and return early
      console.error('Please select both a musician and a performance.');
      return;
    }
    
    // Construct the URL for the POST request
    const addMusicianToPerformanceURL = `http://flip3.engr.oregonstate.edu:7897/addMusiciansPerformances`;
    
    // Data object to send in the request body
    const data = {
      musicianID: selectedMusicianID,
      performanceID: selectedPerformance,
    };
    
    // Send a POST request to the server with the musician and performance IDs in the request body
    axios.post(addMusicianToPerformanceURL, data)
      .then((response) => {
   
  
        
        console.log('Musician added to performance successfully.');
      })
      .catch((error) => {
        
        console.error('Error adding musician to performance:', error);
      });
  };
  


  
  
  

  return (
    <div>

      {/* Musicians table */}
      <h1>Musicians</h1>
      
      <table border="1">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Instrument</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
          {/* Map each musician to a table row */}
        {musiciansData.map((musician) => (
          <tr key={musician.musicianID}>
            <td className="firstColumn">{musician.musicianID}</td>
            <td>{musician.musicianName}</td>
            <td>{musician.musicianPhone}</td>
            <td>{musician.musicianEmail}</td>
            <td>{musician.instrument}</td>
            <td>
              {/* Delete button triggers handleDeleteClick */}
              <a href='#' onClick={() => handleDeleteClick(musician.musicianID)}><AiFillDelete /></a>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      
      {/* Add musician form */}
      <div className="form-button">

        {/* Toggle add musician form visibility */}
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Musician'}
    
        </button>

        {/* Add musician form */}
        <form id="addForm" className={isAddFormVisible ? 'form-content' : 'hidden'} onSubmit={handleSubmit}>
        <label htmlFor="musicianName">Name</label>
        <input 
          type="text" 
          id="musicianName" 
          name="musicianName" 
          value={newMusician.musicianName} 
          onChange={handleInputChange} 
          required 
          /><br />
        <label htmlFor="musicianPhone">Phone</label>
        <input 
          type="text" 
          id="musicianPhone" 
          name="musicianPhone" 
          value={newMusician.musicianPhone} 
          onChange={handleInputChange} 
          required 
          /><br />
        <label htmlFor="musicianEmail">Email</label>
        <input 
          type="email" 
          id="musicianEmail" 
          name="musicianEmail" 
          value={newMusician.musicianEmail} 
          onChange={handleInputChange} 
          required 
          /><br />
        <label htmlFor="instrument">Instrument</label>
        <input 
          type="text" 
          id="instrument" 
          name="instrument" 
          value={newMusician.instrument} 
          onChange={handleInputChange} 
          required 
          /><br />
        
        <input type="submit" value="Submit" />
        </form>
      </div>
      
      {/* Update musician form */}
      <div className="form-button">

        {/* Toggle update musician form visibility */}
        <button type="button" onClick={() => toggleForm('updateForm')}>
          {isUpdateFormVisible ? 'Hide Form' : 'Update Musician'}
        </button>

        {/* Update musician form */}
        <form id="updateForm" className={isUpdateFormVisible ? 'form-content' : 'hidden'} 
        onSubmit={(event) => handleUpdateSubmit(event, updateMusician.musicianID)}
        >
          
        <label htmlFor="musicianID">ID</label>
        <select
      id="musicianID"
      name="musicianID"
      value={updateMusician.musicianID}
      onChange={handleUpdateChange}
      required
    >
      {/* Render dropdown options */}
      {musiciansData.map((musician) => (
        <option key={musician.musicianID} value={musician.musicianID}>
          {musician.musicianID}, {musician.musicianName}
        </option>
      ))}
    </select>
    <br />
        <label htmlFor="musicianName">Name</label>
        <input type="text" 
          id="musicianName" 
          name="musicianName"
          value={updateMusician.musicianName}
          onChange={handleUpdateChange} 
          required /><br />
        <label htmlFor="musicianPhone">Phone</label>
        <input type="text" 
          id="musicianPhone" 
          name="musicianPhone" 
          value={updateMusician.musicianPhone}
          onChange={handleUpdateChange}
          required /><br />
        <label htmlFor="musicianEmail">Email</label>
        <input type="email" 
          id="musicianEmail" 
          name="musicianEmail" 
          value={updateMusician.musicianEmail}
          onChange={handleUpdateChange}
          required /><br />
        <label htmlFor="instrument">Instrument</label>
        <input type="text" 
          id="instrument" 
          name="instrument"
          value={updateMusician.instrument}
          onChange={handleUpdateChange} 
          required /><br />
        
        <input type="submit" value="Submit" />

        </form>
              
      </div>

      {/* Add musician to performance form */}
      <div className="form-button">

        {/* Toggle add musician to performance form visibility */}
  <button type="button" onClick={() => toggleForm('addPerformanceForm')}>
    {isAddPerformanceFormVisible ? 'Hide Form' : 'Add Musician to Performance'}
  </button>

  {/* Add musician to performance form */}
  <form
    id="addPerformanceForm"
    className={isAddPerformanceFormVisible ? 'form-content' : 'hidden'}
    onSubmit={handleAddToPerformanceSubmit}
  >
    <label htmlFor="musicianSelect">Select Musician:</label>
    <select
      id="musicianSelect"
      name="musicianID"
      value={selectedMusicianID}
      onChange={handleMusicianSelect}
      required
    >
      <option value="">Select a Musician</option>
      {musiciansData.map((musician) => (
        <option key={musician.musicianID} value={musician.musicianID}>
          {musician.musicianName}
        </option>
      ))}
    </select>
    <br />
    <label htmlFor="performanceSelect">Select Performance:</label>
    <select
      id="performanceSelect"
      name="performanceID"
      value={selectedPerformance}
      onChange={handlePerformanceSelect}
      required
    >
      <option value="">Select a Performance</option>
      {performancesData.map((performance) => (
        <option key={performance.performanceID} value={performance.performanceID}>
          {performance.performanceName}, {performance.performanceID}
        </option>
      ))}
    </select>
    <br />
    <input type="submit" value="Submit" />
  </form>
</div>

      

    
      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default Musicians;
