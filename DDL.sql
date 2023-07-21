-- Group 70: The Wild Thornberry's
-- Jared Norris and Samantha Jarrah

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

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
    FOREIGN KEY (programID) REFERENCES Programs(programID) ON DELETE CASCADE,
    FOREIGN KEY (sheetMusicID) REFERENCES SheetMusic(sheetMusicID) ON DELETE CASCADE
    );
    
-- Create Musicians table, no FK    
CREATE TABLE IF NOT EXISTS Musicians (
musicianID int auto_increment,
musicianName VARCHAR(145) NOT NULL,
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
FOREIGN KEY (venueID) REFERENCES Venues(venueID) ON DELETE CASCADE,
FOREIGN KEY (programID) REFERENCES Programs(programID) ON DELETE SET NULL
);

-- Create intersection table for MusiciansPerformances, musicianID and performanceID both FK
CREATE TABLE IF NOT EXISTS MusiciansPerformances(
musiciansPerformancesID int auto_increment,
musicianID int NOT NULL,
performanceID int NOT NULL,
PRIMARY KEY (musiciansPerformancesID),
FOREIGN KEY (musicianID) REFERENCES Musicians(musicianID) ON DELETE CASCADE,
FOREIGN KEY (performanceID) REFERENCES Performances(performanceID) ON DELETE CASCADE
);


-- Insert Musician Rows
INSERT INTO Musicians (musicianName, musicianPhone, musicianEmail, instrument)
	VALUES 
	('Bruce Wayne', '(405) 971-9543', 'batman@gmail.com', 'saxophone'),
	('Barry Allen', '(679) 834-9081', 'theflash@hotmail.com', 'oboe'),
	('Tony Stark', '(875) 435-9821', 'ironman@yahoo.com', 'violin'),
	('Bruce Banner', '(653) 982-7651', 'incrediblehulk@aol.com', 'tuba'),
    ('Jennifer Walters', '(307) 896-5321', 'shehulk@ymail.com', 'flute'),
    ('Wanda Maximoff', '(405) 340-1257', 'scarletwitch@gmail.com', 'piccolo'),
    ('Carol Danvers', '(871) 964-3867', 'captainmarvel@yahoo.com', 'harp'),
    ('Selena Kyle', '(523) 851-9012', 'catwoman@ymail.com', 'trumpet'),
    ('Oswald Cobblepot','(674) 321-8743', 'thepenguin@aol.com', 'trombone'),
    ('Arthur Fleck', '(321) 684-0124', 'thejoker@gmail.com', 'bass');

-- Insert Performance Rows
 INSERT INTO Performances (performanceName, venueID, performanceDate, programID)
 VALUES ('Trans Siberia Orchestra', 1, '2023-12-13', NULL),
 ('The Nut Cracker', 1, '2023-12-24', 5),
 ("Beethoven's Fifth Symphony", 2 , '2024-1-17', 1),
 ("Beethoven's Fifth Symphony", 6 , '2024-1-18', 1),
 ('Fantastic Women!', 4, '2024-3-2', 3),
 ("Mahler's First Symphony", 3, '2024-4-18', 2),
 ('Summer Pops Concert', 5, '2024-6-21', 6),
 ('Fun for the Family', 8, '2024-6-28', 6),
 ('An Orchestral Rendition of Nirvana', 7, '2024-6-17', NULL),
 ('Hallelujah! feat. The Mormon Tabernacle Choir', 10, '2024-12-20', 8);

-- Insert Venue Rows
 INSERT INTO Venues (venueName, cityState, capacity)
 VALUES ('The Fimore Auditorium', 'Denver, CO', 637),
 ('The Historic El Rey', 'Albuquerque, NM', 154),
 ('Arlene Scnitzer Hall', 'Portland, OR', 620),
 ('Majestic Theater', 'Dallas, TX', 620),
 ('Terry Concert Hall', 'Jacksonville, FL', 1100),
 ('Tabernacle', 'Atlanta, GA', 1221),
 ('The Howard Theater', 'Washington DC', 823),
 ('Carnegie Hall', 'New York, NY', 780),
 ('Fremont Abbey Arts Center', 'Seattle, WA', 450),
 ('Temple Square', 'Salt Lake City, UT', 1666);
    
-- Insert data into SheetMusic table
INSERT INTO SheetMusic (sheetMusicName, composer, arranger, genre)
	VALUES
		("Spongebob Squarepants-Theme", "Blaise Smith", "Larry Moore", "Pop"),
        ("O virtus Sapientiae", "Hildegard of Bingen", NULL, "Classical"),
        ("Symphony No. 3 in G Minor, Op. 36", "Louise Farrenc", "Chantal Brooke", "Classical"),
        ("Imperial March", "John Williams", NULL, "Pop"),
        ("Boulevard of Broken Dreams", "Green Day", NULL, "Rock"),
        ("Under the Sea", "Alan Menken", "Harry Schnel", "Pop"),
        ("Fifth Symphony in C Minor", "Ludwig Van Beethoven", NULL, "Classical"),
        ("The Nutcracker", "Pyotr Ilyich Tchaikovsky", NULL, "Holiday"),
        ("All I Want for Christmas Is You", "Mariah Carey", NULL, "Holiday"),
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
            (1, 3),
            (1, 4),
            (2, 10),
            (2, 8),
            (2, 7),
            (2, 6),
            (4, 9),
            (4, 10),
            (4, 4),
            (6, 2),
            (6, 4),
            (6, 7),
            (7, 8),
            (7, 10),
            (7, 1),
            (8, 9),
            (8, 6),
            (8, 3),
            (9, 1),
            (9, 9),
            (9, 4),
            (10, 10),
            (10, 3),
            (10, 6);

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;