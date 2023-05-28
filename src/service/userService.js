import axios from "../axios/axios";
const USERS_PATH = "/users"
let counter = 0;

const getUsers = async () => {
    return await axios.get(USERS_PATH);
}

const getCurrentUserInfo = async () => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(USERS_PATH + "/current-user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if(counter < 5) {
            counter ++;
            console.log("Retrying...")
            setTimeout(getCurrentUserInfo, 500);
        }
    }
}

export default {getUsers, getCurrentUserInfo};