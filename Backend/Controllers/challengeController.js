const challengeModel = require("../Models/challengeModel");
module.exports.createchallenge = (req, res) => {
    const { challenge_name, points } = req.body;

    const data = {
        challenge_name,
        points
    };

    challengeModel.createchallenge(data, (err, dbResult) => {

        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({
                message: err.message
            });
        }

        return res.status(201).json({
            message: "challenge created successfully.",
            challenge_id: dbResult.insertId,
            challenge_name: data.challenge_name,
            points: data.points
        });

    });
};

module.exports.editchallenge = (req, res) => {
    const challengeId = req.params.challenge_id;
    const { challenge_name, points } = req.body;

    if (!challengeId) {
        return res.status(400).json({ message: "Challenge ID is required" });
    }

    challengeModel.editchallenge(
        challengeId,
        challenge_name,
        points,
        (err, results) => {

            if (err) {
                return res.status(500).json({ message: err.message });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Challenge not found"
                });
            }

            return res.status(200).json({
                message: "Challenge updated successfully",
                challenge_name,
                points
            });
        }
    );
};


// Get all challenges
module.exports.getallchallenges = (req, res) => {
    challengeModel.getallchallenges((err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: err.message });
        }

        return res.status(200).json({
            message: "Challenges retrieved successfully",
            count: results.length,
            challenges: results
        });
    });
};

// Delete a challenge by ID
module.exports.deletechallenge = (req, res) => {
    const challengeId = req.params.challenge_id;

    if (!challengeId) {
        return res.status(400).json({ message: "Challenge ID is required" });
    }

    challengeModel.deletechallenge(challengeId, (err, results) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ message: err.message });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Challenge not found" });
        }

        return res.status(200).json({
            message: "Challenge deleted successfully"
        });
    });
};
