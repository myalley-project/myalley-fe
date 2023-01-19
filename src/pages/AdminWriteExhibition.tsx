import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePickerStyle.css";
import { ko } from "date-fns/esm/locale";

const AdminWriteExhibition = () => {
  const [detail, setDetail] = useState({
    title: "",
    date: "",
    fileName: "",
    adultPrice: 0,
    content: "",
    author: "",
    webLink: "",
  });
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [thumbnail, setThumbnail] = useState("");
  const [priceWithCommas, setPriceWithCommas] = useState("");
  const [priceFree, setPriceFree] = useState(false);
  const [disablePrice, setDisablePrice] = useState(false);

  const getTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail({
      ...detail,
      title: e.target.value,
    });
  };

  const getStartDate = (date: Date) => {
    setStartDate(date);
    const startDateFormat = date.toISOString().split("T")[0];
    const endDateFormat = endDate.toISOString().split("T")[0];
    const dateFormat = `${startDateFormat}~${endDateFormat}`;
    setDetail({
      ...detail,
      date: dateFormat,
    });
  };

  const getEndDate = (date: Date) => {
    setEndDate(date);
    const startDateFormat = startDate.toISOString().split("T")[0];
    const endDateFormat = date.toISOString().split("T")[0];
    const dateFormat = `${startDateFormat}~${endDateFormat}`;
    setDetail({
      ...detail,
      date: dateFormat,
    });
  };

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    }
  };

  const getPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const HandlePriceFree = () => {
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

  const getContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail({
      ...detail,
      content: e.target.value,
    });
  };

  const getAuthor = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail({
      ...detail,
      author: e.target.value,
    });
  };

  const getWebLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetail({
      ...detail,
      webLink: e.target.value,
    });
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
            value={detail.title}
            onChange={getTitle}
            placeholder="제목을 입력해주세요"
          />
        </TitleWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-type">전시타입</Label>
          <Select id="exhibition-type" name="exhibition-type">
            <option>선택</option>
            <option>선택</option>
            <option>선택</option>
          </Select>
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-status">관람 가능 여부</Label>
          <Select id="exhibition-status" name="exhibition-status">
            <option>지난 전시</option>
            <option>현재 전시</option>
            <option>예정 전시</option>
          </Select>
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-date">전시 일정</Label>
          <span>시작일</span>
          <DatePicker
            locale={ko}
            className="input-date"
            dateFormat="yy - MM - dd"
            selected={startDate}
            onChange={(date: Date) => getStartDate(date)}
          />
          <span>종료일</span>
          <DatePicker
            locale={ko}
            className="input-date"
            dateFormat="yy - MM - dd"
            selected={endDate}
            onChange={(date: Date) => getEndDate(date)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-poster">전시 포스터 등록</Label>
          <InputFileName type="text" value={detail.fileName} disabled />
          <FileLabel htmlFor="exhibition-posterUrl">불러오기</FileLabel>
          <InputFile
            type="file"
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
            placeholder="내용을 입력해주세요."
            value={detail.webLink}
            onChange={getWebLink}
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
                  getPrice(e);
                }}
              />
              <p>원</p>
            </InputTextArea>
            <InputCheckbox
              type="checkbox"
              checked={priceFree}
              onChange={HandlePriceFree}
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
            placeholder="내용을 입력해주세요."
            value={detail.content}
            onChange={getContent}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-author">작가 정보</Label>
          <TextArea
            as="textarea"
            placeholder="내용을 입력해주세요."
            value={detail.author}
            onChange={getAuthor}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-posterUrl">전시회 웹페이지 주소</Label>
          <InputLink
            type="text"
            placeholder="내용을 입력해주세요."
            value={detail.webLink}
            onChange={getWebLink}
            style={{ width: "100%" }}
          />
        </OptionWrapper>
      </WriteExhibitionWrapper>
      <ButtonWrapper>
        <SubmitBtn>취소</SubmitBtn>
        <SubmitBtn type="submit" onClick={clickSubmitBtn}>
          등록하기
        </SubmitBtn>
      </ButtonWrapper>
    </WriteExhibitionContainer>
  );
};

export default AdminWriteExhibition;

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
  color: ${(props) => props.theme.colors.greys60};
`;

const Input = styled.input`
  background: #fbfbfb;
  border: 1px solid #e0e0e0;
  border-radius: 10000px;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};

  &::placeholder {
    color: ${(props) => props.theme.colors.greys60};
  }
`;

const Select = styled.select`
  width: 250px;
  height: 36px;
  padding: 8px 10px 8px 20px;
  background-color: #fbfbfb;
  border: 1px solid #e0e0e0;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%239C9C9C'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position-x: 218px;
  background-position-y: 13px;
  border-radius: 10000px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};
  appearance: none;
  cursor: pointer;
  &:focus-visible {
    outline: none;
  }
`;

const InputFileName = styled.input`
  width: 59vw;
  max-width: 851px;
  height: 36px;
  padding: 8px 20px;
  background: #fbfbfb;
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
  width: 96px;
  height: 36px;
  background: ${(props) => props.theme.colors.primry70};
  border-radius: 10000px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
  cursor: pointer;
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
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='%239C9C9C' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M7.5 12L10.5 15L16.5 9' stroke='%239C9C9C' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23333333'/%3E%3Cpath d='M7.5 12L10.5 15L16.5 9' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
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
  color: #ffffff;
  cursor: pointer;
`;
