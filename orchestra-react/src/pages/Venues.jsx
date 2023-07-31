import React, {useState} from 'react';

function Venues() {
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
      <h1>Venues</h1>
      

      <table border="1">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>City, State</th>
          <th>Capacity</th>
        </tr>
        <tr>
          <td>1</td>
          <td>The Filmore Auditorium</td>
          <td>Denver, CO</td>
          <td>637</td>
        </tr>
        <tr>
          <td>2</td>
          <td>The Historic El Rey</td>
          <td>Albuquerque, NM</td>
          <td>154</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Arlene Schnitzer Hall</td>
          <td>Portland, OR</td>
          <td>620</td>
        </tr>
      </table>

      <div className="form-button">
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Venue'}
        </button>
        <form id="addForm" className={isAddFormVisible ? 'form-content' : 'hidden'}>
        <label htmlFor="venueName">Name</label>
        <input type="text" id="venueName" name="venueName" required /><br />
        <label htmlFor="cityState">City, State</label>
        <input type="text" id="cityState" name="cityState" required /><br />
        <label htmlFor="capacity">Capacity</label>
        <input type="text" id="capacity" name="capacity" /><br />
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
