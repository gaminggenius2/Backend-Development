const db = require("../Services/db");

module.exports.createchallenge = (data, callback) => {
    const sql = `
        INSERT INTO Challenge (challenge_name, points)
        VALUES (?, ?)
    `;
    db.query(sql, [
        data.challenge_name,
        data.points
    ], callback);
};

module.exports.editchallenge = (challengeId, challenge_name, points, callback) => {
    const sql = `
        UPDATE Challenge
        SET challenge_name = ?, points = ?
        WHERE challenge_id = ?
    `;
    db.query(sql, [challenge_name, points, challengeId], callback);
};

module.exports.getallchallenges = (callback) => {
   const sql = `SELECT * FROM Challenge`;
   db.query(sql, callback);
};
module.exports.deletechallenge = (challengeId, callback) =>
{
    const SQL = `DELETE FROM Challenge
    WHERE challenge_id =?`;
    db.query(SQL, [challengeId],callback);
}