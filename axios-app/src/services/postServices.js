import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

export const POST_SERVICES = {
  getAll: async () => {
    try {
      const response = await axios.get(baseURL);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  getOne: async (id) => {
    try {
      const response = await axios.get(`${baseURL}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  create: async (body) => {
    try {
      const response = await axios.post(baseURL, body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  update: async (id, body) => {
    try {
      const response = await axios.put(`${baseURL}/${id}`, body);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
  deleteOne: async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  },
};
