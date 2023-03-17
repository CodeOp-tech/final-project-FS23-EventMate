import React, { useState, useEffect } from "react";
import { GetByLocTM } from "../ApiCalls/GetByLocTM";
import Checkbox from '@mui/material/Checkbox';
import "./chooseEvents.css"
import { TextField } from "@mui/material";

function SearchEvents() {
      const [location, setLocation] = useState(); // save location
      const [events, setEvents] = useState(); 
      const [showEvents, setShowEvents] = useState(false);
      const [showEdit, setShowEdit]= useState(false);
      const [showTitle, setShowTitle]= useState(true);
      const [checkedItems, setCheckedItems] = useState([]);
   

    //Loads with user's current country in DB     
    useEffect(() => {
    getLocation();
    getEvents(location)
    }, []);
    
    //Loads events when location changes   
    useEffect(() => {
    getEvents(location)
    }, [location]);

    async function getLocation(){
        // fetche location from db
        //placeholder below
        setLocation("barcelona");
    };


    const handleChange = event => {
        setLocation(event.target.value);
      };
    

    function handleEditButton(){
        setShowEdit(true);
        setShowTitle(false);
    }  

    async function handleSubmit(e){
        e.preventDefault();
        await getEvents(location)
        console.log("events set as:", events)
        setShowEdit(false);
        setShowTitle(true);
      };
    
     
    async function getEvents(place){
        let results = await GetByLocTM(location);
        //formatting the object to only take what we need
    let newResults= results.map((result) =>{
        return {"id": result.id, 
        "name":result.name, 
        "image": result.images["0"].url, 
        "date" : result.dates.start.localDate, 
        "time" : result.dates.start.localTime, 
        "venue" : result._embedded.venues["0"].name}});

        console.log("new Results" , newResults)
        await setEvents(newResults);
        setShowEvents(true);
    }



  return (
    <div className="choose-events">

{ showEdit &&
       <div className="edit-location">
        <form className= "edit-loc-form" onSubmit={e => handleSubmit(e)}>
        <h2>Events in </h2>
        <TextField id="standard-basic" label="city" variant="standard" 
              placeholder="enter your location"
              name="location"
              type="text"
              value={location}
              onChange={e => handleChange(e)}
            />


          {/* <button className="edit" type="submit">
            ✓
          </button> */}
         
        </form>
      </div>
}

    { showTitle &&
      <div className="title"> 
       <h2>Events in {location}</h2>
       <button className="edit" onClick={(e)=> handleEditButton()}>✎</button>
       </div> 
    }

     { showEvents &&
      <div className="show-choose-events">
       <div className="results-choose-events">
      {
      events.map(r => {
          return <div key={r.id} className="event-items">
              <Checkbox
                className="event-checkbox"
                value={r.id}
                inputProps={{
                    'aria-label': 'Checkbox A',
                }}
            />
            <img src= {r.image} alt="" className="event-img"/>
            <p className="event-title">{r.name}</p>
            <p className="event-date-time">{r.date} | {r.time}</p>
            <p className="event-venue">{r.venue}</p>
          </div>
      }
           )}
         </div>
         </div>
         }


    </div>
  )
}

export default SearchEvents