import axios from "axios";

const jwtAxios = axios.create();
// Request Intercepter
// Access Token 활용하기
const beforeReq = config => {
  console.log("1. 요청 전  전달", config);
  const accessToken = sessionStorage.getItem("token");
  console.log("2. 쿠키로 토큰 가져오기 ", accessToken);
  if (!accessToken) {
    console.log("쿠키정보가 없습니다.!!!!!!!!");
    console.log("호출 중인 axios 를 중단합니다.");
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }
  console.log("3. AccessToken을 인증키에 등록하기");
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const failReq = err => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

// Response Intercepter
// 새로운 토큰을 요청하는 함수
const refereshJWT = async accessToken => {
  console.log("accessToken ==== 새로운 토큰을 요청함 : ", accessToken);
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(`/api/user/access-token`, header);
  console.log("BE 에서 새로 만들어준 토큰값", res.data);
  return res.data;
};

const beforeRes = async res => {
  console.log("1. 요청 Response 전처리", res);
  const data = res.data;
  console.log("2. Response 오기전 서버 전달해 준 데이터", data);

  // 여기서 부터 테스트 필요로 함.
  // 2조 BE 에서 어떤 error 메세지가 있다면?
  // - ERROR_ACCESS_TOKEN 확인이 필요하다.

  // if (data && data.error === "UNAUTHENTICATED") {
  if (data && data.code === 2) {
    console.log("3. 일반적인 오류가 아닌 액세스 토큰 오류다.");
    console.log("4. 액세스 토큰 오류이므로 새로운 토큰을 요청한다.");
    console.log("5. 세션에 담겨진 Refresh Token 을 읽어들인다.");
    const accessToken = sessionStorage.getItem("token");
    // const reFreshToken = getCookie("refresh-token");
    console.log("6. Refresh Token 을 이용해서 새로운 토큰을 요청한다. ");
    console.log("7. 새로운 access Token 생성 요청. ");
    // 새로운 토큰을 요청하는 함수 실행
    const result = await refereshJWT(accessToken);
    console.log("8. 새로운 토큰으로 쿠키를 업데이트한다. ", result);

    // {
    //   "code": 1,
    //   "resultMsg": "Access Token 발급",
    //   "resultData": {
    //     "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjMwMTc0NjYsImV4cCI6MTcyMzAyMTA2Niwic2lnbmVkVXNlciI6IntcInVzZXJJZFwiOjE3LFwicm9sZVwiOlwiUk9MRV9VU0VSXCJ9In0.aSgulSKI33aj3vYJ9ZqWwlzBzcmogyC2BucWkMy-p1bCAuhRSm7ry1dP_40k1GuX-y8eWil5BEbRBPGqb04lAA"
    //   }
    // }
    sessionStorage.setItem("token", result.resultData.accessToken);
    console.log(
      "9. 이전에 요청했던 axios 를 새로운 토큰을 담아서 다시 호출한다. ",
    );
  }

  return res;
};
const responseFail = async err => {
  console.log("요청 Response 에러일 때", err);
  // const accessToken = sessionStorage.getItem("token");
  // const result = await refereshJWT(accessToken);
  // sessionStorage.setItem("token", result.resultData.accessToken);

  return Promise.reject(err);
};
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
