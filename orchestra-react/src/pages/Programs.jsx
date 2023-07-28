import React from 'react';

function Programs() {
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

      <h2>Add a Program</h2>
      <form>
        <label htmlFor="programName">Name</label>
        <input type="text" id="programName" name="programName" required /><br />
        <label htmlFor="theme">Theme</label>
        <input type="text" id="theme" name="theme" required /><br />
        <input type="submit" value="Submit" />
      </form>

   

      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default Programs;
