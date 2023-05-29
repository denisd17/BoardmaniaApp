import React, { useEffect, useState, useRef } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import gameService from "../service/gameService";
import { Container } from "react-bootstrap";
import "../styles/login.css";
import TopSection from "./TopSection";

const AddGameComponent = () => {
  const nameRef = useRef();
  const minNumberOfPlayersRef = useRef();
  const maxNumberOfPlayersRef = useRef();
  const descriptionRef = useRef();
  const urlRef = useRef();
  // const { register, currentUser } = useAuth();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      const response = await gameService.addGame(
        nameRef.current.value,
        minNumberOfPlayersRef.current.value,
        maxNumberOfPlayersRef.current.value,
        descriptionRef.current.value,
        urlRef.current.value
      );

      if (response.status !== 201) {
        throw new Error("Failed to add game");
      }
      history.push("/");
    } catch {
      setError("Failed to add game");
    }
    setLoading(false);
  }
  return (
    <>
      <TopSection />
      <Container className="d-flex align-items-center justify-content-center">
        <div
          className="w-100"
          style={{ maxWidth: "400px", top: "8rem", position: "absolute" }}
        >
          <Card>
            <Card.Body className="cardBody">
              <div>
                <h2 className="text-center mb-4"> Add Game </h2>
              </div>
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
                <Form.Group id="minNumberOfPlayers" className="text-center">
                  <Form.Label>Min Number Of Players</Form.Label>
                  <Form.Control
                    type="number"
                    ref={minNumberOfPlayersRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="maxNumberOfPlayers" className="text-center">
                  <Form.Label>Max Number Of Players</Form.Label>
                  <Form.Control
                    type="number"
                    ref={maxNumberOfPlayersRef}
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
                <Form.Group id="url" className="text-center">
                  <Form.Label>Url</Form.Label>
                  <Form.Control
                    type="text"
                    ref={urlRef}
                    className="text-center"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Add Game
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default AddGameComponent;
