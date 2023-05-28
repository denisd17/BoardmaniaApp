import React from "react";
import "../styles/join-event-card.css";

const JoinEventCard = (props) => {
  const { event, participants } = props;
  const hyperlink= (<a href={event.location} title={event.location}> click here </a>); 
  return (
    <div className="event-card-c">
      <div className="header-c">
        <div>
            {event.name}
        </div>
        <div> 
            {participants.length} / {event.maxNumberOfPlayers} joined
        </div>
      </div>
      <div className="body-c"> 
        <div className="desc-container">
            {event.description}
        </div>
        <div className="place-date-container">
            <div>
                <b>Where:</b> {event.online ? hyperlink : event.location}
            </div>
            <div>
                <b>When:</b>{" "}
                {new Date(event.eventDateTimestamp).toLocaleString("en-US", {
                    timeZone: "UTC",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                })}
            </div>
        </div>
      </div>
      <div className="footer-c">
        <b>Initiator:</b> &nbsp; {event.initiatorName}      
      </div>
    </div>
  );
};

export default JoinEventCard;
