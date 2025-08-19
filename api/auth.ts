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
  console.log("🔄 Fetching profile...");
  const res = await instance.get("/auth/me");
  console.log("✅ Profile fetched:", res.data);

  return res.data;
};
const getUsers = async () => {
  const res = await instance.get("/auth/users");
  return res.data;
};
const trancferToUser = async () => {
  const res = await instance.put("/transactions/transfer/<username>", {});
  return res.data;
};
// const profilescreen = async () => {
//   const response = await instance.get("/auth/me");
//   await storeToken(response.data.token);
// };
export {
  fetchProfile,
  getTransaction,
  getUsers,
  ImageAndEmailInfo,
  login,
  signupscreen,
  trancferToUser,
  UserInfo,
};
