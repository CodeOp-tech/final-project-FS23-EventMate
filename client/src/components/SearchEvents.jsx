import React, { useState, useEffect } from "react";
import { GetByLocTM } from '../helpers/EventsApi/GetByLocTM.jsx';
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Local from "../helpers/Local";
import addEventsToDB from "../helpers/Utils/addEventsToDB.js";
import LocationDropdown from "./Registration/LocationDropdown";
import takeEventDetails from "../helpers/Utils/takeEventDetails";
import Form from "./Form";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EventCard from "./EventCard";
import EventsDisplayModal from "./EventsDisplayModal.jsx";
import "./searchEvents.css"
import MyEventIDs from "../helpers/Utils/MyEventIDs.js";


function SearchEvents() {
  const navigate = useNavigate();
  const userInfo = Local.getUser();
  const userLocation = userInfo.location;
  const [events, setEvents] = useState();
  const [location, setLocation] = useState();
  const [showEvents, setShowEvents] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [myEventsids, setMyEventsids] = useState([])
   
 //Loads with user's current country in DB when loading
    useEffect(() => {
      getLocation();
      setLocation(userLocation)
    }, []);


  //gets user location from local storage and sets it
  async function getLocation() {
    await getEvents(userLocation);
  }

  async function inMyEvents(userID, eventsObjects){
    let myEvents= await MyEventIDs(userID);
    setMyEventsids(myEvents);
      return eventsObjects.map(o => 
        myEvents.includes(o.id)
          ? o.showAdd = false
          : o.showAdd = true
         )
         
  }

  async function getEvents(location) {
    let results = await GetByLocTM(location);

    let otherResults = await results.map((result) => {
      let eventdetails = takeEventDetails(result, location, userInfo.userId);
      return eventdetails;
    });

    let myEvents = await inMyEvents(userInfo.userId, otherResults);
      await setEvents(otherResults);
    setShowEvents(true);
  }


  function handleOpenModal(res) {
    setModalData(res);
    setIsOpen(true);
  }
  const handleLocationChange = async (form) => {
    await getEvents(form.location);
    setLocation(form.location);
    setShowEdit(!showEdit);
    console.log("events set as:", events);
  };

 

 
    async function handleAddToMyEventsBtn(eventId, eventObject){
      console.log("handle events, id, object, userid", eventId, eventObject, userInfo.userId)
      let result = await addEventsToDB(eventId, eventObject, userInfo.userId)
      console.log("handle add events", result)
      if (result){

        setShowEvents(true);
        getEvents(location);

      }
    }


    async function handleFindAMateBtn(eventId){

    }



return (
  <div>
    <div>
      <h2 className="choose-events">
        Events Near Me &nbsp;
        {!showEdit && (
          <>
            {location}
            <IconButton color="secondary" aria-label="Search">
              <EditIcon
                onClick={() => {
                  setShowEdit(!showEdit);
                }}
              />
            </IconButton>
          </>
        )}
        {showEdit && (
          <Form
            formInitialValues={{ location: "" }}
            onFormChange={handleLocationChange}
          >
            <LocationDropdown
              label="Location"
              name="location"
              defaultValue={userLocation}
            />
          </Form>
        )}
      </h2>
    </div>
    {showEvents && (
      <div className="show-choose-events">
        <div className="results-choose-events">
          {events.map((r) => {
            return (
              <div key={r.id} className="event-items">
                <EventCard 
                r={r} 
                modelOpen={handleOpenModal}
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
                >My Events</Button>
                  }

                {/* <Button 
                size="small" 
                variant= "contained" 
                fontSize="small"
                onClick={e => handleFindAMateBtn(r.id)}
                >Find a Mate</Button> */}
                {/* <EventCard r={r}
                 modelOpen={handleOpenModal} 
                className= "event-card-search"/> */}

                <div className="btns-cards">
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
    <EventsDisplayModal
      isOpen={isOpen}
      handleOpen={setIsOpen}
      eventData={modalData}
    />
  </div>
);
}

export default SearchEvents;
