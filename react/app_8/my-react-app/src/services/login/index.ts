import axios from "axios";

const baseUrl = "http://localhost:3000/auth"; // app config using environment
export async function loginApi({
  userName,
  password,
}: {
  userName: string;
  password: string;
}) {
  const response = await axios.post(`${baseUrl}/login`, {
    userName,
    password,
  });
  return response.data;
}
