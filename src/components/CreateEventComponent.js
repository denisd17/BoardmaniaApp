import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import eventService from "../service/eventService";
import "../styles/dashboard.css";
import { Button } from "react-bootstrap";
import TopSection from "./TopSection";
import { Form, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import gameService from "../service/gameService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateEventComponent = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const timeRef = useRef();
  const onlineRef = useRef();
  const maxNumOfPlayersRef = useRef();
  const minTrustScoreRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [votingDeadlineDate, setVotingDeadlineDate] = useState(new Date());
  const [confirmationDeadlineDate, setConfirmationDeadlineDate] = useState(new Date());

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    const getGames = async () => {
      try {
        const response = await gameService.getGames();
        setGames(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getGames();
  }, []);

  function handleSelectChange(event) {
    setSelectedGames(
      [...event.target.options].filter((option) => option.selected)
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(startDate.toISOString().slice(0, 11) + timeRef.current.value + ":00");
    let eventDate = Date.parse(startDate.toISOString().slice(0, 11) + timeRef.current.value + ":00");
    let votingDeadline = Date.parse(votingDeadlineDate.toISOString().slice(0, 10));
    let confirmDeadline = Date.parse(confirmationDeadlineDate.toISOString().slice(0, 10));
    console.log(eventDate, "v: " + votingDeadline, "c: " + confirmDeadline);
    const eventData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      location: locationRef.current.value,
      eventDateTimestamp: eventDate,
      online: onlineRef.current.checked,
      maxNrOfPlayers: maxNumOfPlayersRef.current.value,
      minTrustScore: minTrustScoreRef.current.value,
      votingDeadlineTimestamp: votingDeadline,
      confirmationDeadlineTimestamp: confirmDeadline,
      gameIds: selectedGames.map((option) => Number(option.value)),
    };
    
    try {
      setError("");
      setLoading(true);
      const response = await eventService.createEvent(eventData);
      if (response.status === 200) {
        history.push("/dashboard");
      }
    } catch {
      setError("Failed to create event.");
    }
    setLoading(false);
  }

  return (
    <>
      <TopSection />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "80vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body className="card-body">
              <h2 className="text-center mb-4"> Create Event </h2>
              {error && (
                <Alert variant="danger" className="text-center">
                  {" "}
                  {error}{" "}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="name" className="text-center">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={nameRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="description" className="text-center">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    ref={descriptionRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="location" className="text-center">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    ref={locationRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group className="text-center">
                  <Form.Label>Event Date</Form.Label>
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                </Form.Group>

                <Form.Group id="time" className="text-center">
                  <Form.Label>Event Time</Form.Label>
                  <Form.Control
                    type="text"
                    ref={timeRef}
                    required
                    className="text-center"
                    placeholder="18:30"
                  />
                </Form.Group>
                
                <Form.Group className="text-center">
                  <Form.Label>Voting Deadline Date</Form.Label>
                  <DatePicker selected={votingDeadlineDate} onChange={(date) => setVotingDeadlineDate(date)} />
                </Form.Group>
                
                <Form.Group className="text-center">
                  <Form.Label>Confirmation Deadline Date</Form.Label>
                  <DatePicker selected={confirmationDeadlineDate} onChange={(date) => setConfirmationDeadlineDate(date)} />
                </Form.Group>
                
                <Form.Group id="maxplayers" className="text-center">
                  <Form.Label>Max Number of Players</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    ref={maxNumOfPlayersRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="mintrust" className="text-center">
                  <Form.Label>Minimum Trust Score</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    ref={minTrustScoreRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="games" className="text-center">
                  <Form.Label>Select the games for the event</Form.Label>
                  <Form.Select multiple onChange={handleSelectChange}>
                    {games.map((val) => {
                      return (
                        <option key={val.id} value={val.id}>
                          {val.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group
                  id="online"
                  className="text-center d-flex justify-content-between mt-3"
                >
                  <Form.Label>Check the box if the event is online</Form.Label>
                  <Form.Check
                    type="checkbox"
                    ref={onlineRef}
                    className="text-center ml-1"
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100 mt-4 btn-success"
                  type="submit"
                >
                  Create Event
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default CreateEventComponent;
