import axios from "axios";

export default axios.create({
    baseURL:"https://e-commerce1-backend-211x.onrender.com",
    withCredentials:true,
})