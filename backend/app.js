/*
    SETUP
*/
import express from 'express';   // We are using the express library for the web server
const PORT        = 7897;         
import { pool } from './database/db-connector.js';  // import the database connector
import cors from 'cors';
const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.use((req, res, next)=> {
    res.setHeader('Access-Control-Allow-Origin', 'http://flip2.engr.oregonstate.edu:3485');  // allows the frontend to access backend resources 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // allows forntend to have access to full CRUD capability
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

/*
    ROUTES
*/


// SELECT for Venues Table
app.get('/Venues', function(req, res)
    {
        let venuesSelect = 'SELECT venueID, venueName, cityState, capacity FROM Venues;';

        pool.query(venuesSelect, function(err, results, fields){

            // Send the results to the browser
            res.send(JSON.stringify(results));
                });
            });

// SELECT for Musicians Table
app.get('/Musicians', function(req, res)
    {
        let musiciansSelect ='SELECT musicianID, musicianName, musicianPhone, musicianEmail, instrument FROM Musicians;';

        pool.query(musiciansSelect, function(err, results, fields){

            // Send the results to the browser
            res.send(JSON.stringify(results));
                });
    });

// SELECT for Programs Table
app.get('/Programs', function(req, res)
{
    let programsSelect ='SELECT programID, programName, theme FROM Programs;';

    pool.query(programsSelect, function(err, results, fields){

        // Send the results to the browser
        res.send(JSON.stringify(results));
            });
});

//SELECT for Performances Table
app.get('/Performances', function(req, res)
{
    let performancesSelect ='SELECT Performances.performanceID, Performances.performanceName, Performances.performanceDate, Programs.programName, Venues.venueName FROM Performances JOIN Programs ON Performances.programID = Programs.programID JOIN Venues ON Performances.venueID = Venues.venueID;';

    pool.query(performancesSelect, function(err, results, fields){

        // Send the results to the browser
        res.send(JSON.stringify(results));
            });
});

// SELECT for SheetMusic Table
app.get('/SheetMusic', function(req, res)
{
    let sheetMusicSelect ='SELECT sheetMusicID, sheetMusicName, composer, arranger, genre, Programs.programName FROM SheetMusic LEFT JOIN Programs ON SheetMusic.programID = Programs.programID;';

    pool.query(sheetMusicSelect, function(err, results, fields){

        // Send the results to the browser
        res.send(JSON.stringify(results));
            });
});

// SELECT for MusiciansPerformances Table
app.get('/MusiciansPerformances', function(req, res)
{
    let musiciansPerformancesSelect ='SELECT musiciansPerformancesID, Musicians.musicianName, Performances.performanceName FROM MusiciansPerformances JOIN Musicians ON MusiciansPerformances.musicianID = Musicians.musicianID JOIN Performances ON MusiciansPerformances.performanceID = Performances.performanceID;';

    pool.query(musiciansPerformancesSelect, function(err, results, fields){

        // Send the results to the browser
        res.send(JSON.stringify(results));
            });
});


// INSERT for MusiciansPerformances from double dropdown
app.post('/addMusiciansPerformances', (req, res) => {
    const {musicianID, performanceID} = req.body;

    let addMusiciansPerformances = 'INSERT INTO MusiciansPerformances (musicianID, performanceID) VALUES (?, ?);';

    pool.query(addMusiciansPerformances, [musicianID, performanceID], (err, results) => {
        res.send(JSON.stringify(results));
    })});

// INSERT for Performances
app.post('/addPerformances', (req, res) => {
    const {performanceName, performanceDate, programID, venueID} = req.body;

    let addPerformances = 'INSERT INTO Performances (performanceName, performanceDate, programID, venueID) VALUES (?, ?, ?, ?);';

    pool.query(addPerformances, [performanceName, performanceDate, programID, venueID], (err, results) => {
        if (err) {
            console.error('Error adding performances:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
      } else {
        // Fetch the newly added performance data from the database using the insert ID. insertID is a property of results and is the auto_incremented ID of the last inserted row
        const newPerformanceID = results.insertId;
        let getNewPerformanceID = 'SELECT Performances.performanceID, Performances.performanceName, Performances.performanceDate, Programs.programName, Venues.venueName FROM Performances JOIN Programs ON Performances.programID = Programs.programID JOIN Venues ON Performances.venueID = Venues.venueID WHERE performanceID = ?;';
        pool.query(getNewPerformanceID, [newPerformanceID], (err, performance) => {
          if (err) {
            console.error('Error fetching newly added performance:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
          } else {
            // Send the newly added performance data to the client
            res.status(200).json(performance[0]);
          }
        });
      }
    });
  });

// INSERT for Venues
app.post('/addVenue', (req, res) => {
    const {venueName, cityState, capacity} = req.body;

    let addVenue = 'INSERT INTO Venues (venueName, cityState, capacity) VALUES (?, ?, ?);';

    pool.query(addVenue, [venueName, cityState, capacity], (err, results) => {
        if (err) {
            console.error('Error adding venue:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
      } else {
        // Fetch the newly added venue data from the database using the insert ID
        const newVenueID = results.insertId;
        let getNewVenueID = 'SELECT * FROM Venues WHERE venueID = ?';
        pool.query(getNewVenueID, [newVenueID], (err, venue) => {
          if (err) {
            console.error('Error fetching newly added venue:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
          } else {
            // Send the newly added venue data to the client
            res.status(200).json(venue[0]);
          }
        });
      }
    });
  });

// INSERT for Musicians
app.post('/addMusician', (req, res) => {
    const { musicianName, musicianPhone, musicianEmail, instrument } = req.body;
  
    let addMusician = 'INSERT INTO Musicians (musicianName, musicianPhone, musicianEmail, instrument) VALUES (?, ?, ?, ?);';
  
    pool.query(addMusician, [musicianName, musicianPhone, musicianEmail, instrument], (err, results) => {
      if (err) {
        console.error('Error adding musician:', err);
        res.status(500).json({ error: 'Internal server error: Please try again later.' });
      } else {
        // Fetch the newly added musician data from the database using the insert ID
        const newMusicianID = results.insertId;
        let getNewMusician = 'SELECT * FROM Musicians WHERE musicianID = ?';
        pool.query(getNewMusician, [newMusicianID], (err, musician) => {
          if (err) {
            console.error('Error fetching newly added musician:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
          } else {
            // Send the newly added musician's data to the client
            res.status(200).json(musician[0]);
          }
        });
      }
    });
  });

// INSERT for SheetMusic
app.post('/addSheetMusic', (req, res) => {
    const {sheetMusicName, composer, arranger, genre} = req.body;

    let addSheetMusic = 'INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre) VALUES (?, ?, ?, ?);';

    pool.query(addSheetMusic, [sheetMusicName, composer, arranger, genre], (err, results) => {
        if (err) {
            console.error('Error adding sheetMusic:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
      } else {
        // Fetch the newly added sheetMusic data from the database using the insert ID
        const newSheetMusicID = results.insertId;
        let getNewSheetMusic = 'SELECT * FROM SheetMusic WHERE sheetMusicID = ?';
        pool.query(getNewSheetMusic, [newSheetMusicID], (err, sheetMusic) => {
          if (err) {
            console.error('Error fetching newly added sheetMusic:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
          } else {
            // Send the newly added sheetMusic data to the client
            res.status(200).json(sheetMusic[0]);
          }
        });
      }
    });
  });

// INSERT for Programs
app.post('/addPrograms', (req, res) => {
    const {programName, theme} = req.body;

    let addPrograms = 'INSERT INTO Programs (programName, theme) VALUES (?, ?);';

    pool.query(addPrograms, [programName, theme], (err, results) => {
        if (err) {
            console.error('Error adding program:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
      } else {
        // Fetch the newly added program data from the database using the insert ID
        const newProgramID = results.insertId;
        let getNewProgramID = 'SELECT * FROM Programs WHERE programID = ?';
        pool.query(getNewProgramID, [newProgramID], (err, program) => {
          if (err) {
            console.error('Error fetching newly added program:', err);
            res.status(500).json({ error: 'Internal server error: Please try again later.' });
          } else {
            // Send the newly added program data to the client
            res.status(200).json(program[0]);
          }
        });
      }
    });
  });

// DELETE from MusiciansPerformances from double dropdown
app.delete('/deleteMusiciansPerformances', (req, res) => {
    const {musicianName, musicianID, performanceName, date} = req.body;

    let deleteMusiciansPerformances = 'DELETE FROM MusiciansPerformances (musicianID, performanceID) VALUES ((SELECT musicianID FROM Musicians WHERE musicianName = ? AND musicianID = ?), (SELECT performanceID FROM Performances WHERE performanceName = ? AND performanceDate = ?));';

    pool.query(deleteMusiciansPerformances, [musicianName, musicianID, performanceName, date], (err, results) => {
        res.send(JSON.stringify(results));
})});

// UPDATE for MusiciansPerformances
app.post('/updateMusiciansPerformances', (req, res) => {
    const {musicianID, performanceName, date} = req.body;

    let updateMusiciansPerformances = 'INSERT INTO MusiciansPerformances (musicianID, performanceID) VALUES ((SELECT musicianID FROM Musicians WHERE musicianID = ?), (SELECT performanceID FROM Performances WHERE performanceName = ? AND performanceDate = ?));';

    pool.query(updateMusiciansPerformances, [musicianID, performanceName, date], (err, results) => {
        res.send(JSON.stringify(results));
    })});

// UPDATE for SheetMusic, assigning it to a Program
app.put('/updateSheetMusicProgram', (req, res) => {
    const {programID, sheetMusicID} = req.body;

    let updateSheetMusicProgram = 'UPDATE SheetMusic SET programID = ? WHERE sheetMusicID = ?;';

    pool.query(updateSheetMusicProgram, [programID, sheetMusicID], (err, results) => {
        res.send(JSON.stringify(results));
    })});

// UPDATE for Musicians
app.put('/updateMusician/:musicianID', (req, res) => {
    const musicianID = req.params.musicianID;
    const {musicianName, musicianPhone, musicianEmail, instrument} = req.body;

    let updateMusician = 'UPDATE Musicians SET musicianName = ?, musicianPhone = ?, musicianEmail = ?, instrument = ? WHERE musicianID = ?;';

    pool.query(updateMusician, [musicianName, musicianPhone, musicianEmail, instrument, musicianID], (err, results) => {
        res.send(JSON.stringify(results));
    })
});

// DELETE for Musicians
app.delete('/deleteMusician/:id', (req, res) => {
    const musicianID = req.params.id;

    let deleteMusician = 'DELETE FROM Musicians WHERE musicianID = ?;';

    pool.query(deleteMusician, musicianID, (err, results) => {
        res.send(JSON.stringify(results));
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});