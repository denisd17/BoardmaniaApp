import React, {useState, useEffect} from 'react'
import { useParams, useLocation, useHistory} from 'react-router-dom'
import TopSection from './TopSection';
import { Form, Button, Alert } from "react-bootstrap";
import "../styles/event-component.css";
import gameService from '../service/gameService';
import eventService from '../service/eventService';
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
        if(response.status === 200) {
            history.push("/dashboard");
        } else {
          setError(response);
        }
    } catch (error){
      console.log(error);

    }
    setLoading(false);
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
        <JoinEventCard event={event} showBtn={false} participants={participants} />
        <Form className='form-event' onSubmit={handleSubmit}>
          <Form.Group id="games" className="text-center">
            <Form.Label className='form-label-event'>Vote the games you want to play</Form.Label>
            <Form.Select multiple onChange={handleSelectChange}>
              {
                games.map(val => {
                  return (
                    <option key={val.id} value={val.id}>{val.name}</option>
                  )
                })
              }
            </Form.Select>
          </Form.Group>
          <Button disabled={loading} className="w-50 mt-4 btn-success" type="submit">
            Join Event
          </Button>
        </Form>
      </div>
    </>
  )
}


export default EventComponent;