const db = require("../config/db");

exports.createUser = (username, email, password) => {
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  return db.query(sql, [username, email, password]);
};