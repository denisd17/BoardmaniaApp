import React from "react";
import { Button } from "react-bootstrap";
import "../styles/event-card.css";

const EventCard = (props) => {
  const { event, handleSeeMore, showBtn, type } = props;
  return (
    <div className="event-card-container">
      <div className="header-container">
        <div>{event.name}</div>
        <div className="smaller-text">
          ~ {event.online ? "Online" : "Fizic"} ~
        </div>
      </div>
      <div className="body-container">
        <div><b>Description:</b> {event.description}</div>
        <div><b>Location:</b> {event.location}</div>
        <div>
          {" "}
          <b>Date:</b>{" "}
          {new Date(event.eventDateTimestamp).toLocaleString("en-US", {
            timeZone: "UTC",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
      </div>
      <div className="footer-container">
        {showBtn && (
          <Button
            className="btn-primary"
            onClick={() => handleSeeMore(event, type)}
          >
            {" "}
            <b> Go to event </b>{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
