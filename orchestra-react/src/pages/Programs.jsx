import React, {useState} from 'react';

function Programs() {
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
      <h1>Programs</h1>
   

      <table border="1">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Theme</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Beethoven's 5th</td>
          <td>Classical</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Mischievous Mahler</td>
          <td>Classical</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Women in Music</td>
          <td>Female</td>
        </tr>
      </table>

      <div className="form-button">
        <button type="button" onClick={() => toggleForm('addForm')}>
          {isAddFormVisible ? 'Hide Form' : 'Add Program'}
        </button>
        <form id="addForm" className={isAddFormVisible ? 'form-content' : 'hidden'}>
        <label htmlFor="programName">Name</label>
        <input type="text" id="programName" name="programName" required /><br />
        <label htmlFor="theme">Theme</label>
        <input type="text" id="theme" name="theme" required /><br />
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
