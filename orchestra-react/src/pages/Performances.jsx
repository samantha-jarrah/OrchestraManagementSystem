import React, { useState } from 'react';

function Performances() {
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



  return (
    <div>
      <h1>Performances</h1>
     

      <table border="1">
        <tr>
          <th>ID</th>
          <th>Performance Name</th>
          <th>Date</th>
          <th>Program Name</th>
          <th>Venue Name</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Trans Siberian Orchestra</td>
          <td>12/13/2023</td>
          <td>Women in Music</td>
          <td>The Filmore Auditorium</td>
        </tr>
        <tr>
          <td>2</td>
          <td>The Nut Cracker</td>
          <td>12/24/2023</td>
          <td>Mischievous Mahler</td>
          <td>The Historic El Rey</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Beethoven's 5th</td>
          <td>12/31/2023</td>
          <td>Beethoven's 5th</td>
          <td>Arlene Schnitzer Hall</td>
        </tr>
      </table>

      <div className="form-button">
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Performance'}
        </button>
        <form id="addForm" className={isAddFormVisible ? 'form-content' : 'hidden'}>
        <label htmlFor="performanceName">Name</label>
        <input type="text" id="performanceName" name="performanceName" required /><br />
        <label htmlFor="performanceDate">Date</label>
        <input type="date" id="performanceDate" name="performanceDate" required /><br />
        <label htmlFor="programName">Program Name</label>
        <select id="addProgramName" name="addProgramName">
          <option value="">None</option>
          <option value="1">Beethoven's 5th</option>
          <option value="2">Mischievous Mahler</option>
          <option value="3">Women in Music</option>
        </select>
        <label htmlFor="venueName">Venue Name</label>
        <select id="addVenueName" name="addVenueName">
          <option value="">None</option>
          <option value="1">The Filmore Auditorium</option>
          <option value="2">The Historic El Rey</option>
          <option value="3">Arlene Schnitzer Hall</option>
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

export default Performances;
