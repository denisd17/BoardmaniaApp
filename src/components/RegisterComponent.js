import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../contexts/AuthContext";
import { Container } from "react-bootstrap";
import "../styles/login.css";
import TopSection from "./TopSection";
const RegisterComponent = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const { register, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (currentUser) return history.push("/");
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords don't match");
    }
    try {
      setError("");
      setLoading(true);
      const status = await register(
        emailRef.current.value,
        passwordRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value
      );
      if (status !== 200) {
        throw new Error("Failed to register");
      }
      history.push("/login");
    } catch {
      setError("Failed to register");
    }
    setLoading(false);
  }
  return (
    <>
      <TopSection />
      <Container className="d-flex align-items-center justify-content-center">
        <div
          className="w-100"
          style={{ maxWidth: "400px", top: "100px", position: "absolute" }}
        >
          <Card>
            <Card.Body className="cardBody">
              <div>
                <h2 className="text-center mb-4"> Register </h2>
              </div>
              {error && (
                <Alert variant="danger" className="text-center">
                  {" "}
                  {error}{" "}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="firstName" className="text-center">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={firstNameRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="lastName" className="text-center">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    ref={lastNameRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="username" className="text-center">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    ref={usernameRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="email" className="text-center">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="password" className="text-center">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Form.Group id="password-cofirm" className="text-center">
                  <Form.Label>Confirm Password </Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                    className="text-center"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RegisterComponent;
