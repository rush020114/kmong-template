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

// ✅ 요청 인터셉터: FormData 자동 감지
axiosInstance.interceptors.request.use(
    (config) => {
        // FormData면 Content-Type 자동 변경
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);