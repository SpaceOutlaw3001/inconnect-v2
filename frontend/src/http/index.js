import axios from "axios";

/**************************************************************
 * Создание соединения на "host"
 **************************************************************/
const host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default host