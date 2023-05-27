import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import eventService from "../service/eventService";
import "../styles/dashboard.css";
import EventCard from "./EventCard";
import { Button } from "react-bootstrap";
import TopSection from "./TopSection";


const DashboardComponent = () => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useAuth();
  const history = useHistory();

  const test = (id) => {
    console.log(id);
  }

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    const getEvents = async () => {
      try {
        const response = await eventService.getEventsPage(0, 4);
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
        <div className="filters-container">
          <div className="search-bar-container">
              <input className="search-input" type="text" onChange={e => {test(1)}}></input>
          </div>
          <div className="checkbox-container">
              <input type="radio" id="all" onChange={e => test(1)}></input>
              <label for="html">All</label>
              <input type="radio" id="online" onChange={e => test(2)}></input>
              <label for="css">Online</label>
              <input type="radio" id="onsite" onChange={e => test(3)}></input>
              <label for="javascript">Onsite</label>
          </div>
        </div>
        <div style={{marginBottom:"50px"}}>
          <Button className="btn-success" onClick={() => history.push(`/createEvent`)}> Create Event </Button>
        </div>
        {events.map((val, key) => {
          return <EventCard event={val} key={key} handleSeeMore={handleSeeMore} showBtn={true}/>
        })}
      </div>
    </>
  );
};

export default DashboardComponent;
