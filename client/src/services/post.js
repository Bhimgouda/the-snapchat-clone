import http from "./httpService"
import config from "./config.json"

const {apiUrl} = config;

const apiEndPoint = apiUrl + "/post";

export function addPost(post){
    return http.post(apiEndPoint, post)
}

