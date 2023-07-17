CREATE TABLE IF NOT EXISTS Musicians(
musicianID int auto_increment,
musicanName VARCHAR(145) NOT NULL,
musicianPhone VARCHAR(14),
musicianEmail VARCHAR(145),
instrument VARCHAR(145) NOT NuLL,
PRIMARY KEY (musicianID)
);


CREATE OR REPLACE TABLE Performances(
performanceID int auto_increment,
performanceName VARCHAR(145) NOT NULL,
venueID int NOT NULL,
performanceDate DATE NOT NULL,
programID int,
musicianID int,
PRIMARY KEY (performanceID),
FOREIGN KEY (venueID) REFERENCES Venues(venueID)
);

CREATE OR REPLACE TABLE Venues(
venueID int auto_increment,
venueName VARCHAR(145) NOT NULL,
cityState VARCHAR(145) NOT NULL,
capacity INT,
performanceID INT,
PRIMARY KEY (venueID)
);

CREATE OR REPLACE TABLE MusiciansPerformances(
musiciansPerformancesID int auto_increment,
musicianID int NOT NULL,
performanceID int NOT NULL,
PRIMARY KEY (musiciansPerformancesID),
FOREIGN KEY (musicianID) REFERENCES Musicians(musicianID),
FOREIGN KEY (performanceID) REFERENCES Performances(performanceID)
);




INSERT INTO Musicians (musicianID, musicanName, musicianPhone, musicianEmail, instrument)
VALUES (2, 'Barry Allen', '(679) 834-9081', 'theflash@hotmail.com', 'oboe'),
 (3, 'Tony Stark', '(875) 435-9821', 'ironman@yahoo.com', 'violin'),
 (4, 'Bruce Banner', '(653) 982-7651', 'incrediblehulk@aol.com', 'tuba');
 
 INSERT INTO Performances (performanceID, performanceName, venueID, performanceDate, programID, musicianID)
 VALUES (1, 'Trans Siberia Orchestra', 1, '2023-12-13', 1, 2),
 (2, 'The Nut Cracker', 1, '2023-12-24', 7, 5),
 (3, "Beethoven's Fifth Symphony", 2 , '2024-1-17', 3, 1);
 
 INSERT INTO Venues (venueID, venueName, cityState, capacity, performanceID)
 VALUES (1, 'The Fimore Auditorium', 'Denver, CO', 637, 1),
 (2, 'The Historic El Rey', 'Albuquerque, NM', 154, 2),
 (3, 'Arlene Scnitzer Hall', 'Portland, OR', 620, 3);
 
 SHOW TABLES;
 
 DESCRIBE Venues;
 
 SELECT * FROM Musicians;
 
 
 
 
