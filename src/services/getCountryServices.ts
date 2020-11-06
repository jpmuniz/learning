import axios from 'axios'


const apiGetCoutries = axios.create({
    baseURL: 'https://countries-274616.ew.r.appspot.com/'
})


export default apiGetCoutries