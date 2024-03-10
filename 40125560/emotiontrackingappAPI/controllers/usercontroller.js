const conn = require("./../util/dbconn");
const util = require("util");
const userController = require("../controllers/usercontroller");
const bcrypt = require("bcrypt");

// Handle POST requests to /login
exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  // Query the database to check if the user exists
  // Server-side validation 
  const loginSQL = "SELECT * FROM users WHERE email_address=?";
  conn.query(loginSQL, [email], (err, rows) => {
    if (err) {
      // If an error occurs, send a failure response with error message
      res.status(500);
      res.json({
        status: "failure",
        message: err,
      });
    } else {
      console.log(`Length = ${rows.length}`);
      if (rows.length > 0) {
        // If user exists, send success response with user details
        res.status(200);
        res.json({
          status: "success",
          message: `${rows.length} records retrieved`,
          result: rows,
        });
      } else {
        // If user does not exist, send unauthorized response
        res.status(401);
        res.json({
          status: "failure",
          message: `Invalid user credentials`,
        });
      }
    }
  });
};

// Route to handle user registration (POST method)
exports.postRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, hashedPassword } = req.body;
    const vals = [firstName, lastName, email, hashedPassword];

    // Insert the new user if the email is not in use
    const insertSQL = `INSERT INTO users (first_name, last_name, email_address, user_password) VALUES (?, ?, ?, ?)`;

    // Wrap the database query in a promise
    const insertPromise = new Promise((resolve, reject) => {
      conn.query(insertSQL, vals, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    // Wait for the promise to resolve and execute the database query
    const rows = await insertPromise;

    // Send success response with inserted user details
    res.status(200).json({
      status: "success",
      message: `Record ID ${rows.insertId} added`,
      result: rows,
    });
  } catch (error) {
    // If an error occurs during registration, send failure response
    res.status(500).json({
      status: "failure",
      message: error,
    });
  }
};

