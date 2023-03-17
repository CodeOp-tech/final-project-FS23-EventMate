import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import React, {useState} from 'react'
import { useEffect } from 'react';
import getMyEvents from '../getMyEvents';


//pass the data into the component as a prop
// you'll need a useEffect on the page it's nested in 

function EventsCards() {
const [events, setEvents] = useState(); 
const [loading, setLoading] = useState(true);
const [showList, setShowList]= useState(false);

useEffect(() => {
 getEvents();
}, [])


    async function getEvents(){  
        console.log("getting events for event cards....")
    //  let apiData =  await GetByLocTM("Barcelona");
    let apiData =  await getMyEvents();
    let newResults= apiData.map((result) =>{ 
        return {"id": result.id, 
        "name":result.name, 
        "image": result.images["0"].url, 
        "date" : result.dates.start.localDate, 
        "time" : result.dates.start.localTime, 
        "venue" : result._embedded.venues["0"].name}});
        console.log("new Results" , newResults)
        await setEvents(newResults); 
        setLoading(false)
        setShowList(true)
    }

  return (
    <div className= "event-cards">
            {loading &&
            <div>
            <h1>Loading......</h1>  
            </div>
            }




        {showList && 
        <div>
         {
      events.map(r => {
          return <List key={r.id} sx={{ width: '100%', maxWidth: "70vw", bgcolor: 'background.paper'}}>
      <ListItem 
     dense={true}
      alignItems="flex-start"
      style={{maxHeight:"60px"}}
      >
        <ListItemAvatar
          sx={{ paddingRight: '10px'}}
          alignItems="center" 
          >
          <img alt="event"
           src={r.image} 
           style={{width:"100px",
           maxHeight:"50px"}}
           />
        </ListItemAvatar>
        <ListItemText
          primary={r.name} 
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {r.date}, {r.time}
              </Typography>
               { `  ${r.venue}` }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
     
    </List>

        })} {/*close map fn */}
       </div> 
   }
    </div>
  )
}

export default EventsCards
