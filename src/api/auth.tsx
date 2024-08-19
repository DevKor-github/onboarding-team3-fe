import axios from "axios";

const api = "http://localhost:8080/api/auth";

export const login = async (username: string, password: string) => {
    const response = await axios.post(`${api}/login`, { username, password });
    return response.data; // JWT 토큰이 포함된 응답
};

export const join = async (username: string, password: string) => {
    const response = await axios.post(`${api}/join`, { username, password });
    return response.data; // 회원가입 후 서버에서 반환된 응답
};