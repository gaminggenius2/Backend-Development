const reviewModel =require("../Models/reviewModel")

module.exports.createreview = (req, res) => {
    const { user_id, challenge_id, rating, comment } = req.body;

    if (!user_id || !challenge_id || !rating) {
        return res.status(400).json({
            message: "user_id, challenge_id and rating are required"
        });
    }

    const data = { user_id, challenge_id, rating, comment };

    reviewModel.createreview(data, (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: err.message });
        }

        return res.status(201).json({
            message: "Review created successfully",
            review_id: results.insertId,
            ...data
        });
    });
};
module.exports.deletereview = (req, res) => {
    const reviewId = req.params.review_id;

    if (!reviewId) {
        return res.status(400).json({
            message: "Review ID is required"
        });
    }

    reviewModel.deletereview(reviewId, (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "Review not found"
            });
        }

        return res.status(200).json({
            message: "Review deleted successfully"
        });
    });
};