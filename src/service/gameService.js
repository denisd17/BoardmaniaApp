import axios from "../axios/axios";
import { GameDto } from "../dto/GameDto";
const GAMES_PATH = "/games";


const getGames = async () => {
    const token = localStorage.getItem('access_token');
    return await axios.get(GAMES_PATH, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const getGamesForEvent = async (id) => {
    const token = localStorage.getItem('access_token');
    return await axios.get(GAMES_PATH + "/event/" + id, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
const addGame = async (name, minNumberOfPlayers, maxNumberOfPlayers, description, url) => {
    const token = localStorage.getItem('access_token');
    const registerDto = {
        name: name,
        minNumberOfPlayers: minNumberOfPlayers,
        maxNumberOfPlayers: maxNumberOfPlayers,
        description: description,
        url: url
    }
    return await axios.post(GAMES_PATH, new GameDto(registerDto),
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
}

export default { getGames, addGame, getGamesForEvent};