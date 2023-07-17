-- Group 70: The Wild Thornberry's
-- Jared Norris and Samantha Jarrah

-- Create Programs Table, no FK
CREATE TABLE IF NOT EXISTS Programs (
	programID int auto_increment,
    programName varchar(145),
    theme varchar(145),
    PRIMARY KEY (programID)
    );

-- Create SheetMusic Table, no FK
CREATE TABLE IF NOT EXISTS SheetMusic (
	sheetMusicID int auto_increment NOT NULL,
    sheetMusicName varchar(145) NOT NULL,
    composer varchar(75) NOT NULL,
    arranger varchar(75) DEFAULT NULL,
    genre varchar(45) NOT NULL,
    PRIMARY KEY (sheetMusicID)
    );

-- Create intersection table for Programs and SheetMusic, programID and sheetMusicID both FK
CREATE TABLE IF NOT EXISTS SheetMusicOnPrograms (
	musicProgramID int auto_increment,
    programID int NOT NULL,
    sheetMusicID int NOT NULL,
    PRIMARY KEY (musicProgramID),
    FOREIGN KEY (programID) REFERENCES Programs(programID),
    FOREIGN KEY (sheetMusicID) REFERENCES SheetMusic(sheetMusicID)
    );
-- Create Musicians table, no FK    
CREATE TABLE IF NOT EXISTS Musicians (
musicianID int auto_increment,
musicanName VARCHAR(145) NOT NULL,
musicianPhone VARCHAR(14),
musicianEmail VARCHAR(145),
instrument VARCHAR(145) NOT NULL,
PRIMARY KEY (musicianID)
);

-- Create Venues table, no FK
CREATE TABLE IF NOT EXISTS Venues (
venueID int auto_increment,
venueName VARCHAR(145) NOT NULL,
cityState VARCHAR(145) NOT NULL,
capacity INT,
performanceID INT,
PRIMARY KEY (venueID)
);

-- Create Performances table, venueID and programID both FK
CREATE TABLE IF NOT EXISTS Performances (
performanceID int auto_increment,
performanceName VARCHAR(145) NOT NULL,
venueID int NOT NULL,
performanceDate DATE NOT NULL,
programID int,
musicianID int,
PRIMARY KEY (performanceID),
FOREIGN KEY (venueID) REFERENCES Venues(venueID),
FOREIGN KEY (programID) REFERENCES Programs(programID)
);

-- Create intersection table for MusiciansPerformances, musicianID and performanceID both FK
CREATE TABLE IF NOT EXISTS MusiciansPerformances(
musiciansPerformancesID int auto_increment,
musicianID int NOT NULL,
performanceID int NOT NULL,
PRIMARY KEY (musiciansPerformancesID),
FOREIGN KEY (musicianID) REFERENCES Musicians(musicianID),
FOREIGN KEY (performanceID) REFERENCES Performances(performanceID)
);


-- Insert Musician Rows
INSERT INTO Musicians (musicanName, musicianPhone, musicianEmail, instrument)
VALUES ('Barry Allen', '(679) 834-9081', 'theflash@hotmail.com', 'oboe'),
 ('Tony Stark', '(875) 435-9821', 'ironman@yahoo.com', 'violin'),
 ('Bruce Banner', '(653) 982-7651', 'incrediblehulk@aol.com', 'tuba');

-- Insert Performance Rows
 INSERT INTO Performances (performanceName, venueID, performanceDate, programID)
 VALUES ('Trans Siberia Orchestra', 1, '2023-12-13', 1),
 ('The Nut Cracker', 1, '2023-12-24', 7),
 ("Beethoven's Fifth Symphony", 2 , '2024-1-17', 3);

-- Insert Venue Rows
 INSERT INTO Venues (venueName, cityState, capacity, performanceID)
 VALUES ('The Fimore Auditorium', 'Denver, CO', 637, 1),
 ('The Historic El Rey', 'Albuquerque, NM', 154, 2),
 ('Arlene Scnitzer Hall', 'Portland, OR', 620, 3);
    
-- Insert data into SheetMusic table, only some rows have arrangers
INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre)
	VALUES
		("Spongebob Squarepants-Theme", "Blaise Smith", "Larry Moore", "Pop");
        
INSERT INTO SheetMusic (sheetMusicName, composer, genre)
	VALUES ("O virtus Sapientiae", "Hildegard of Bingen", "Classical");

INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre)
	VALUES
		("Symphony No. 3 in G Minor, Op. 36", "Louise Farrenc", "Chantal Brooke", "Classical");
        
INSERT INTO SheetMusic (sheetMusicName, composer, genre)
	VALUES 
		("Imperial March", "John Williams", "Pop"),
        ("Boulevard of Broken Dreams", "Green Day", "Rock");
        
INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre)
	VALUES
		("Under the Sea", "Alan Menken", "Harry Schnel", "Pop");

INSERT INTO SheetMusic (sheetMusicName, composer, genre)
	VALUES 
		("Fifth Symphony in C Minor", "Ludwig Van Beethoven", "Classical"),
        ("The Nutcracker", "Pyotr Ilyich Tchaikovsky", "Holiday"),
        ("All I Want for Christmas Is You", "Mariah Carey", "Holiday");

INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre)
	VALUES
		("Remember Me", "Germaine Franco", "Germaine Franco", "Pop");
        
-- Insert Program data
  INSERT INTO Programs (programName, theme)
  	VALUES 
      ("Beethoven's Fifth Symphony", "Classical"),
      ("Mischievious Mahler", "Classical"),
      ("Women in Music", "Female"),
      ("Disney Fun", "Pops"),
      ("The Nutcracker", "Holiday"),
      ("Spongebob Fest", "Pops"),
      ("Holiday and Lights", "Holiday"),
      ("Hallelujah!", "Classical"),
      ("ACDC Revival", "Rock"),
      ("Modern Asian-American Composers", "Modern");
    
-- Intersection Table for SheetMusicOnPrograms
	INSERT INTO SheetMusicOnPrograms (programID, sheetMusicID)
		VALUES
			(1, 7),
            (2, 3),
            (3, 2),
            (3, 3),
            (3, 9),
            (3, 10),
            (4, 6),
            (4, 10),
            (5, 8),
            (6, 1),
            (7, 8),
            (7, 9),
            (8, 2),
            (9, 5),
            (10, 9);
            
  -- Insert intersection table data for musicians and performances          
	INSERT INTO MusiciansPerformances (musicianID, performanceID)
		VALUES
			(1, 1),
            (1, 2),
            (1, 3);