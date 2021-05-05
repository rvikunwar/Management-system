import axios from 'axios'

const base_url = "https://studycontent.herokuapp.com/api/"

const axiosInstance = axios.create({
    baseURL: base_url,
   
    headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${localStorage.getItem('access')}`,
        "Accept": "application/json",
        
       
    },


})

export default axiosInstance