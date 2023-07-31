import React, { useState } from 'react';

function Musicians() {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  // Helper function to toggle form visibility
  const toggleForm = (formName) => {
    if (formName === 'addForm') {
      setIsAddFormVisible(!isAddFormVisible);
    } else if (formName === 'updateForm') {
      setIsUpdateFormVisible(!isUpdateFormVisible);
    }
  };
  

  const handleDeleteClick = (musicianID) => {
    // Implement the delete functionality here, for example:
    // - Get the selected musician ID from the form
    // - Perform the deletion action (e.g., call an API or update state)
    // - Refresh the table or perform any other necessary updates
    console.log(`Delete button clicked for musician with ID ${musicianID}`);
  };

    // Sample musician data (replace this with your actual data)
    const musiciansData = [
      { musicianID: 1, musicianName: 'Bruce Wayne', musicianPhone: '(405) 971-9543', musicianEmail: 'batman@gmail.com', instrument: 'saxophone' },
      { musicianID: 2, musicianName: 'Barry Allen', musicianPhone: '(679) 834-9081', musicianEmail: 'theflash@hotmail.com', instrument: 'oboe' },
      { musicianID: 3, musicianName: 'Tony Stark', musicianPhone: '(875) 435-9821', musicianEmail: 'ironman@yahoo.com', instrument: 'violin' },
    ];

   

  return (
    <div>

      
      <h1>Musicians</h1>
      

      <table border="1">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
          <th>Instrument</th>
          <th>Delete</th>
        </tr>
        
        {musiciansData.map((musician) => (
          <tr key={musician.musicianID}>
            <td>{musician.musicianID}</td>
            <td>{musician.musicianName}</td>
            <td>{musician.musicianPhone}</td>
            <td>{musician.musicianEmail}</td>
            <td>{musician.instrument}</td>
            <td>
              <a href='#' onClick={() => handleDeleteClick(musician.musicianID)}>Delete</a>
            </td>
          </tr>
        ))}
      </table>

      <div className="form-button">
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Musician'}
    
        </button>
        <form id="addForm" className={isAddFormVisible ? 'form-content' : 'hidden'}>
        <label htmlFor="musicianName">Name</label>
        <input type="text" id="musicianName" name="musicianName" required /><br />
        <label htmlFor="musicianPhone">Phone</label>
        <input type="text" id="musicianPhone" name="musicianPhone" required /><br />
        <label htmlFor="musicianEmail">Email</label>
        <input type="email" id="musicianEmail" name="musicianEmail" required /><br />
        <label htmlFor="instrument">Instrument</label>
        <input type="text" id="instrument" name="instrument" required /><br />
        <label htmlFor="performaceDate">Performance/Date</label>
        <select id="performanceDate" name="performanceDate">
          <option value="1">Trans Siberian Orchestra, 12/22/2023</option>
          <option value="2">The Nut Cracker, 12/24/2023</option>
          <option value="3">Bethoven's 5th, 12/31/2023</option>
        </select>
        <input type="submit" value="Submit" />
        </form>
      </div>

      <div className="form-button">
        <button type="button" onClick={() => toggleForm('updateForm')}>
          {isUpdateFormVisible ? 'Hide Form' : 'Update Musician'}
        </button>
        <form id="updateForm" className={isUpdateFormVisible ? 'form-content' : 'hidden'}>
          
        <label htmlFor="musicianID">ID</label>
        <input type="text" id="musicianID" name="musicianID" required /><br />
        <label htmlFor="musicianName">Name</label>
        <input type="text" id="musicianName" name="musicianName" required /><br />
        <label htmlFor="musicianPhone">Phone</label>
        <input type="text" id="musicianPhone" name="musicianPhone" required /><br />
        <label htmlFor="musicianEmail">Email</label>
        <input type="email" id="musicianEmail" name="musicianEmail" required /><br />
        <label htmlFor="instrument">Instrument</label>
        <input type="text" id="instrument" name="instrument" required /><br />
        <label htmlFor="performaceDate">Performance/Date</label>
        <select id="performanceDate" name="performanceDate">
          <option value="1">Trans Siberian Orchestra, 12/22/2023</option>
          <option value="2">The Nut Cracker, 12/24/2023</option>
          <option value="3">Bethoven's 5th, 12/31/2023</option>
        </select>
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
