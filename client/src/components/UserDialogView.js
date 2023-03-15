import React, { useState, useEffect } from "react";

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

export default function UserListView({open, onClose, matchClicked}) {


  return (
    <Dialog 
      onClose={onClose} 
      open={open}
      fullWidth
      maxWidth="lg"
    >
      <DialogContent>

      <IconButton
        edge="start"
        color="inherit"
        onClick={onClose}
        aria-label="close"
      >
        <CloseIcon />
      </IconButton>


        <Box    
          sx={{ 
            width: '70%',
            mx: 'auto',
            display: "grid",
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, 1fr)'
          }}
        >

          <Box
          sx={{ 
            gridColumn: '1',
            gridRow: '1',
          }}
          >
            <Avatar
            variant="rounded"
            alt={matchClicked.username}
            src={matchClicked.avatarURL}
            sx={{ width: 150, height: 150 }}
            />

            <h2>{matchClicked.username}</h2>
            <p>{matchClicked.location}</p>
          </Box>

          <Box
          sx={{ 
            gridColumn: '2',
            gridRow: '1'
          }}
          >
            <h5>Languages Spoken</h5>
            <p>{matchClicked.languages}</p>

            <h5>Age</h5>
            <p>{matchClicked.age}</p>

            <h5>Gender</h5>
            <p>{matchClicked.gender}</p>
          </Box>

          <Box
          sx={{ 
            gridColumn: '3',
            gridRow: '1'
          }}
          >
            <h5>Occupation</h5>
            <p>{matchClicked.occupation}</p>

            <h5>Interests</h5>
            <p>{matchClicked.interests}</p>

            
          </Box>

          <Box
          sx={{ 
            gridColumn: '2 / 4',
            gridRow: '2',

          }}
          >
            <h3>About</h3>
            <p>{matchClicked.about}</p>

            
          </Box>

          <Box
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gridColumn: '4',
            gridRow: '1',
            alignItems: 'flex-end'
          }}
          >
          <Button variant="outlined">Invite</Button>

            
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

