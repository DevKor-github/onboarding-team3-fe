import axios from "axios";
import { handleError } from "../helper/handleError";
import { UserProfileToken } from "../module/User";

const api = "http://localhost:5167/";

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${api}/login`, { username, password });
    return response.data; // JWT 토큰이 포함된 응답
};
