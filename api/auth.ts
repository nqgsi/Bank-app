import instance from ".";

interface UserInfo {
  username: string;
  password: string;
}
interface Imageinfo extends UserInfo {
  image: string;
}
const login = async (userInfo: UserInfo) => {
  const response = await instance.post("/auth/login", userInfo);
  return response.data;
};

const signupcreen = async (userInfo: Imageinfo) => {
  const response = await instance.post("/auth/register", userInfo);
  console.log("🚀 ~ signup ~ response:", response.data);
  return response.data;
};

export { Imageinfo, login, signupcreen, UserInfo };
