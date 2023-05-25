import React, { useRef, useState, useEffect } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../styles/login.css";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TopSection from "./TopSection";

const LoginComponent = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const history = useHistory();


  useEffect(() => {
    if(currentUser) 
      return history.push("/");
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to log in.");
    }
    setLoading(false);
  }
  return (
    <>
      <TopSection />
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body className="card-body">
              <h2 className="text-center mb-4"> Log In </h2>
              {error && (
                <Alert variant="danger" className="text-center">
                  {" "}
                  {error}{" "}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
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

                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Login
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password"> Forgot Password? </Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Don't have an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginComponent;
