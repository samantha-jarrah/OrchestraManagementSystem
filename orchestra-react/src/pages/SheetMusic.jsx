import React, {useState, useEffect} from 'react';
import axios from 'axios';

function SheetMusic() {
  // declare state variables
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [sheetMusicData, setSheetMusicData] = useState([]);
  const [programsData, setProgramsData] = useState([]);
  const [newSheetMusic, setNewSheetMusic] = useState({
    sheetMusicName: '',
    composer: '',
    arranger: '',
    genre: '',
  });
  const [updateSheetMusic, setUpdateSheetMusic] = useState({
    sheetMusicID: '',
    sheetMusicName: '',
    composer: '',
    arranger: '',
    genre: '',
  });
  const [selectedSheetMusic, setSelectedSheetMusic] = useState(''); 
  const [selectedProgram, setSelectedProgram] = useState('');
  const [isAddToProgramFormVisible, setIsAddToProgramFormVisible] = useState(false);
  

  useEffect(() => {
    // Fetch musician data from the server and update the state
    axios.get('http://flip3.engr.oregonstate.edu:7897/SheetMusic')
      .then((response) => {
        setSheetMusicData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching sheetMusic data:', error);
      });

    // Fetch program data from the server and update the state
    axios.get('http://flip3.engr.oregonstate.edu:7897/Programs')
      .then((response) => {
        setProgramsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching program data:', error);
      });
  }, []);

  console.log('SheetMusic component rendered');

  // Helper function to toggle form visibility
  const toggleForm = (formName) => {
    if (formName === 'addForm') {
      setIsAddFormVisible(!isAddFormVisible);
    }
    else if (formName === 'addToProgramForm') {
      setIsAddToProgramFormVisible(!isAddToProgramFormVisible);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://flip3.engr.oregonstate.edu:7897/addSheetMusic`, newSheetMusic)
      .then((response) => {
        // Refresh the sheet music data after successful submission
        setSheetMusicData([...sheetMusicData, response.data]);
        // Clear the form
        setNewSheetMusic({
          sheetMusicName: '',
          composer: '',
          arranger: '',
          genre: '',
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
  const { name, value } = event.target;
  setNewSheetMusic((prevSheetMusic) => ({
    ...prevSheetMusic,
    [name]: value,
  }));
};

// Handle sheet music selection
const handleSheetMusicSelect = (event) => {
  setSelectedSheetMusic(event.target.value);
};

// Handle program selection
const handleProgramSelect = (event) => {
  setSelectedProgram(event.target.value);
};

// Handle add to program form submission
const handleAddToProgramSubmit = (event) => {
  // Prevent the default form submit behavior
  event.preventDefault();

  if (!selectedSheetMusic || !selectedProgram) {
    console.error('Please select both sheet music and a program.');
    return;
  }

  // Send PUT request to the server
  const addToProgramURL = `http://flip3.engr.oregonstate.edu:7897/updateSheetMusicProgram`;

  // The data we are going to send in our request
  const data = {
    sheetMusicID: selectedSheetMusic,
    programID: selectedProgram,
  };

  axios.put(addToProgramURL, data)
    .then((response) => {
      // Update the sheetMusicData array with the updated sheetMusic data
      const updatedSheetMusic = sheetMusicData.map((sheetMusic) =>
        sheetMusic.sheetMusicID === selectedSheetMusic ? { ...sheetMusic, ...data } : sheetMusic
      );
      setSheetMusicData(updatedSheetMusic);
      // Clear the form
      setUpdateSheetMusic({
        sheetMusicID: '',
        sheetMusicName: '',
        composer: '',
        arranger: '',
        genre: '',
      });
    })
    .catch((error) => {
      // Handle error, e.g., show an error message to the user
      console.error('Error adding sheet music to program:', error);
    });
};
    


  return (
    <div>
      <h1>Sheet Music</h1>
     
      {/* sheet music table */}
      <table border="1">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Composer</th>
          <th>Arranger</th>
          <th>Genre</th>
          <th>Program Name</th>
        </tr>
        </thead>
        <tbody>
          {/* map over sheet music data and display each sheet music as a row in the table */}
        {sheetMusicData.map((sheetMusic) => (
          <tr key={sheetMusic.sheetMusicID}>
            <td className="firstColumn">{sheetMusic.sheetMusicID}</td>
            <td>{sheetMusic.sheetMusicName}</td>
            <td>{sheetMusic.composer}</td>
            <td>{sheetMusic.arranger}</td>
            <td>{sheetMusic.genre}</td>
            <td>{sheetMusic.programName === null ? '' : sheetMusic.programName}</td>
          </tr>
        ))}
        </tbody>
      </table>

      {/* Add sheet music form */}
      <div className="form-button">
        {/* Toggle add sheet music form visibility */}
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Sheet Music'}
        </button>
        <form id="addForm"
          className={isAddFormVisible ? 'form-content' : 'hidden'} onSubmit={handleSubmit}>
          <label htmlFor='sheetMusicName'>
            Name </label>
            <input
              type="text"
              id="sheetMusicName"
              name="sheetMusicName"
              required
              value={newSheetMusic.sheetMusicName}
              onChange={handleInputChange}
            /><br />
          <label htmlFor='composer'>
            Composer</label>
            <input 
              type="text"
              name="composer"
              value={newSheetMusic.composer}
              onChange={handleInputChange}
            />
          
          <label htmlFor='arranger'>
            Arranger</label>
            <input
              type="text"
              name="arranger"
              value={newSheetMusic.arranger}
              onChange={handleInputChange}
            /><br />
          
          <label htmlFor='genre'>
            Genre</label>
            <input
              type="text"
              name="genre"
              value={newSheetMusic.genre}
              onChange={handleInputChange}
            />
          
          <input type="submit" value="Submit" />
        </form>
      </div>

      {/* Add sheet music to program form */}
      <div className="form-button">
        {/* Toggle add sheet music to program form visibility */}
        <button type="button" onClick={() => toggleForm('addToProgramForm')}>
          {isAddToProgramFormVisible ? 'Hide Form' : 'Add to Program'}
        </button>
        <form
          id="addToProgramForm"
          className={isAddToProgramFormVisible ? 'form-content' : 'hidden'}
          onSubmit={handleAddToProgramSubmit}
        >
          <label htmlFor="sheetMusicSelect">Select Sheet Music:</label>
          <select
            id="sheetMusicSelect"
            name="sheetMusicID"
            value={selectedSheetMusic}
            onChange={handleSheetMusicSelect}
            required
          >
            <option value="">Select Sheet Music</option>
            {/* Render dropdown options for sheet music */}
            {sheetMusicData.map((sheetMusic) => (
              <option key={sheetMusic.sheetMusicID} value={sheetMusic.sheetMusicID}>
                {sheetMusic.sheetMusicName}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="programSelect">Select Program:</label>
          <select
            id="programSelect"
            name="programID"
            value={selectedProgram}
            onChange={handleProgramSelect}
            required
          >
            <option value="">Select a Program</option>
            {/* Render dropdown options for programs */}
            {programsData.map((program) => (
              <option key={program.programID} value={program.programID}>
                {program.programName}
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

export default SheetMusic;
