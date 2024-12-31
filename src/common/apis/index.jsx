import axios from "axios";
import config from "../config";

const formatSuccess = (res) => {
    return res.data;
};
const baseUrl = config.baseUrl;

const formatResponse = (data) => {
    return new Promise((resolve, reject) => {
        data
            .then((res) => resolve(formatSuccess(res)))
            .catch((err) => reject(err));
    });
};

export const getApi = (url, params = "") => {
    // const headers = getHeaders();
    const axiosCall = axios.get(baseUrl + url + params);
    return formatResponse(axiosCall);
};

export const postApi = (url, json) => {
    // const headers = getHeaders();
    const axiosCall = axios.post(baseUrl + url, json);
    return formatResponse(axiosCall);
};

export const putApi = (url, json ) => {
    // const headers = getHeaders();
    const axiosCall = axios.put(baseUrl + url, json);
    return formatResponse(axiosCall);
};

export const deleteApi = (url) => {
    // const headers = getHeaders();
    const axiosCall = axios.delete(baseUrl + url);
    return formatResponse(axiosCall);
};