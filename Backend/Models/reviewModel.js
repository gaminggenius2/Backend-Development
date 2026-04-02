const db = require("../Services/db")

// create review
module.exports.createreview = (data, callback) => {
    const SQL = `
        INSERT INTO Reviews (user_id, challenge_id, rating, comment)
        VALUES (?, ?, ?, ?)
    `;
    const VALUES = [data.user_id, data.challenge_id, data.rating, data.comment];

    db.query(SQL, VALUES, callback);
};

// delete review
module.exports.deletereview = (reviewId, callback) => {
    const SQL = `DELETE FROM Reviews WHERE review_id = ?`;
    db.query(SQL, [reviewId], callback);
};