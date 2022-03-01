
import axios from 'axios';

const ApiInterface = axios.create({
    baseURL: "http://localhost:3000"
})


export default ApiInterface;