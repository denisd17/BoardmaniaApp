import axios from "../axios/axios";
import { createEventDto } from "../dto/CreateEventDto";
import { JoinEventDto } from "../dto/JoinEventDto";
const EVENTS_PATH = "/events"
let counter = 0;

const getEventsPage = async (pageNumber, pageSize, filters) => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post(EVENTS_PATH + "/page", filters, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                pageNumber,
                pageSize
            }
        });
        return response;
    } catch (error) {
        if(counter < 5) {
            counter ++;
            console.log("Retrying...")
            setTimeout(getEventsPage, 500);
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
            setTimeout(getEventsOfCurrentUser, 500);
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

const getParticipants = async (id) => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(EVENTS_PATH + "/participants/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if(counter < 5) {
            counter ++;
            console.log("Retrying...")
            setTimeout(getParticipants, 500);
        }
    }
}

const getJoinedEvents = async () => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(EVENTS_PATH + "/participant", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if(counter < 5) {
            counter ++;
            console.log("Retrying...")
            setTimeout(getJoinedEvents, 500);
        }
    }
} 

const sendParticipantsData = async (data) => {
    try {
        console.log(data);
        const token = localStorage.getItem('access_token');
        const response = await axios.post(EVENTS_PATH + "/initiator-report", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
       console.log(error);
    }
}
 
export default { getEventsPage, createEvent, joinEvent, getEventsOfCurrentUser, getParticipants, getJoinedEvents, sendParticipantsData };