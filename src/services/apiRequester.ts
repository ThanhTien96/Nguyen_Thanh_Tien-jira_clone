import axios from "axios";

// request severvices
const requester = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers:{
        TokenCybersoft: process.env.REACT_APP_API_TOKEN,
    },
});

// interceptor them access authoriztion token
requester.interceptors.request.use((req:any) => {
    req.headers = {
        ...req.headers,
        Authorization: "Bearer " + localStorage.getItem('Token'),
    };
    return req;
});

export default requester;