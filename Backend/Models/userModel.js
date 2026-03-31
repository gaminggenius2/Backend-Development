const db = require("../Services/db");

module.exports.createUser = (data, callback) => {
    const sql = `
        INSERT INTO User (username, email, password, points)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [data.username, data.email, data.password,data.points || 0], callback);
};

module.exports.updateUser = (userId, username, points, callback) => {
    const SQL = `UPDATE User
     SET username = ?, points = ? 
     WHERE user_id = ?`;
    db.query(SQL, [username, points, userId], callback);
};

module.exports.getAllUsers = (callback) => {
    const SQL = `SELECT * FROM User
    `; 
    db.query(SQL, callback);
};
module.exports.deleteUser = (userId, callback) =>
{
    const SQL = `DELETE FROM User
    WHERE user_id =?`;
    db.query(SQL, [userId],callback);
}