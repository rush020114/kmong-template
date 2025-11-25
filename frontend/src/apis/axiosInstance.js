import axios from "axios";

// 환경변수에서 API URL 가져오기
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// axios 대신 사용 시 해당 설정을 유지해준다.
export const axiosInstance = axios.create({
  baseURL: API_URL // 백엔드 주소
  , withCredentials: true // 필요 시 쿠키 인증도 함께 처리하기 위한 설정
  , headers: {
    "Content-Type": "application/json",
  },
}); 