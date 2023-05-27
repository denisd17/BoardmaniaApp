import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import eventService from "../service/eventService";
import "../styles/dashboard.css";
import EventCard from "./EventCard";
import { Button } from "react-bootstrap";
import TopSection from "./TopSection";


const EventsOfUserComponent = () => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    const getEvents = async () => {
      try {
        const response = await eventService.getEventsOfCurrentUser();
        setEvents(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }

    getEvents();
  }, []);

  const handleSeeMore = (event) => {
    history.push({pathname: `/events/${event.id}`, state: {event:event}});
  }

  return (
    <>
      <TopSection/>
      <div className="main-container">
        {/* <div style={{marginBottom:"50px"}}>
          <Button className="btn-success" onClick={() => history.push(`/createEvent`)}> Create Event </Button>
        </div> */}
        {events.map((val, key) => {
          return <EventCard event={val} key={key} handleSeeMore={handleSeeMore} showBtn={true}/>
        })}
      </div>
    </>
  );
};

export default EventsOfUserComponent;
