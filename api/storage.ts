import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      const decoded = jwtDecode<{ image: string }>(token);
      console.log("🚀 ~ getToken ~ decoded:", decoded.image);
      return decoded;
    }
  } catch (error) {
    console.error("Error getting token:", error);
  }
};

const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("token", token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};
const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("token");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
export { deleteToken, getToken, storeToken };
