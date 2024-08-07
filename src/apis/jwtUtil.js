import axios from "axios";
import { getCookie } from "../utils/cookie";

// axios 인스턴스 생성
const jwtAxios = axios.create();

// 요청 전 처리 함수
const beforeReq = config => {
  console.log("요청 전 호출한 모든 내용 전달", config);
  // const accessToken = getCookie("accessToken");
  const accessToken = sessionStorage.getItem("token");
  console.log("쿠키로 토큰 가져오기 ", accessToken);

  if (!accessToken) {
    console.log("쿠키정보가 없습니다.!!!!!!");
    return Promise.reject({
      response: { data: { error: "Login하셔서 인증받으세요." } },
    });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// 요청 실패 처리 함수
const failReq = err => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};

// axios의 interceptor 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

// jwtAxios를 export
export default jwtAxios;