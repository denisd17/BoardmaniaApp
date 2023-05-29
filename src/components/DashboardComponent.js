import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import eventService from "../service/eventService";
import "../styles/dashboard.css";
import EventCard from "./EventCard";
import { Button } from "react-bootstrap";
import TopSection from "./TopSection";
import Pagination from "@mui/material/Pagination";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";

const DashboardComponent = () => {
  const [events, setEvents] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [locationType, setLocationType] = useState(0);
  const [searchParam, setSearchParam] = useState("");
  const [pageNr, setPageNr] = useState(1);

  const { currentUser } = useAuth();
  const history = useHistory();

  const test = (id) => {
    console.log(id);
  };

  const handlePageChange = (event, page) => {
    setPageNr(page);
    console.log(event);
    console.log("Page is " + page);
    getEvents(null, null, page - 1);
  };

  const getEvents = async (search, type, page) => {
    console.log(searchParam);
    try {
      let filters = {
        searchParam: search ? search : searchParam,
        locationType: type === null ? locationType : type,
      };
      let pageNumber = page === null ? 0 : page;
      const response = await eventService.getEventsPage(pageNumber, 4, filters);
      setEvents(response.data.content);
      let totalElements = response.data.totalElements;
      let totalPages = response.data.totalPages;
      setTotalEvents(totalElements);
      setTotalPages(totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const getEventsFiltered = async (search, type, page) => {
    console.log(searchParam);
    try {
      let filters = {
        searchParam: search ? search : "",
        locationType: type === null ? locationType : type,
      };
      let pageNumber = page === null ? 0 : page;
      const response = await eventService.getEventsPage(pageNumber, 4, filters);
      setEvents(response.data.content);
      let totalElements = response.data.totalElements;
      let totalPages = response.data.totalPages;
      setPageNr(pageNumber == 0 ? 1 : pageNumber);
      setTotalEvents(totalElements);
      setTotalPages(totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }

    getEvents();
  }, []);

  const handleSeeMore = (event) => {
    history.push({ pathname: `/events/${event.id}`, state: { event: event } });
  };

  return (
    <>
      <TopSection />
      <div className="main-container">
        <div className="filters-container">
          <div className="search-bar-container">
            <input
              className="search-input"
              type="search"
              onChange={(e) => {
                setSearchParam(e.target.value);
                getEventsFiltered(e.target.value, null, 0);
              }}
            ></input>
          </div>
          <div className="checkbox-container">
            <input
              type="radio"
              id="all"
              name="radio"
              value="0"
              onChange={(e) => {
                setLocationType(0);
                getEventsFiltered(null, 0, null);
              }}
            ></input>
            <label htmlFor="all">All</label>
            <input
              type="radio"
              id="online"
              name="radio"
              value="1"
              onChange={(e) => {
                setLocationType(1);
                getEventsFiltered(null, 1, null);
              }}
            ></input>
            <label htmlFor="online">Online</label>
            <input
              type="radio"
              id="onsite"
              name="radio"
              value="2"
              onChange={(e) => {
                setLocationType(2);
                getEventsFiltered(null, 2, null);
              }}
            ></input>
            <label htmlFor="onsite">Onsite</label>
          </div>
        </div>
        <div className="event-grid">
          {events.map((val, key) => {
            return (
              <EventCard
                className="eventCard"
                event={val}
                key={key}
                handleSeeMore={handleSeeMore}
                showBtn={true}
              />
            );
          })}
        </div>
        <Pagination
          count={totalPages}
          page={pageNr}
          defaultPage={1}
          sx={{
            button: { color: "#fefefe" },
            "& .Mui-selected": { backgroundColor: "#4C3D3D !important" },
          }}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default DashboardComponent;
