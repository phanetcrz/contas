import axios from "axios";

const api = axios.create({
    //   baseURL: "https://contas-git-master-phanets-projects.vercel.app"
    baseURL: "http://192.168.1.14:3002"
});

export default api;