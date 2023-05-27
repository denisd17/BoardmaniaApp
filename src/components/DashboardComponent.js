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
  const [locationType, setLocationType] = useState(0);
  const [searchParam, setSearchParam] = useState("");
  const [pageNr, setPageNr] = useState(0);

  const { currentUser } = useAuth();
  const history = useHistory();

  const test = (id) => {
    console.log(id);
  }

  const getEvents = async (search, type) => {
    console.log(searchParam);
    try {
      let filters = {
        searchParam : search ? search : searchParam,
        locationType : type ? type : locationType
      }

      const response = await eventService.getEventsPage(0, 4, filters);
      setEvents(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
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
              <input className="search-input" type="text" onChange={e => {setSearchParam(e.target.value); getEvents(e.target.value, null);}}></input>
          </div>
          <div className="checkbox-container">
              <input type="radio" id="all" name="radio" value="0" onChange={e => {setLocationType(0); getEvents(null, 0);}}></input>
              <label for="all">All</label>
              <input type="radio" id="online" name="radio" value="1" onChange={e => {setLocationType(1);getEvents(null, 1);}}></input>
              <label for="online">Online</label>
              <input type="radio" id="onsite" name="radio" value="2" onChange={e => {setLocationType(2); getEvents(null, 2);}}></input>
              <label for="onsite">Onsite</label>
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
