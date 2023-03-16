import React, { useState, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ClientAPI from "../helpers/ClientAPI";
import UserDialogView from "./UserDialogView"


export default function UserListView() {

  const [matched, setMatched] = useState([]);
  const [open, setOpen] = useState(false);
  const [matchClicked, setMatchClicked] = useState(false);

  useEffect(() => {
    getMatched();
  }, []);

  async function getMatched() {
    let uresponse = await ClientAPI.getMatchedUsers();
    if (uresponse.ok) {
      setMatched(uresponse.data)
    }
    else {
      console.log('Error!', uresponse.error);
    }
  }

  const handleClickOpen = (matchPass) =>{
    console.log("----", matchPass)
    setMatchClicked(matchPass);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMatchClicked(false);
  };


  return (
    <Box
      display="flex"
      minHeight="100vh"
      sx={{ 
        width: '80%', 
        maxWidth: 800,
        mx: 'auto',
        flexDirection: 'column'
      }}
    >
    
    <h2>Your event matches...</h2>

      <List sx={{ 
        width: '100%',  
        bgcolor: 'background.paper' 
      }}>

      { matched &&
        matched.map(match => (
          <div>
          <ListItem key={match.userId} onClick={e => handleClickOpen(match)}>

            <ListItemAvatar sx={{ 
              mr: '15px'  
            }}>
              <Avatar alt={match.username} src={match.avatarURL} sx={{ width: 56, height: 56 }}/>
            </ListItemAvatar>

            <ListItemText 
              primary={
                <div>
                  {match.username}
                </div>
              }

              secondary={
                <div>
                  <div>
                    Age: {match.age}
                  </div>
                  <div>
                    Gender: {match.gender}
                  </div>
                  <div>
                    Location: {match.location}
                  </div>
                  <div>
                    Event:
                  </div>
                </div>
              } />

              <Button variant="outlined">Invite</Button>
          
          </ListItem>
          <Divider component="li" />

          {
            matchClicked && <UserDialogView open={open} onClose={handleClose} matchClicked={matchClicked} />
          }

          </div>
        ))}
      </List>
    </Box>
  )

 }