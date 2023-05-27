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
  const [maxPage, setMaxPage] = useState(0);

  const { currentUser } = useAuth();
  const history = useHistory();

  const test = (id) => {
    console.log(id);
  }

  const getEvents = async (search, type, page) => {
    console.log(searchParam);
    try {
      let filters = {
        searchParam : search ? search : searchParam,
        locationType : type === null ? locationType : type
      }
      let pageNumber = page === null ? pageNr : page;
      const response = await eventService.getEventsPage(pageNumber, 4, filters);
      setMaxPage(response.data.totalPages);
      setEvents(response.data.content);
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
              <input className="search-input" type="text" onChange={e => {setSearchParam(e.target.value); getEvents(e.target.value, null, 0);}}></input>
          </div>
          <div className="checkbox-container">
              <input type="radio" id="all" name="radio" value="0" onChange={e => {setLocationType(0); getEvents(null, 0, null);}}></input>
              <label for="all">All</label>
              <input type="radio" id="online" name="radio" value="1" onChange={e => {setLocationType(1);getEvents(null, 1, null);}}></input>
              <label for="online">Online</label>
              <input type="radio" id="onsite" name="radio" value="2" onChange={e => {setLocationType(2); getEvents(null, 2, null);}}></input>
              <label for="onsite">Onsite</label>
          </div>
        </div>
        <div className="event-grid">
          {events.map((val, key) => {
            return <EventCard className="eventCard" event={val} key={key} handleSeeMore={handleSeeMore} showBtn={true}/>
          })}
        </div>
        <div className="page-menu">
          <div className="page-button" onClick={e => {
            getEvents(null, null, pageNr - 1);
            setPageNr(pageNr - 1);
          }}>Previous Page</div>
          <div>{pageNr + 1}</div>
          <div className="page-button" onClick={e => {
            getEvents(null, null, pageNr + 1);
            setPageNr(pageNr + 1);
          }}>Next Page</div>
      </div>
      </div>
      
    </>
  );
};

export default DashboardComponent;
