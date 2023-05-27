import axios from "../axios/axios";
const USERS_PATH = "/users"

const getUsers = async () => {
    return await axios.get(USERS_PATH);
}

export default {getUsers}