import axios from "axios";

const BASE_URL = "http://192.168.160.114:5000/api";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
