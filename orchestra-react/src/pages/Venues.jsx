import React from 'react';

function Venues() {
  return (
    <div>
      <h1>Venues</h1>
      

      <table border="1">
        <tr>
          <th>venueID</th>
          <th>venueName</th>
          <th>cityState</th>
          <th>capacity</th>
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

      <h2>Add a Venue</h2>
      <form>
        <label htmlFor="venueName">Name</label>
        <input type="text" id="venueName" name="venueName" required /><br />
        <label htmlFor="cityState">City, State</label>
        <input type="text" id="cityState" name="cityState" required /><br />
        <label htmlFor="capacity">Capacity</label>
        <input type="text" id="capacity" name="capacity" /><br />
        <input type="submit" value="Submit" />
      </form>

     

      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default Venues;
