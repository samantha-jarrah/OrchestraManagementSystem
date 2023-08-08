-- Group 70: Jared Norris and Samantha Jarrah
-- Orchestra Management Database

-- Citation for Insert Statements
-- Date: 07/18/23
-- Syntax for writing insert query using variables from html form
-- Source URL: https://canvas.oregonstate.edu/courses/1922991/assignments/9287073?module_item_id=23329629 

-- Add a Musician. : character denotes variables that will have input from html form
INSERT INTO Musicians (musicanName, musicianPhone, musicianEmail, instrument)
	VALUES (:nameInput, :phoneInput, :emailInput, :instrumentInput);

-- Add a Venue. : character denotes variables that will have input from html form
INSERT INTO Venues (venueName, cityState, capacity)
	VALUES (:venueName, :cityState, :capacity);

-- Add a Performance. : character denotes variables that will have input from html form
INSERT INTO Performances (performanceName, performanceDate, programID, venueID)
	VALUES(:nameinput, :dateInput, :programIDFromDropdownInput, :venueIDFromDropdownInput);

-- Add a Program. : character denotes variables that will have input from html form
INSERT INTO Programs (programName, theme)
	VALUES (:programName, :theme);

-- Add a piece of SheetMusic. : character denotes variables that will have input from html form
INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre)
	VALUES (:nameInput, :composerInput, :arrangerInput, :genreInput);

    
-- Add a row to MusiciansPerformances. : character denotes variables that will have input from html form
-- INSERT INTO MusiciansPerformances (musicianID, performanceID)
-- 	VALUES (:musicianIDFromInput, :performanceIDFromDropdownInput);

-- Add a row to MusiciansPerformances when inserting new musician. : character denotes variables that will have input from html form
INSERT INTO MusiciansPerformances (musicianID, performanceID)
	VALUES (
    (SELECT musicianID FROM Musicians WHERE :musicianEmailFromInputForm = Musicians.musicianEmail),
    (SELECT performanceID FROM Performances WHERE :performanceNameFromInputForm = Performances.performanceName AND :performanceDateFromInputForm = Performances.performanceDate));
    
-- Add a row to MusiciansPerformances when updating musician. : character denotes variables that will have input from html form
INSERT INTO MusiciansPerformances (musicianID, performanceID)
	VALUES (
    (SELECT musicianID FROM Musicians WHERE :musicianIDFromInputForm = Musicians.musicianID),
    (SELECT performanceID FROM Performances WHERE :performanceNameFromInputForm = Performances.performanceName AND :performanceDateFromInputForm = Performances.performanceDate));

-- Add a row to SheetMusicOnPrograms. : character denotes variables that will have input from html form
INSERT INTO SheetMusicOnPrograms (programID, sheetMusicID)
	VALUES (:programIDFromDropdownInput, :sheetMusicIDFromDropdownInput);
    
-- Update Musicians based on information from update musicians form
UPDATE Musicians
	SET musicianName = :nameInput, musicianPhone = :phoneInput, musicianEmail = :emailInput, musicianInstrument = :instrumentInput
    WHERE musicianID = :musicianIDFromForm;

-- Update Venues based on information from update venues form
UPDATE Venues
	SET venueName = :venueName, cityState = :cityState, capacity = :capacity
    WHERE venueID = :venueIDFromForm;

-- Update Performances based on information from update performances form
UPDATE Performances
	SET performanceName = :nameinput, performanceDate = :dateInput, programID = :programIDFromDropdownInput, venueID = :venueIDFromDropdownInput
    WHERE performanceID = :performanceIDFromForm;

-- Update Programs based on information from update Programs form
UPDATE Programs
	SET programName = :programName, theme = :theme
    WHERE programID = :programIDFromForm;
    
-- Update piece of SheetMusic to have a program
UPDATE SheetMusic
	SET programID = :programIDfromDropdown
    WHERE sheetMusicID = :sheetMusicIDfromDropdown;

-- Update SheetMusic row based on information from update SheetMusic form
UPDATE SheetMusic
	SET sheetMusicName = :nameInput, composer = :composerInput, arranger = :arrangerInput, genre = :genreInput
    WHERE sheetMusicID = sheetMusicIDFromForm;

-- Update SheetMusicOnPrograms based on information from update SheetMusicOnPrograms form
UPDATE SheetMusicOnPrograms
	SET programID = :programIDFromDropdownInput, sheetMusicID = :sheetMusicIDFromDropdownInput
    WHERE musicianProgramID = musicianProgramIDFromForm;

-- Update MusiciansPerformances based on information from update MusiciansPerformances form
UPDATE MusiciansPerformances
	SET musicianID = :musicianIDFromDropdownInput, performanceID = :performanceIDFromDropdownInput
    WHERE musiciansPerformancesID = musiciansPerformancesIDFromForm;
    
-- Delete a Musician
DELETE FROM Musicians
	WHERE musicianID = :musicianIDSelected;
    
-- Delete a Performance
DELETE FROM Performances
	WHERE performanceID = :performanceIDSelected;

-- Delete a Program
DELETE FROM Programs
	WHERE programID = :programIDSelected;

-- Delete a Venue
DELETE FROM Venues
	WHERE venueID = :venueIDSelected;
    
-- Delete piece of SheetMusic
DELETE FROM SheetMusic
	WHERE sheetMusicID = :sheetMusicIDSelected;

-- Delete row in SheetMusicOnPrograms
DELETE FROM SheetMusicOnPrograms
	WHERE sheetMusicID = :sheetMusicIDFromDropdown AND programID = :programIDFromDropdown;
    
-- Delete row in MusiciansPerformances
DELETE FROM MusiciansPerformances
	WHERE musicianID = :musicianIDFromDropdown AND performanceID = :performanceIDFromDropdown;
    
-- Select for Venues Table
SELECT venueID AS ID, venueName AS Name, cityState AS "City, State", capacity AS Capacity
	FROM Venues;
    
-- Select for Musicians Table
SELECT musicianID AS ID, musicianName AS Name, musicianPhone AS "Phone Number", musicianEmail AS Email, instrument AS Instrument
	FROM Musicians;
    
-- Select for Programs Table
SELECT programID AS ID, programName AS Name, theme AS Theme
	FROM Programs;
    
-- Select for SheetMusic Table, programID FK gets displayed as programName
SELECT sheetMusicID AS ID, sheetMusicName AS Name, composer AS Composer, arranger AS Arranger, genre AS Genre, Programs.programName AS "Program Name"
	FROM SheetMusic
    LEFT JOIN Programs ON SheetMusic.programID = Programs.programID;
    
-- Select for Performances Table, programID FK gets shown as programName, venueID FK gets shown as venueName
SELECT Performances.performanceID AS ID, Performances.performanceName as "Performance Name", Performances.performanceDate AS Date, Programs.programName AS "Program Name", Venues.venueName AS "Venue Name"
	FROM Performances
    JOIN Programs ON Performances.programID = Programs.programID
    JOIN Venues ON Performances.venueID = Venues.venueID;
    
-- Select for MusiciansPerformances
SELECT musiciansPerformancesID AS ID, Musicians.musicianName AS "Musician Name", Performances.performanceName AS "Performance Name"
	FROM MusiciansPerformances
    JOIN Musicians ON MusiciansPerformances.musicianID = Musicians.musicianID
    JOIN Performances ON MusiciansPerformances.performanceID = Performances.performanceID;
    
-- Drop down Selects
-- programName Select
SELECT programName
	FROM Programs;
    
-- performanceName, performanceDate Dropdown
SELECT performanceName, performanceDate
	FROM Performances;

-- sheetMusicName Select
SELECT sheetMusicName
	FROM SheetMusic;
    
-- venueID, venueName, cityState Select
SELECT venueID, venueName, cityState
	FROM Venues;
    
-- musicianName Select
SELECT musicianName
	FROM Musicians;