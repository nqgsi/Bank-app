import axios from "axios";
import * as SecureStore from "expo-secure-store";

const baseURL =
  "https://react-bank-project.eapi.joincoded.com/mini-project/api";
export { baseURL };

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default instance;
