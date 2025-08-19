import instance from ".";
import { storeToken } from "./storage";

interface UserInfo {
  username: string;
  password: string;
}
interface ImageAndEmailInfo extends UserInfo {
  image: string;
}
const login = async (userInfo: UserInfo) => {
  const response = await instance.post("/auth/login", userInfo);
  await storeToken(response.data.token);

  console.log("🚀 ~ login ~ response:", response.data.token);

  return response.data;
};

const signupscreen = async (userInfo: FormData) => {
  const response = await instance.post("/auth/register", userInfo);
  await storeToken(response.data.token);

  console.log("🚀 ~ signup ~ response:", response.data.token);
  return response.data;
};
const getTransaction = async () => {
  const res = await instance.get("/transactions/my");
  return res.data;
};
const fetchProfile = async () => {
  const res = await instance.get("/auth/me");
  return res.data;
};
// const profilescreen = async () => {
//   const response = await instance.get("/auth/me");
//   await storeToken(response.data.token);
// };
export {
  fetchProfile,
  getTransaction,
  ImageAndEmailInfo,
  login,
  signupscreen,
  UserInfo,
};
