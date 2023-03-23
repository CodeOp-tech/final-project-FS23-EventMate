import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useEffect } from "react";
import getMyEvents from "../helpers/Utils/getMyEvents.js";
import { CircularProgress } from "@mui/material";
import EventsDisplayModal from "./EventsDisplayModal.jsx";
import EventCard from "./EventCard";

//pass the data into the component as a prop
// you'll need a useEffect on the page it's nested in

function EventsCards() {
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);
  const [showList, setShowList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  useEffect(() => {
    getEvents();
  }, []);

  function handleOpenModal(res) {
    setModalData(res);
    setIsOpen(true);
  }

  async function getEvents() {
    console.log("getting events for event cards....");
    let apiData = await getMyEvents();
    let newResults = apiData.map((result) => {
      return {
        id: result.id,
        name: result.name,
        image: result.images["0"].url,
        date: result.dates.start.localDate,
        time: result.dates.start.localTime,
        venue: result._embedded.venues["0"].name,
        currency: result.priceRanges["0"].currency,
        startingPrice: result.priceRanges["0"].min,
        purchaseLink: result.url,
        genreId: result.classifications["0"].genre.id,
        genre: result.classifications["0"].genre.name,
        subgenre: result.classifications["0"].subGenre.name,
        eventType: result.classifications["0"].segment.name,
        eventHost: result._embedded.attractions.name,
      };
    });
    console.log("new results mapped", newResults);
    await setEvents(newResults);
    setLoading(false);
    setShowList(true);
  }

  return (
    <div className="event-cards">
      {loading && (
        <div>
          <CircularProgress />
          {/* <h1>Loading......</h1>   */}
        </div>
      )}

      {showList && (
        <div>
          {events.map((r) => {
            return <EventCard key={r.id} r={r} modelOpen={handleOpenModal} />;
          })}
          {/*close map fn */}
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

export default EventsCards;
