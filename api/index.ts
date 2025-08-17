import axios from "axios";

const baseURL = "https://react-bank-project.eapi.joincoded.com/";
export { baseURL };

const instance = axios.create({
  baseURL: baseURL,
});

export default instance;
