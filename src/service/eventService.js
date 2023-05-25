import axios from "../axios/axios";
import { createEventDto } from "../dto/CreateEventDto";
import { JoinEventDto } from "../dto/JoinEventDto";
const EVENTS_PATH = "/events"
let counter = 0;

const getEvents = async () => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(EVENTS_PATH, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if(counter < 5) {
            counter ++;
            console.log("Retrying...")
            setTimeout(getEvents, 500);
        }
    }
}

const getEventsOfCurrentUser = async () => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(EVENTS_PATH + "/current-user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if(counter < 5) {
            counter ++;
            console.log("Retrying...")
            setTimeout(getEvents, 500);
        }
    }
} 

const createEvent = async (eventData) => {
    try {
        console.log("Service", eventData);
        const token = localStorage.getItem('access_token');
        const response = await axios.post(EVENTS_PATH, new createEventDto(eventData), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.error(error);
    }
}

const joinEvent = async (voteDtoList, eventId) => {
    try {
        const token = localStorage.getItem('access_token');
        console.log(voteDtoList, eventId)
        const response = await axios.post(EVENTS_PATH + "/join/" + eventId, new JoinEventDto(voteDtoList), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response;
    } catch (error) {
        console.error(error);
        return error.response.data.message;
    }
}

export default { getEvents, createEvent, joinEvent, getEventsOfCurrentUser };