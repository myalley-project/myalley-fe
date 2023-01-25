import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePickerStyle.css";
import { ko } from "date-fns/esm/locale";
import Selectbox from "../components/atom/Selectbox";
import { exhbUploadImgApi, ExhbUploadImgRes } from "../apis/exhbAdmin";

const ExhibitionWrite = () => {
  const formData = new FormData();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [thumbnail, setThumbnail] = useState("");
  const [priceWithCommas, setPriceWithCommas] = useState("");
  const [priceFree, setPriceFree] = useState(false);
  const [disablePrice, setDisablePrice] = useState(false);
  const [detail, setDetail] = useState({
    title: "",
    type: "",
    state: "",
    date: "",
    space: "",
    fileName: "",
    adultPrice: 0,
    content: "",
    author: "",
    webLink: "",
  });

  const handleInputAndTextArea = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setDetail({
      ...detail,
      [name]: value,
    });
  };

  const handleStartDate = (date: Date) => {
    setStartDate(date);
    const startDateFormat = date.toISOString().split("T")[0];
    const endDateFormat = endDate.toISOString().split("T")[0];
    const dateFormat = `${startDateFormat}~${endDateFormat}`;
    setDetail({
      ...detail,
      date: dateFormat,
    });
  };

  const handleEndDate = (date: Date) => {
    setEndDate(date);
    const startDateFormat = startDate.toISOString().split("T")[0];
    const endDateFormat = date.toISOString().split("T")[0];
    const dateFormat = `${startDateFormat}~${endDateFormat}`;
    setDetail({
      ...detail,
      date: dateFormat,
    });
  };

  const uploadImgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files !== null) {
      setDetail({
        ...detail,
        fileName: e.target.files[0].name,
      });
      reader.onload = () => {
        if (e.target.files !== null) {
          setThumbnail(URL.createObjectURL(e.target.files[0]));
        }
      };
      reader.readAsDataURL(e.target.files[0]);

      // api 호출
      // postUploadImg(e.target.files[0]);
      formData.append("file", e.target.files[0]);
      try {
        const res: AxiosResponse<ExhbUploadImgRes> = await exhbUploadImgApi();
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 이미지 업로드 api 호출
  // const postUploadImg = async () => {}

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputPrice = e.target.value;
    const numCheck = /^[0-9,]+$/.test(inputPrice);
    const numWithCommas = inputPrice.replaceAll(",", "");

    if (!numCheck && inputPrice) return;
    if (numCheck) {
      inputPrice = numWithCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    setPriceWithCommas(inputPrice);
    setDetail({
      ...detail,
      adultPrice: Number(numWithCommas),
    });
  };

  const handlePriceFree = () => {
    setPriceFree((prev) => {
      if (!prev === true) {
        setDetail({
          ...detail,
          adultPrice: 0,
        });
        setPriceWithCommas("0");
        setDisablePrice(true);
      } else setDisablePrice(false);
      return !prev;
    });
  };

  const handleSetDetail = (
    e: React.MouseEvent<HTMLLIElement>,
    name: string
  ) => {
    if (e != undefined) {
      const { textContent } = e.currentTarget;
      setDetail({
        ...detail,
        [name]: textContent,
      });
    }
  };

  const clickSubmitBtn = () => {
    console.log(detail);
  };

  return (
    <WriteExhibitionContainer>
      <WriteExhibitionWrapper>
        <TitleWrapper>
          <InputTitle
            type="text"
            name="title"
            value={detail.title}
            onChange={(e) => handleInputAndTextArea(e)}
            placeholder="제목을 입력해주세요"
          />
        </TitleWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-type">전시타입</Label>
          <Selectbox
            placeholder="전체 전시"
            options={typeOptions}
            width="130px"
            name="type"
            onClick={handleSetDetail}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-status">관람 가능 여부</Label>
          <Selectbox
            placeholder="전체 전시"
            options={stateOptions}
            width="130px"
            name="state"
            onClick={handleSetDetail}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-date">전시 일정</Label>
          <span>시작일</span>
          <DatePicker
            locale={ko}
            className="input-date"
            dateFormat="yy - MM - dd"
            selected={startDate}
            onChange={(date: Date) => handleStartDate(date)}
          />
          <span>종료일</span>
          <DatePicker
            locale={ko}
            className="input-date"
            dateFormat="yy - MM - dd"
            selected={endDate}
            onChange={(date: Date) => handleEndDate(date)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-poster">전시 포스터 등록</Label>
          <InputFileName type="text" value={detail.fileName} disabled />
          <FileLabel htmlFor="exhibition-posterUrl">올리기</FileLabel>
          <InputFile
            type="file"
            name="fileName"
            id="exhibition-posterUrl"
            onChange={uploadImgFile}
            accept="image/jpeg,image/jpg,image/png"
          />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="thumbnail"
              style={{ maxWidth: "500px", marginTop: "10px" }}
            />
          )}
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-space">전시 장소</Label>
          <InputLink
            type="text"
            name="space"
            placeholder="내용을 입력해주세요."
            value={detail.space}
            onChange={(e) => handleInputAndTextArea(e)}
            style={{ width: "280px" }}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-adultPrice">관람료</Label>
          <div style={{ position: "relative" }}>
            <span>성인</span>
            <InputTextArea as="div">
              <InputPrice
                type="text"
                value={priceWithCommas}
                disabled={disablePrice}
                onChange={(e) => {
                  handlePrice(e);
                }}
              />
              <p>원</p>
            </InputTextArea>
            <InputCheckbox
              type="checkbox"
              checked={priceFree}
              onChange={handlePriceFree}
            />
            <span style={{ paddingLeft: "43px", fontWeight: 700 }}>
              무료 관람
            </span>
          </div>
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-content">전시내용</Label>
          <TextArea
            as="textarea"
            name="content"
            placeholder="내용을 입력해주세요."
            value={detail.content}
            onChange={(e) => handleInputAndTextArea(e)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-author">작가 정보</Label>
          <TextArea
            as="textarea"
            name="author"
            placeholder="내용을 입력해주세요."
            value={detail.author}
            onChange={(e) => handleInputAndTextArea(e)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-posterUrl">전시회 웹페이지 주소</Label>
          <InputLink
            type="text"
            name="webLink"
            placeholder="내용을 입력해주세요."
            value={detail.webLink}
            onChange={(e) => handleInputAndTextArea(e)}
            style={{ width: "100%" }}
          />
        </OptionWrapper>
      </WriteExhibitionWrapper>
      <ButtonWrapper>
        <CancelBtn>취소</CancelBtn>
        <SubmitBtn type="submit" onClick={clickSubmitBtn}>
          등록하기
        </SubmitBtn>
      </ButtonWrapper>
    </WriteExhibitionContainer>
  );
};

export default ExhibitionWrite;

const typeOptions = ["그림 전시", "조각 전시", "문학 전시", "기획 전시"];
const stateOptions = ["지난 전시", "현재 전시", "예정 전시"];

const WriteExhibitionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WriteExhibitionWrapper = styled.div`
  width: 83vw;
  max-width: 1200px;
  padding: 30px;
  margin: 50px 0 30px 0;
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
  width: 100%;
  border-radius: 0px;
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: ${(props) => props.theme.colors.greys90};
`;

const OptionWrapper = styled.div`
  margin-bottom: 30px;
  span {
    font-weight: 500;
    font-size: 14px;
    color: ${(props) => props.theme.colors.greys60};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.greys90};
`;

const Input = styled.input`
  border: 1px solid #e0e0e0;
  border-radius: 10000px;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};

  &::placeholder {
    color: ${(props) => props.theme.colors.greys60};
  }
`;

const InputFileName = styled.input`
  width: 59vw;
  max-width: 851px;
  height: 36px;
  padding: 8px 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10000px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};
  margin-right: 10px;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 8px 20px;
  height: 36px;
  background: ${(props) => props.theme.colors.primry70};
  border-radius: 10000px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #381e72;
  }
`;

const InputFile = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const InputTextArea = styled(Input)`
  display: inline-block;
  position: relative;
  width: 100px;
  margin-left: 10px;
  height: 36px;
  padding: 8px 34px 8px 20px;
  > p {
    position: absolute;
    left: 73px;
    top: 10px;
  }
`;

const InputPrice = styled.input`
  width: 55px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};
  text-align: right;
`;

const InputCheckbox = styled.input`
  appearance: none;
  position: absolute;
  top: 3px;
  left: 146px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 12L10.5 15L16.5 9' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='%239C9C9C'/%3E%3Cpath d='M7.5 12L10.5 15L16.5 9' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  }
`;

const TextArea = styled(Input)`
  width: -webkit-fill-available;
  max-width: 1140px;
  height: 300px;
  border-radius: 15px;
  padding: 20px;
  resize: none; // 사용자 임의 변경 불가
  ::-webkit-scrollbar {
    display: block;
    width: 14px;
  }
  ::-webkit-scrollbar-thumb {
    display: block;
    width: 14px;
    background-color: #d9d9d9;
    border-radius: 1000px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
  :focus-visible {
    outline: none;
  }
`;

const InputLink = styled(Input)`
  padding: 8px 20px;
  line-height: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
`;

const SubmitBtn = styled.button`
  width: 175px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.primry70};
  border-radius: 10000px;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.colors.white100};
  cursor: pointer;
  &:hover {
    background-color: #381e72;
  }
`;

const CancelBtn = styled(SubmitBtn)`
  background-color: ${(props) => props.theme.colors.white100};
  color: ${(props) => props.theme.colors.greys60};
  &:hover {
    background-color: ${(props) => props.theme.colors.greys90};
    color: ${(props) => props.theme.colors.white100};
  }
`;
