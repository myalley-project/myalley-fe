import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const AdminWriteExhibition = () => {
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files !== null) {
      setFileName(e.target.files[0].name);
      reader.onload = () => {
        if (e.target.files !== null) {
          setThumbnail(URL.createObjectURL(e.target.files[0]));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <WriteExhibitionContainer>
      <WriteExhibitionWrapper>
        <TitleWrapper>
          <InputTitle
            type="text"
            value={title}
            onChange={getTitle}
            placeholder="제목을 입력해주세요"
          />
        </TitleWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-type">전시타입</label>
          <select id="exhibition-type" name="exhibition-type">
            <option>선택</option>
            <option>선택</option>
            <option>선택</option>
          </select>
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-status">관람 가능 여부</label>
          <select id="exhibition-status" name="exhibition-status">
            <option>지난 전시</option>
            <option>현재 전시</option>
            <option>예정 전시</option>
          </select>
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-date">전시 일정</label>
          <span>시작일</span> <InputDate type="date" />
          <span>종료일</span> <InputDate type="date" />
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-poster">전시 포스터 등록</label>
          <input value={fileName} id="file-name" disabled></input>
          <label htmlFor="exhibition-posterUrl" id="file-label">
            불러오기
          </label>
          <InputFile
            type="file"
            id="exhibition-posterUrl"
            onChange={uploadImgFile}
            accept="image/jpeg,image/jpg,image/png"
          />
          {thumbnail && <img src={thumbnail} alt="thumbnail" />}
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-adultPrice">관람료</label>
          <span>성인</span> <InputText />
          <input type="checkbox" /> <span>무료관람</span>
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-content">전시내용</label>
          <TextArea placeholder="내용을 입력해주세요."></TextArea>
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-author">작가 정보</label>
          <TextArea placeholder="내용을 입력해주세요."></TextArea>
        </OptionWrapper>
        <OptionWrapper>
          <label htmlFor="exhibition-posterUrl">전시회 웹페이지 주소</label>
          <InputText
            type="text"
            placeholder="내용을 입력해주세요."
            style={{ width: "100%" }}
          />
        </OptionWrapper>
      </WriteExhibitionWrapper>
    </WriteExhibitionContainer>
  );
};

export default AdminWriteExhibition;

const WriteExhibitionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  > span {
    font-weight: 500;
    font-size: 14px;
    color: #9c9c9c;
  }
  #file-name {
    width: 851px;
    height: 36px;
    padding: 8px 20px;
    background: #fbfbfb;
    border: 1px solid #e0e0e0;
    border-radius: 10000px;
    font-weight: 400;
    font-size: 14px;
    color: #9c9c9c;
    margin-right: 10px;
  }
  #file-label {
    display: inline-block;
    padding: 8px 20px;
    width: 96px;
    height: 36px;
    background: #9c9c9c;
    border-radius: 10000px;
    color: #ffffff;
    cursor: pointer;
  }
`;

const Input = styled.input`
  background: #fbfbfb;
  border: 1px solid #e0e0e0;
  border-radius: 10000px;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
`;

const InputDate = styled.input`
  width: 130px;
  height: 36px;
  padding: 8px 10px 8px 20px;
  background: #fbfbfb;
  border: 1px solid #e0e0e0;
  border-radius: 10000px;
`;

const InputFile = styled.input`
  /* width: 851px;
  height: 36px;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c; */
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const InputText = styled.input`
  width: 100px;
  height: 36px;
  padding: 8px 20px;
  background: #fbfbfb;
  border: 1px solid #ebebeb;
  border-radius: 10000px;
  font-weight: 400;
  font-size: 14px;
  color: #9c9c9c;
`;

const TextArea = styled.textarea`
  width: 1140px;
  height: 300px;
  background: #fbfbfb;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 20px;
  resize: none; /* 사용자 임의 변경 불가 */
  :focus-visible {
    outline: none;
  }
`;
