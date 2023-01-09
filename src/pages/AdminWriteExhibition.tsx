import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const AdminWriteExhibition = () => {
  const [title, setTitle] = useState("제목을 입력해주세요");
  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  return (
    <WriteExhibitionContainer>
      <WriteExhibitionWrapper>
        <TitleWrapper>
          <InputTitle type="text" value={title} onChange={getTitle} />
        </TitleWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-type">전시타입</label>
          <select id="exhibition-type" name="exhibition-type">
            <option>선택</option>
            <option>선택</option>
            <option>선택</option>
          </select>
        </OptionWrapper>
      </WriteExhibitionWrapper>
    </WriteExhibitionContainer>
  );
};

export default AdminWriteExhibition;

const WriteExhibitionContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 1860px;
`;

const WriteExhibitionWrapper = styled.div`
  width: 1200px;
  height: 1720px;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
`;

const TitleWrapper = styled.div`
  height: 66px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e0e0e0;
  border-radius: 0px;
`;

const InputTitle = styled.input`
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: ${(props) => props.theme.colors.txt};
`;

const OptionWrapper = styled.div`
  margin-bottom: 30px;
  > label {
    display: block;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    color: #9c9c9c;
  }
  > select {
    width: 250px;
    height: 36px;
    padding: 8px 10px 8px 20px;
    background-color: #fbfbfb;
    border: 1px solid #e0e0e0;
    border-radius: 10000px;
    font-weight: 400;
    font-size: 14px;
    color: #9c9c9c;
    cursor: pointer;
    &:focus-visible {
      outline: none;
    }
  }
`;
