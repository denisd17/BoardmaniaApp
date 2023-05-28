import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import TopSection from './TopSection';
import { Form, Button, Alert } from "react-bootstrap";
import "../styles/event-component.css";
import gameService from '../service/gameService';
import eventService from '../service/eventService';
import userService from '../service/userService';
import { useAuth } from '../contexts/AuthContext';
import JoinEventCard from './JoinEventCard';

const EventComponent = props => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const location = useLocation();
  const event = location.state.event;
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      history.push("/login");
    }
    const getGamesForEvent = async (id) => {
      try {
        const response = await gameService.getGamesForEvent(id);
        setGames(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getGamesForEvent(id);

    const getParticipants = async (id) => {
      try {
        const response = await eventService.getParticipants(id);
        setParticipants(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getParticipants(id);

    const getCurrentUserInfo = async() => {
      try {
        const response = await userService.getCurrentUserInfo();
        setCurrentUserInfo(response.data);
      } catch(err) {
        console.log(err);
      }
    }
    getCurrentUserInfo();
  }, []);


  function handleSelectChange(event) {
    setSelectedGames([...event.target.options].filter(option => option.selected))
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const votes = {
      voteDtoList: selectedGames.map(option => Number(option.value))
    }
    try {
      setError("");
      setLoading(true);
      const response = await eventService.joinEvent(votes, event.id);
      console.log("RESPONSE", response);
      if (response.status === 200) {
        history.push("/dashboard");
      } else {
        setError(response);
      }
    } catch (error) {
      console.log(error);

    }
    setLoading(false);
  }

  function isEligible() {
    if (currentUserInfo) {
      return currentUserInfo.trustScore >= event.minTrustScore;
    }
  }

  function isInitiator() {
    
    if (currentUserInfo) {
      return currentUserInfo.firstName + " " + currentUserInfo.lastName === event.initiatorName;
    }
  }

  return (
    <>
      <TopSection />
      {error && (
        <Alert variant="danger" className="text-center">
          {" "}
          {error}{" "}
        </Alert>
      )}
      <div className='details-container'>
        <Form className='form-event' onSubmit={handleSubmit}>
          <Form.Group id="games" className="text-center">
            <Form.Label className='form-label-event p-3'><b>Vote for the games you want</b></Form.Label>
            <Form.Select multiple onChange={handleSelectChange} className='my-select'>
              {
                games.map(val => {
                  return (
                    <option key={val.id} value={val.id}>{val.name}</option>
                  )
                })
              }
            </Form.Select>
          </Form.Group>
          <div className='f-footer'>
            <Button disabled={loading || !isEligible() || isInitiator() || selectedGames.length === 0} className="w-50 btn-success btn-join" type="submit">
              Join Event
            </Button>
            <div className={isEligible() ? 'trust-sc-c text-green': 'trust-sc-c text-red'}> {currentUserInfo ? currentUserInfo.trustScore : '0'} / {event.minTrustScore}</div>
          </div>
        </Form>
        <JoinEventCard event={event} showBtn={false} participants={participants} />
      </div>
    </>
  )
}


export default EventComponent;