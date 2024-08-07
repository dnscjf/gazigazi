import axios from "axios";

// Budget (회계 관리)
// Budget CRUD

// 월 별 회계 내역 조회
// /api/budget?budgetPartySeq=1&month=1
export const getMonthBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await axios.get(
      `/api/budget?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// 월 별 정산 내역 출력
// /api/budget/month?budgetPartySeq=1&month=1
export const getMonthCalculateBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await axios.get(
      `/api/budget/month?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// DELETE
// /api/budget
// 회계 내역 삭제
export const deleteBudget = async budgetSeq => {
  try {
    const res = await axios.delete(`/api/budget?budget_seq=${budgetSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// GET
// /api/budget/{budget_seq}
// 회계 사진 조회
export const getBudgetPhoto = async ({ budgetSeq }) => {
  try {
    const res = await axios.get(`/api/budget/${budgetSeq}`);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
// GET
// /api/budget/member
// 멤버 별 회비 입금 내역 조회
export const getMemberBudget = async ({ budgetPartySeq, month }) => {
  try {
    const res = await axios.get(
      `/api/budget/member?budgetPartySeq=${budgetPartySeq}&month=${month}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// PATCH
// /api/budget
// 회계 내역 수정
export const patchBudget = async formData => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.patch("/api/budget", formData, header);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
// POST
// /api/budget
// 회계 내역 등록
export const postBudget = async formData => {
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post("/api/budget", formData, header);
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};

// 멤버들 정보 불러오기

// 입력한 모임의 모든 멤버의 정보를 불러옵니다

export const getMember = async budgetPartySeq => {
  try {
    const res = await axios.get(
      `/api/budget/memberlist?memberPartySeq=${budgetPartySeq}`,
    );
    return res.data.resultData;
  } catch (error) {
    console.log(error);
  }
};
