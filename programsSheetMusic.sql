-- Create Programs Table, no FK
CREATE TABLE IF NOT EXISTS Programs (
	programID int auto_increment NOT NULL,
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

-- Create intersection table for Programs and SheetMusic
CREATE TABLE IF NOT EXISTS SheetMusicOnPrograms (
	musicProgramID int auto_increment,
    programID int NOT NULL,
    sheetMusicID int NOT NULL,
    PRIMARY KEY (musicProgramID),
    FOREIGN KEY (programID) REFERENCES Programs(programID),
    FOREIGN KEY (sheetMusicID) REFERENCES SheetMusic(sheetMusicID)
    );
    
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