import axios from "axios";

const BASE_URL = "http://192.168.160.114:5000/api";

export const testConnection = async () => {
  return await axios
    .get(`${BASE_URL}/test`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
