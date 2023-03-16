import React from "react";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


export default function Home() {


  return (
    <div>

      <Box    
      sx={{ 
        width: '80%',
        mx: 'auto',
        mt: '30px',
        display: "grid",
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)'
      }}
      >

        <Box
        sx={{ 
          gridColumn: '1',
          gridRow: '1',
        }}
        >
          <h1>Find a friend to go to an event together</h1>
          <p>Go to concerts, theatre plays, art exhibitions and outdoor movies.</p>
        </Box>


        <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          gridColumn: '1 / 3',
          gridRow: '3',
          alignItems: 'center'
        }}
        >
          <Link to="/register">
            <Button variant="contained" size="large">Find a Mate</Button>
          </Link>
        </Box>



      </Box>
    
    </div>
  )

}
