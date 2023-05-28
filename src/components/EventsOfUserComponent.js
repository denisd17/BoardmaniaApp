import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import eventService from "../service/eventService";
import "../styles/dashboard.css";
import "../styles/my-events.css";
import EventCard from "./EventCard";
import { Button } from "react-bootstrap";
import TopSection from "./TopSection";


const EventsOfUserComponent = () => {
  const [createdEvents, setCreatedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    const getCreatedEvents = async () => {
      try {
        const response = await eventService.getEventsOfCurrentUser();
        setCreatedEvents(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getCreatedEvents();

    const getJoinedEvents = async () => {
      try {
        const response = await eventService.getJoinedEvents();
        setJoinedEvents(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getJoinedEvents();
  }, []);

  const handleSeeMore = (event, type) => {
    history.push({pathname: `/events/${event.id}`, state: {event:event, type:type}});
  }

  return (
    <>
      <TopSection/>
      <div className="my-ev-c">
        {/* <div style={{marginBottom:"50px"}}>
          <Button className="btn-success" onClick={() => history.push(`/createEvent`)}> Create Event </Button>
        </div> */}
        <p className="title"><b>Created Events</b></p>
        <div className="events-c">
          {createdEvents.map((val, key) => {
            return <EventCard event={val} key={key} handleSeeMore={handleSeeMore} showBtn={true} type="created" />
          })}
        </div>
        <p className="title"><b>Joined Events</b></p>
        <div className="events-c">
          {joinedEvents.map((val, key) => {
            return <EventCard event={val} key={key} handleSeeMore={handleSeeMore} showBtn={true} type="joined"/>
          })}
        </div>
      </div>
    </>
  );
};

export default EventsOfUserComponent;
