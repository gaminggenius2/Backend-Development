const pool = require("../Services/db");

const SQLSTATEMENT = `
DROP TABLE IF EXISTS user_Planets;
DROP TABLE IF EXISTS UserBadge;
DROP TABLE IF EXISTS Badge;
DROP TABLE IF EXISTS UserCompletion;
DROP TABLE IF EXISTS Challenge;
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

INSERT INTO User (username, email, password, points) VALUES
('gamer', '123@email.com', '123a', 0),
('fqfwfwfsf', 'qwerty@email.com', 'wowww', 10);

CREATE TABLE Challenge (
  challenge_id INT AUTO_INCREMENT PRIMARY KEY,
  challenge_name VARCHAR(255) NOT NULL,
  points INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  description TEXT
);

INSERT INTO Challenge (challenge_name, points, description) VALUES
('Daily Step Goal', 10, 'Walk at least 10,000 steps in a day.'),
('Zero-Waste Week', 50, 'Produce no single-use plastic waste for one week.'),
('Read a Book', 20, 'Finish reading a book on personal development.');

CREATE TABLE Reviews (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  challenge_id INT NOT NULL,
  rating INT,
  comment TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO REVIEWS (user_id, challenge_id,rating,comment) VALUES
(2,3,2,'not that fun'),
(3,1,5,'amazing'),
(1,2,4,'wow');

`



pool.query(SQLSTATEMENT, (error, results) => {
  if (error) {
    console.error("Error creating tables:", error);
  } else {
    console.log("Tables created successfully");
  }
  process.exit();
});
