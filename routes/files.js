var express = require("express");
var router = express.Router();
const path = require("path");
const db = require("../model/helper");
const fs = require("fs/promises");
const multer = require("multer");

const PUBLIC_DIR_URL = "http://localhost:5002/clientfiles";

async function sendAllFiles(res) {
  try {
    let results = await db("SELECT * FROM files");
    // Add 'url' property for each file
    let withUrls = results.data.map((r) => ({
      ...r,
      url: `${PUBLIC_DIR_URL}/${r.filename}`,
    }));
    res.send(withUrls);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

/**
 * Multer initialization
 **/

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/clientfiles"); // store files here
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // keep original filename
  },
});
const upload = multer({ storage });

/* POST a file */
router.post("/", upload.single("clientfile"), async function (req, res) {
  let { originalname } = req.file;

  try {
    let sql = `
      INSERT INTO files(filename)
      VALUES ('${originalname}')
    `;
    await db(sql);
    // Send array of all files as response
    res.status(201);
    sendAllFiles(res);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
