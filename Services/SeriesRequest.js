import axios from "axios"
import { API_AUTH } from "./AuthCode"

function getSeries(){
    return axios.get("https://api.themoviedb.org/3/tv/popular?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data)
}

export default {
    getSeries
}