import axios from "../axios/axios";
import { LoginDto } from "../dto/LoginDto";
import { RegisterDto } from "../dto/RegisterDto";
const LOGIN_PATH = "/login";
const REGISTER_PATH = "/users/register";

const login = async (email, password) => {
    const loginDto = {
        email: email,
        password: password,
        grantType: "password"
    } 
    return await axios.post(LOGIN_PATH, new LoginDto(loginDto));
}
const register = async (email, password, firstname, lastname, username) => {
    const registerDto = {
        email: email,
        password: password,
        firstName: firstname,
        lastName: lastname, 
        username: username
    }
    return await axios.post(REGISTER_PATH, new RegisterDto(registerDto));
}
export default {login, register}