import React, {useState, useEffect} from 'react';
import axios from 'axios';



function Programs() {
  // define state variables
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [programsData, setProgramsData] = useState([]);
  const [newProgram, setNewProgram] = useState({
    programName: '',
    theme: '',
  });


  useEffect(() => {
    // Fetch program data from the server and update the state
    axios.get('http://flip3.engr.oregonstate.edu:7897/Programs')
      .then((response) => {
        setProgramsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching program data:', error);
      });
  }, []);

  console.log('Programs component rendered');

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
      
      // put request to add new program
      axios.post(`http://flip3.engr.oregonstate.edu:7897/addPrograms`, newProgram)
        .then((response) => {
          // Refresh the venues data after successful submission
          setProgramsData([...programsData, response.data]);
          // Clear the form
          setNewProgram({
            programName: '',
            theme: '',
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
    setNewProgram((prevProgram) => ({
      ...prevProgram,
      [name]: value,
    }));
  };

 

  return (
    <div>
      <h1>Programs</h1>
   
      {/* Table of programs */}
      <table border="1">
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Theme</th>
        </tr>
        </thead>
        <tbody>
          {/* map over each program and display a table row for each item */}
          {programsData.map((program) => (
            <tr key={program.programID}>
              <td className="firstColumn">{program.programID}</td>
              <td>{program.programName}</td>
              <td>{program.theme}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Form to add a new program */}
      <div className="form-button">

        {/* Button to toggle the visibility of the add program form */}
      <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Program'}
        </button>

        {/* Add program form */}
      <form
          id="addForm"
          className={isAddFormVisible ? 'form-content' : 'hidden'}
          onSubmit={handleSubmit}  >
        
          <label htmlFor="programName">Name</label>
          <input
            type="text"
            id="programName"
            name="programName"
            required
            value={newProgram.programName}  
            onChange={(e) => setNewProgram({ ...newProgram, programName: e.target.value })}  
          /><br />
          <label htmlFor="theme">Theme</label>
          <input
            type="text"
            id="theme"
            name="theme"
            required
            value={newProgram.theme} 
            onChange={(e) => setNewProgram({ ...newProgram, theme: e.target.value })}  
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

export default Programs;
