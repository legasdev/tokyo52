import Axios from 'axios';

const Instance = Axios.create({
    baseURL: '/api',
    withCredentials: false,
});

export default Instance;