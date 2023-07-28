import React from 'react';

function SheetMusic() {

    // Sample sheet music data (replace this with data from the backend)
    const sheetMusicData = [
      { sheetMusicID: 1, sheetMusicName: 'Spongebob Squarepants Theme', composer: 'Blaise Smith', arranger: 'Larry Moore', genre: 'Pop' },
      { sheetMusicID: 2, sheetMusicName: 'O virtus Sapientiae', composer: 'Hildegard of Bingen', arranger: 'Mark Mothersbaugh', genre: 'Classical' },
      { sheetMusicID: 3, sheetMusicName: 'Imperial March', composer: 'John Williams', arranger: 'George Lucas', genre: 'Pop' },
      // Add other sheet music data here
    ];
  
    // Sample program options (replace this with data from the backend)
    const programOptions = [
      { value: '', label: 'None' },
      { value: 'program1', label: "Bethoven's 5th" },
      { value: 'program2', label: 'Mischevious Mahler' },
      { value: 'program3', label: 'Women in Music'}
      // Add other program options here
    ];

  return (
    <div>
      <h1>Sheet Music</h1>
     

      <table border="1">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Composer</th>
          <th>Arranger</th>
          <th>Genre</th>
          <th>Program Name</th>
        </tr>
        {sheetMusicData.map((sheetMusic) => (
          <tr key={sheetMusic.sheetMusicID}>
            <td>{sheetMusic.sheetMusicID}</td>
            <td>{sheetMusic.sheetMusicName}</td>
            <td>{sheetMusic.composer}</td>
            <td>{sheetMusic.arranger}</td>
            <td>{sheetMusic.genre}</td>
            <td>
              <select name={`program${sheetMusic.sheetMusicID}`}>
                {programOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </table>

      <h2>Add Sheet Music</h2>
      <form>
        <label htmlFor="sheetMusicName">Name</label>
        <input type="text" id="sheetMusicName" name="sheetMusicName" required /><br />
        <label htmlFor="composer">Composer</label>
        <input type="text" id="composer" name="composer" required /><br />
        <label htmlFor="arranger">Arranger</label>
        <input type="text" id="arranger" name="arranger" /><br />
        <label htmlFor="genre">Genre</label>
        <input type="text" id="genre" name="genre" required /><br />
        <input type="submit" value="Submit" />
      </form>


      <footer>
        <p>&copy; 2023 Jared Norris & Samantha Jarrah</p>
      </footer>
    </div>
  );
}

export default SheetMusic;
