var express = require("express");
const eventsRouter = express.Router();
var db = require("../model/helper");

// -------------------------- GET ROUTES ---------------------------------

//get all events
eventsRouter.get("/", async function (req, res, next) {
    let sql = "SELECT * FROM events ORDER BY eventid";
  
    try {
      let results = await db(sql);
      let events = results.data;
      res.send(events);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// get event by event id - e.g. to access the event details
eventsRouter.get("/:eventid",  async (req, res) => {
    let eventid = req.params.eventid;
    let sql = 
    `SELECT * FROM events WHERE eventId = ${eventid};`
    try {
      let results = await db(sql);
      let event = results.data;
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });


//get event by ticketmasterid - e.g. to check if it's in the db
eventsRouter.get("/ticketmaster/:ticketmasterid",  async (req, res) => {
    let ticketmasterId = req.params.ticketmasterid;
    let sql = 
    `SELECT * FROM events WHERE ticketmasterid = "${ticketmasterId}" AND eventdetail = "yes";`
  
    try {
      let results = await db(sql);
      let event = results.data;
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// get events by user id - e.g. show "my events"
eventsRouter.get("/user/:userid",  async (req, res) => {
    let userId = req.params.userid;
    let sql = 
    `SELECT * FROM events WHERE userId = ${userId};`
  
    try {
      let results = await db(sql);
      let event = results.data;
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

//get all user ids from event by ticketmasterid 
eventsRouter.get("/user/ticketmaster/:ticketmasterid",  async (req, res) => {
    let ticketmasterId = req.params.ticketmasterid;
    let sql = 
    `select userId, eventid from events WHERE ticketmasterid = ${ticketmasterId} ORDER BY userId;`
  
    try {
      let results = await db(sql);
      let event = results.data;
      res.send(event);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });

// -------------------------- POST ROUTES ---------------------------------
// add event for detail
eventsRouter.post("/", async (req, res) => {
    let {
        ticketmasterid, 
        eventname, 
        eventdate, 
        starttime, 
        imageurl, 
        eventlocation, 
        venue , 
        currency, 
        startingprice, 
        ticketurl, 
        genre, 
        subgenre, 
        host, 
        eventtype, 
    } = req.body;
    let sql = `insert into events(userid,ticketmasterid, eventname, eventdate, starttime, imageurl, eventlocation, venue , currency, startingprice, ticketurl, genre, subgenre, host, eventtype, socialmedia, eventdetail) 
    values(1, "${userid}","${ticketmasterid}", "${eventname}", "${eventdate}", "${starttime}", "${imageurl}", "${eventlocation}", "${venue}" , "${currency}", "${startingprice}", "${ticketurl}", "${genre}", "${subgenre}", "${host}", "${eventtype}", "yes") `;
  
    try {
      await db(sql);
      let results = await db(`select * from events WHERE eventdetail = "yes";`);
      res.status(201).send(results);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  });

// add event for user attendance
eventsRouter.post("/user", async (req, res) => {
    let {
        userid,
        ticketmasterid
        
    } = req.body;
    let sql = `insert into events( userid, ticketmasterid, eventdetail) 
    values("${userid}","${ticketmasterid}", "no") `;
  
    try {
      await db(sql);
      let results = await db(`select userId from events WHERE ticketmasterid = "${ticketmasterid}";`);
      res.status(201).send(results);
    } catch (err) {
      res.status(500).send({ err: err.message });
    }
  });

// -------------------------- DELETE ROUTES ---------------------------------
// delete event by eventid
eventsRouter.delete("/:eventid", async (req, res) => {
    let eventId = req.params.eventid;
  let sql = `
      DELETE FROM events
      WHERE eventid = ${eventId}
     `;
  try {
    await db(sql);
    let result = await db(`select userId, eventid from events ORDER BY userId;`);
    res.status(201).send(result.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = eventsRouter;