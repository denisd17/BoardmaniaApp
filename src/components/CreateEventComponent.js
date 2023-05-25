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

const CreateEventComponent = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const dateTimeRef = useRef();
  const onlineRef = useRef();
  const maxNumOfPlayersRef = useRef();
  const minTrustScoreRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    const eventData = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      location: locationRef.current.value,
      eventDateTimestamp: Date.parse(dateTimeRef.current.value),
      online: onlineRef.current.checked,
      maxNrOfPlayers: maxNumOfPlayersRef.current.value,
      minTrustScore: minTrustScoreRef.current.value,
      gameIds: selectedGames.map((option) => Number(option.value)),
    };
    console.log(Date.parse(dateTimeRef.current.value))
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
                <Form.Group id="datetime" className="text-center">
                  <Form.Label>Date & Time {"(yyyy-mm-ddThh:mm:ss)"}</Form.Label>
                  <Form.Control
                    type="text"
                    ref={dateTimeRef}
                    required
                    className="text-center"
                  />
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
