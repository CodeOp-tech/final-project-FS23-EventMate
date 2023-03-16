var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt"); // this is for hashes..bcrypt is a password-hashing function
const jwt = require("jsonwebtoken"); //json web token :  https://jwt.io/
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const db = require("../model/helper");

// router.post("/register", async (req, res) => {
//   let { username, password, email } = req.body;
//   let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

//   try {
//     let sql = `SELECT * FROM users WHERE username = "${username}"`;
//     let results = await db(sql, [username]);

//     if (results.data.length === 1) {
//       res.status(400).send({ message: `username already exists` });
//     } else {
//       sql = `
//             INSERT INTO users (username, password, email)
//             VALUES ("${username}", "${hashedPassword}", "${email}")
//         `;
//       await db(sql, [username, hashedPassword, email]);

//       res.send({ message: `registration succeeded!` });
//     }
//   } catch (err) {
//     res.status(500).send({ err: err.message });
//   }
// });

router.post("/register", async (req, res) => {
  let { username, password, email } = req.body;
  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  try {
    let sql = `select * from users where username = "${username}"`;
    let results = await db(sql);

    if (results.data.length === 1) {
      res.status(400).send({ message: `username already exists` });
    } else {
      let sql = `
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
      await db(sql);

      res.send({ message: `registration succeeded!` });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  try {
    let sql = `SELECT * FROM users WHERE username = '${username}'`;

    let results = await db(sql);

    if (results.data.length === 0) {
      res.status(401).send({ Error: `Login Failed` });
    } else {
      let user = results.data[0];

      let passwordsEqual = await bcrypt.compare(password, user.password);

      if (passwordsEqual) {
        let payload = { userId: user.userId };

        let token = jwt.sign(payload, SECRET_KEY);
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        res.status(401).send({ Error: `Login Failed` });
      }
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
