const pool = require("../Services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS user_Planets;
DROP TABLE IF EXISTS UserBadge;
DROP TABLE IF EXISTS Badge;
DROP TABLE IF EXISTS UserCompletion;
DROP TABLE IF EXISTS WellnessChallenge;
DROP TABLE IF EXISTS Planets;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  points INT DEFAULT 0
);
`

pool.query(SQLSTATEMENT, (error, results) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
