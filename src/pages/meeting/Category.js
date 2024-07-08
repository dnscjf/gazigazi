import styled from "@emotion/styled";
const CateInnerStyle = styled.div`
  width: calc(100% - 720px);
  max-width: 1200px;
  /* maxwidth: */
  margin: 0 auto;
  height: auto;
  margin-top: 25px;
  .category-category {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    .category-item {
      border: 1px solid #000;
      padding: 12px;
      border-radius: 25px;
      box-shadow: 1px 3px 2px 0px rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .category-search-div {
    display: flex;
    justify-content: end;
    margin-bottom: 40px;
  }
  .category-search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 25px;
    border: 1px solid #000;
  }
  .category-search-input {
    border: none;
  }
`;
const Category = () => {
  return (
    <CateInnerStyle>
      <div>
        <div className="category-category">
          <div className="category-item">전체보기</div>
          <div className="category-item">스포츠</div>
          <div className="category-item">게임</div>
          <div className="category-item">맛집</div>
          <div className="category-item">패션</div>
          <div className="category-item">스터디</div>
          <div className="category-item">문화•예술</div>
          <div className="category-item">Bar</div>
          <div className="category-item">기타</div>
        </div>
        <div className="category-search-div">
          <div className="category-search">
            <input
              type="text"
              placeholder="검색어를 입력하세요."
              className="category-search-input"
            ></input>
          </div>
        </div>
      </div>
      <div className="mm-meeting-list">
        <div className="list-box">
          <div className="list-box-img"></div>
          <div className="list-box-title">
            <span>OOO 모임장</span>
          </div>
          <h3 className="list-box-text">
            여전히 일드를 보는 사람들 - 일본문화를 좋아하는 나는 어떤 사람?
            (with 제이팝) 🙌
          </h3>
          <p className="list-box-place">일본 디즈니랜드</p>
          <span className="list-box-day">2024.02.08까지</span>
        </div>
        <div className="list-box"></div>
        <div className="list-box"></div>
        <div className="list-box"></div>
        <div className="list-box"></div>
        <div className="list-box"></div>
      </div>
    </CateInnerStyle>
  );
};

export default Category;
