import axios from "axios"

const instance = axios.create({
    baseUrl: 'https://reactmyburger-57b49.firebaseio.com/'
})

export default instance