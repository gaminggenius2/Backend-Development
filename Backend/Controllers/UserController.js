const userModel = require("../Models/userModel");

module.exports.createuser = (req, res) => { //q1
    const data = req.body;

    // ensure points defaults to 0 when not provided
    if (data.points === undefined || data.points === null) {
        data.points = 0;
    }

    userModel.createUser(data, (err, dbResult) => {
        if (err) {
          console.error("DB ERROR:", err); 
            return res.status(500).json({
                message: err.message
            });
        }

        return res.status(201).json({
            message: "user created successfully.",
            Id: dbResult.insertId,
            username: data.username,
            email: data.email,
             points: data.points
        });
    });
};

module.exports.updateUser = (req, res) => {// update users points and/or username if necessary
    const userId = req.params.id;
    const { username, points } = req.body;

    const updatedPoints =
        points !== undefined ? points : req.user.points;

    userModel.updateUser(userId, username, updatedPoints, err => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        res.status(200).json({
            user_id: Number(userId),
            username,
            points: updatedPoints
        });
    });
};

module.exports.getAllUsers = (req, res) => {//q2
    userModel.getAllUsers((err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        const users = results.map(user => ({
            user_id: user.user_id,  
            username: user.username,
            email: user.email,
            points: user.points === null ? 0 : user.points
        }));

        return res.status(200).json(users);
    });
};


module.exports.deleteuser = (req, res) => {
    const userId = req.params.id;

    userModel.deleteUser(userId, (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Internal Server Error" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });
    });
};
    
