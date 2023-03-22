var express = require("express");
var router = express.Router();
var db = require("../model/helper");
const { ensureSameUser } = require("../middleware/guards");

// Had to change from :id to /user/:id to stop conflicting with other routes
router.get("/user/:id", async (req, res) => {
  let sql = `select * from users where userId = ${id}`;

  let results = await db(sql);
  try {
    let results = await db(sql);
    let users = results.data;
    // We know user exists because he/she is logged in!
    let user = results.data[0];
    delete user.password; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/", async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.password); // don't return passwords
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Will eventually get all users matched on an event
router.get("/matched", async function (req, res, next) {
  let sql = "SELECT * FROM users";

  try {
    let results = await db(sql);
    let users = results.data;
    if (users.length === 0) {
      res.status(404).send({ error: "No users found" });
    } else {
      users.forEach((u) => delete u.password); // don't return passwords
      res.send(users);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.get("/:id", ensureSameUser, async (req, res) => {
  let userId = req.params.id;
  let sql = `select * from users where userId = ${userId}`;

  try {
    let results = await db(sql);
    // We know user exists because he/she is logged in!
    let user = results.data[0];
    delete user.password; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Add a new user
router.post("/", async (req, res) => {
  let {
    username,
    email,
    age,
    gender,
    location,
    occupation,
    languages,
    interests,
    about,
    avatarURL,
  } = req.body;
  let sql = `insert into users(username, email,age, gender, location, occupation, languages, interests, about, avatarURL) values("${username}","${email}", ${age}, "${gender}", "${location}", "${occupation}", "${languages}", "${interests}"," ${about}", "${avatarURL}") `;

  try {
    await db(sql);
    let results = await db(`select * from users`);
    res.status(201).send(results);
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

// For secondary registration page
router.put("/:id", async (req, res) => {
  let userId = req.params.id;
  let sql = `SELECT * FROM users WHERE userId = ${userId}`;

  try {
    let results = await db(sql);

    if (results.data.length === 0) {
      res.status(404).send({ error: "User not found" });
    } else {
      let {
        age,
        gender,
        location,
        occupation,
        languages,
        interests,
        about,
        avatarURL,
      } = req.body;

      let sql = `
        UPDATE users
        SET
        age = "${age}",
        gender = "${gender}",
        location = "${location}",
        occupation = "${occupation}",
        languages = "${languages}",
        interests = "${interests}",
        about = "${about}",
        avatarURL = "${avatarURL}"
        WHERE userId = "${userId}"
      `;
      await db(sql);
      let results = await db(`SELECT * FROM users WHERE userId = ${userId}`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
