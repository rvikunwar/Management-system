import axios from 'axios'

const base_url = "http://localhost:8000/api/"

const axiosInstance = axios.create({
    baseURL: base_url,
   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem('access')}`,
        "Accept": "application/json",
        
       
    },


})

export default axiosInstance