import axios from "axios";
import { BASE_URL, } from "../app-config/index";

const token = localStorage.getItem("jwtToken");
const requestObj = axios.create({
  baseURL: `${BASE_URL}/`,
  responseType: "json",
  // timeout: 5000,
  headers: Object.assign({
    "content-Type": "application/json",
    "accept": "application/json",
    Authorization: `Bearer ${token}`,
  }),
});


export function postApiCall(apiName: string, parameters: any) {
  return requestObj
    .post(`${apiName}`, parameters)
    .then((res: any) => {
      // if (apiName === loginUrl && res.data.Status) {
      //  requestObj.defaults.headers.Authorization =
      //   "Bearer " + res.data.Data.JwtToken;
      //  requestObjForImageUpload.defaults.headers.Authorization =
      //   "Bearer " + res.data.Data.JwtToken;
      // }
      return res.data;
    })
    .catch((error: any) => {
      if (error && error.toString().includes("401")) {
        localStorage.clear();
        window.location.href = "/login";
        return true;
      }
      return error;
    });
}

export function getApiCall(apiName: string, parameters: string) {
  return requestObj
    .get(`${apiName}?${parameters}`)
    .then((res: any) => {
      return res.data;
    })
    .catch((error: any) => {
      if (error && error.toString().includes("401")) {
        localStorage.clear();
        window.location.href = "/login";
        return true;
      }
      return error;
    });
}



export function putApiCall(apiName: string, parameters: any) {
  return requestObj
    .put(`${apiName}`, parameters)
    .then((res: any) => {
      // if (apiName === loginUrl && res.data.Status) {
      //  requestObj.defaults.headers.Authorization =
      //   "Bearer " + res.data.Data.JwtToken;
      //  requestObjForImageUpload.defaults.headers.Authorization =
      //   "Bearer " + res.data.Data.JwtToken;
      // }
      return res.data;
    })
    .catch((error: any) => {
      if (error && error.toString().includes("401")) {
        localStorage.clear();
        window.location.href = "/login";
        return true;
      }
      return error;
    });
}

export function deleteApiCall(apiName: string, parameters: any) {
  return requestObj
    .delete(`${apiName}`, parameters)
    .then((res: any) => {
      // if (apiName === loginUrl && res.data.Status) {
      //  requestObj.defaults.headers.Authorization =
      //   "Bearer " + res.data.Data.JwtToken;
      //  requestObjForImageUpload.defaults.headers.Authorization =
      //   "Bearer " + res.data.Data.JwtToken;
      // }
      return res.data;
    })
    .catch((error: any) => {
      if (error && error.toString().includes("401")) {
        localStorage.clear();
        window.location.href = "/login";
        return true;
      }
      return error;
    });
}




