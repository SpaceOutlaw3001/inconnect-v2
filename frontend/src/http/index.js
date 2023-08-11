import axios from "axios";

/**************************************************************
 * Создание соединения на "host"
 **************************************************************/
const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000
})

export default host