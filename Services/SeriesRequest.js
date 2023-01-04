import axios from "axios"
import { API_AUTH } from "./AuthCode"

function getSeries(){
    return axios.get("https://api.themoviedb.org/3/tv/popular?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data)
}

function getTopRatedSeries(){
    return axios.get("https://api.themoviedb.org/3/tv/top_rated?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data)
}

function getOnAirSeries(){
    return axios.get("https://api.themoviedb.org/3/tv/on_the_air?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data)
}

function getSerie(id){
    return axios.get("https://api.themoviedb.org/3/tv/"+id+"?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data)
}

function getCredits(id){
    return axios.get("https://api.themoviedb.org/3/tv/"+id+"/credits?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data.cast)
}

function getSimilar(id){
    return axios.get("https://api.themoviedb.org/3/tv/"+id+"/similar?api_key="+API_AUTH+"&language=fr-FR").then(response=>response.data.results)
}

export default {
    getSeries,
    getSerie,
    getCredits,
    getSimilar,
    getOnAirSeries,
    getTopRatedSeries
}