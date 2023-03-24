import { Box, Button, Modal } from "@mui/material";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Local from "../helpers/Local";
import addEventsToDB from "../helpers/Utils/addEventsToDB";


function EventsDisplayModal({ isOpen, handleOpen, eventData}) {
const userInfo = Local.getUser()
const userId= userInfo.userId
const [addedToEvents, setAddedToEvents]= useState(false);

 async function handleMyEvents(){
  let response= await addEventsToDB(eventData.id, eventData, userId)
 if (response){
    setAddedToEvents(true)
    eventData.showAdd=(false)
 }
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
  };


  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
    console.log(url)
  };

  console.warn(eventData);
  return (
    <Modal
      open={isOpen}
      onClose={(e) => handleOpen(!isOpen)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={style}>
        <Card sx={{ maxWidth: "100%" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={eventData.image}
              alt={eventData.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {eventData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <h3>Description:</h3>
                {eventData.eventType === "Music" && (
                  <p>
                    {eventData.genre}-{eventData.subgenre} music event, live at{" "}
                    {eventData.venue}
                  </p>
                )}
                <p>
                  {eventData.eventType} Event, {eventData.genre},
                  {eventData.subgenre}
                </p>

               { eventData.purchaseURL &&
                <Button
                 variant="contained" size= "small" href={eventData.purchaseURL} target="_blank" 
                onClick={(e) => openInNewTab(`${eventData.purchaseURL}`)}>
                  Purchase Tickets
                </Button> 
                }

                { eventData.showAdd &&
                <Button color= "secondary" variant="contained" 
                onClick={e => handleMyEvents()}>my events +</Button>
                }
                { !addedToEvents && !eventData.showAdd &&
                <Button size= "small" color= "secondary"> my event</Button>
                }
                 { addedToEvents &&
                <Button size= "small"  color= "secondary" > added!</Button>
                }


              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        {/* <img
          style={{ maxHeight: "200px", maxWidth: "200px" }}
          src={eventData.image}
          alt={`event ${eventData.name}`}
        /> */}

        {/* <h2>{eventData.name}</h2>

        <h3>Description:</h3>
        {eventData.eventType === "Music" && (
          <p>
            {eventData.genre}-{eventData.subgenre} music event, live at{" "}
            {eventData.venue}
          </p>
        )}
        <p>
          {eventData.eventType} Event, {eventData.genre}, {eventData.subgenre}
        </p> */}
        {/* <Button href={eventData.purchaseLink} target="_blank">
          Purchase Tickets Online
        </Button>
        <Button>add to my events</Button> */}
      </Box>
    </Modal>
  );
}

export default EventsDisplayModal;
