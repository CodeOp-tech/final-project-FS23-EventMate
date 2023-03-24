import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import noRepeatEvents from "../helpers/Utils/noRepeatEvents.js";
import { GetByLocTM } from "../helpers/EventsApi/GetByLocTM.jsx";
import takeEventDetails from "../helpers/Utils/takeEventDetails.js";
import Local from "../helpers/Local.js";
import addEventsToDB from "../helpers/Utils/addEventsToDB.js";
import MyEventIDs from "../helpers/Utils/MyEventIDs.js";

//we can use geolocation or user's DB location - see "getEvents" function below

// Currently limiting it to display only 4 events with a "see more" down the bottom,
// but it can display up to 20. See More should eventually lead to the events search page

function EventsCards() {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false);
  const [myEventsids, setMyEventsids] = useState([])
  const userInfo = Local.getUser();

  useEffect(() => {
    getEvents();
  }, []);

  async function inMyEvents(userID, eventsObjects){
    let myEvents= await MyEventIDs(userID);
    setMyEventsids(myEvents);
      return eventsObjects.map(o => 
        myEvents.includes(o.id)
          ? o.showAdd = false
          : o.showAdd = true
         )
         
  }



  async function getEvents() {
    console.log("getting events for event cards....");
    let apiData = await GetByLocTM(userInfo.location);
    console.log("Events near me fetch result :", apiData);
   
    let newResults = await apiData.map((result) => {
      let eventdetails = takeEventDetails(
        result,
        userInfo.location,
        userInfo.userId
      );
      return eventdetails;
    });
    let myEvents = await inMyEvents(userInfo.userId, newResults);
  
    if (newResults.length > 8) {
      let resultsCopy = [...newResults];
      let limitedResults = resultsCopy.splice(0, 6);
      setEvents(limitedResults);
    } else {
      await setEvents(newResults);
    }
    console.log("newResults for events near me: ", newResults);
    setLoading(false);
    setShowList(true);
  }



  async function handleAddToMyEventsBtn(eventId, eventObject){
    console.log("handle events, id, object, userid", eventId, eventObject, userInfo.userId)
    let result = await addEventsToDB(eventId, eventObject, userInfo.userId)
    console.log("handle add events", result)
    if (result){

      setShowList(true);
      getEvents(userInfo.location);

    }
  }





  return (
    <div className="event-cards">
      {loading && (
        <div>
          <CircularProgress />
        </div>
      )}

      {showList && (
        <div>
          {events.map((r) => {
            return (
              <List
                key={r.id}
                sx={{
                  width: "100%",
                  maxWidth: "70vw",
                  bgcolor: "background.paper",
                }}
              >
                <ListItem
                  dense={true}
                  alignitems="flex-start"
                  style={{ maxHeight: "60px" }}
                >
                  <ListItemAvatar
                    sx={{ paddingRight: "10px" }}
                    alignitems="center"
                  >
                    <img
                      alt="event"
                      src={r.image}
                      style={{ width: "100px", maxHeight: "50px" }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={r.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {r.date}, {r.time}
                        </Typography>
                        {`  ${r.venue}`}
                      </React.Fragment>
                    }
                  />
                   {r.showAdd &&
                <Button 
                size="small" 
                variant="contained" 
                color= "secondary"
                fontSize="small" 
                onClick={e => handleAddToMyEventsBtn(r.id, r)}
                >+ My Events</Button>
                  }
                
                  {!r.showAdd &&
                <Button 
                size="small" 
                variant="text" 
                fontSize="small" 
                disabled
                >going</Button>
                  }
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            );
          })}
        </div>
      )}

      {/* Takes user to search events with default current location.
        We can change this for a modal later if preferred */}
      <Link to="/searchevents" style={{ textDecoration: "none" }}>
        <Button variant="text">See More...</Button>
      </Link>
    </div>
  );
}

export default EventsCards;
