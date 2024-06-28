import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? 'http://192.168.1.14:3002'
});


//const BASE_URL = 'https://contas-git-master-phanets-projects.vercel.app';


export default api;