const conn = require("./../util/dbconn");
const snapshotController = require("../controllers/snapshotcontroller");

// Function to handle POST requests for recording a snapshot
exports.postRecordSnapshot = (req, res) => {

  const vals = req.body;
  console.log(vals);

  // SQL query to insert snapshot data into the database
  const insertSQL =
    `INSERT INTO emotions (user_id, enjoyment, sadness, anger, contempt, disgust, fear, surprise, triggers, date, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // Execute the SQL query
  conn.query(insertSQL, vals, (err, rows) => {
    if (err) { // If an error occurs, send a failure response with error message
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else { // If successful, send a success response with the inserted record details
      res.status(200);
      res.json({
        status: "success",
        message: `Record ID ${rows.insertId} added`,
        result: rows,
      });
    }
  });
};

// Function to handle GET requests for fetching snapshot history
exports.getSnapshotHistory = (req, res) => {

  const userid = req.query.userid;
  const selectSQL = `SELECT * FROM emotions WHERE user_id = ? ORDER BY date DESC, time DESC`;

  conn.query(selectSQL, userid, (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else {
      res.status(200);
      res.json({
        status: "success",
        message: `${rows.length} records returned`,
        result: rows,
      });
    }
  });
};

// Function to handle GET requests for fetching snapshot trends
exports.getTrends = (req, res) => {

  const userid = req.query.userid;
  const selectSQL = `SELECT * FROM emotions WHERE user_id = ? ORDER BY date ASC, time ASC`;

  conn.query(selectSQL, userid, (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else {
      res.status(200);
      res.json({
        status: "success",
        message: `${rows.length} records returned`,
        result: rows,
      });
    }
  });
};

// Function to handle GET requests for viewing a specific snapshot
exports.getViewSnapshot = (req, res) => {

  const { id } = req.params;
  const selectSQL = `SELECT * FROM emotions WHERE emotion_id = ?`;

  conn.query(selectSQL, id, (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else {
      if (rows.length > 0) {
        res.status(200);
        res.json({
          status: "success",
          message: `Record ID ${id} retrieved`,
          result: rows,
        });

      } else {
        res.status(404);
        res.json({
          status: "failure",
          message: `Invalid ID ${id}`
        })
      }
    }
  });
};

// Function to handle POST requests for updating a snapshot
exports.postUpdateSnapshot = (req, res) => {

  const { id } = req.params;
  const vals = req.body;

  const updateSQL = `UPDATE emotions SET triggers = ? WHERE emotion_id = ?`;

  conn.query(updateSQL, [vals, id], (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else {
      // If successful, check if any rows were affected by the update operation
      if(rows.affectedRows > 0) {
        // If rows were affected, send a success response indicating the update
        res.status(200);
        res.json({
          status: "success",
          message: `Record ID ${id} updated`
        });
      } else {
        // If no rows were affected, send a failure response indicating an invalid ID
        res.status(404);
        res.json({
          status: "failure",
          message: `Invalid ID ${id}`
        });
      }
    }
  });
};

// Function to handle DELETE requests for deleting a snapshot
exports.deleteSnapshot = (req, res) => {

  const { id } = req.params;
  const deleteSQL = `DELETE FROM emotions WHERE emotion_id = ?`;

  conn.query(deleteSQL, id, (err, rows) => {
    if (err) {
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else {
      // If successful, check if any rows were affected by the delete operation
      if(rows.affectedRows > 0) {
        // If rows were affected, send a success response indicating the deletion
        res.status(200);
        res.json({
          status: "success",
          message: `Record ID ${id} deleted`
        });
      } else {
        // If no rows were affected, send a failure response indicating an invalid ID
        res.status(404);
        res.json({
          status: "failure",
          message: `Invalid ID ${id}`
        });
      }
    }
  });
};

module.exports = snapshotController;
