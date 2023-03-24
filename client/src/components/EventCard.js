import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
export default function EventCard({ r, modelOpen }) {
  return (
    <>
      <ListItem
        dense={true}
        alignItems="flex-start"
        style={{ maxHeight: "60px" }}
        className="eventCard"
      >
        <ListItemAvatar sx={{ paddingRight: "10px" }} alignItems="center">
          <img
            alt="event"
            src={r.image}
            style={{ width: "100px", maxHeight: "50px" }}
          />
        </ListItemAvatar>
        <ListItemText
          primary={r.name}
          onClick={(e) => modelOpen(r)}
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
        {/* <Button size="small" variant="text" fontSize="small">+ My Events</Button>
        <Button size="small" variant= "contained" fontSize="small">Find a Mate</Button> */}
      </ListItem>
      <Divider variant="inset" component="div" />
    </>
  );
}
