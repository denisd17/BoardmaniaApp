import axios from "../axios/axios";

const REPORT_PATH = "/reports"

const sendReport = async (data) => {
    try {
        console.log(data);
        const token = localStorage.getItem('access_token');
        const response = await axios.post(REPORT_PATH, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
       console.log(error);
    }
}


export default { sendReport };