import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Venues() {
  // define state variables
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [venuesData, setVenuesData] = useState([]);
  const [newVenue, setNewVenue] = useState({
    venueName: '',
    cityState: '',
    capacity: '',
  });

  useEffect(() => {
    // Make an HTTP GET request to fetch Venue data from the backend
    axios.get('http://flip3.engr.oregonstate.edu:7897/Venues')
      .then((response) => {
        setVenuesData(response.data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching venue data:', error);
      });
  }, []);

  console.log('Venues component rendered back ticks!');

    // Helper function to toggle form visibility
    const toggleForm = (formName) => {
      if (formName === 'addForm') {
        setIsAddFormVisible(!isAddFormVisible);
      }
    };

    // Handle form submission
  const handleSubmit = (event) => {
    // Prevent the default form submit action
    event.preventDefault();

    // Make an HTTP POST request to the backend
    axios.post(`http://flip3.engr.oregonstate.edu:7897/addVenue`, newVenue)
      .then((response) => {
        // Refresh the venues data after successful submission
        setVenuesData([...venuesData, response.data]);
        // Clear the form
        setNewVenue({
          venueName: '',
          cityState: '',
          capacity: '',
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
    // variable to hold the name and value of the input that triggered the change event
    const { name, value } = event.target;
    // use the input name to determine which state variable to update with the input value
    setNewVenue((prevVenue) => ({
      ...prevVenue,
      [name]: value,
    }));
  };
  

  return (
    <div>
      <h1>Venues</h1>
      
      {/* venues table*/}
      <table border="1">
      <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>City, State</th>
            <th>Capacity</th>
          </tr>
          </thead>
          <tbody>

            {/* map over each venue and display a table row with venue data */}
            {venuesData.map((venue) => (
              <tr key={venue.venueID}>
                <td className="firstColumn">{venue.venueID}</td>
                <td>{venue.venueName}</td>
                <td>{venue.cityState}</td>
                <td>{venue.capacity}</td>
                </tr>
            ))}
          </tbody>
      </table>
      
      {/* Add venue form */}
      <div className="form-button">
        {/* Button to toggle the visibility of the add venue form */}
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Venue'}
        </button>

        {/* Add venue form */}
        <form
          id="addForm"
          className={isAddFormVisible ? 'form-content' : 'hidden'}
          onSubmit={handleSubmit}
        >
          {/* Form inputs */}
          <label htmlFor="venueName">Name</label>
          <input
            type="text"
            id="venueName"
            name="venueName"
            value={newVenue.venueName}
            onChange={handleInputChange}
            required
          /><br />
          <label htmlFor="cityState">City, State</label>
          <input
            type="text"
            id="cityState"
            name="cityState"
            value={newVenue.cityState}
            onChange={handleInputChange}
            required
          /><br />
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={newVenue.capacity}
            onChange={handleInputChange}
          /><br />
          <input type="submit" value="Submit" />
        </form>
      </div>

     

     

      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default Venues;
