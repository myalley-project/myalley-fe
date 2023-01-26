import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePickerStyle.css";
import { ko } from "date-fns/esm/locale";
import { useLocation, useNavigate } from "react-router-dom";
import useRefreshTokenApi from "../apis/useRefreshToken";
import Selectbox from "../components/atom/Selectbox";
import {
  exhbCreateApi,
  ExhbCreateRes,
  ExhbCreateType,
  exhbUploadImgApi,
  ExhbUploadImgRes,
} from "../apis/exhbAdmin";
import isApiError from "../utils/isApiError";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import getExhbTypeArray from "../utils/exhbTypeSelector";
import { exhbApi, exhbUpdateApi, ExhibitionRes } from "../apis/exhibition";

interface ModeType {
  mode: string;
}

const ExhibitionWrite = (props: ModeType) => {
  const formData = new FormData();
  const navigate = useNavigate();
  const refreshTokenApi = useRefreshTokenApi();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [thumbnail, setThumbnail] = useState("");
  const [priceWithCommas, setPriceWithCommas] = useState("");
  const [priceFree, setPriceFree] = useState(false);
  const [disablePrice, setDisablePrice] = useState(false);
  const [detail, setDetail] = useState<ExhbCreateType>({
    title: "",
    status: "",
    type: "",
    space: "",
    adultPrice: 0,
    duration: "",
    fileName: "",
    posterUrl: "",
    content: "",
    author: "",
    webLink: "",
  });
  const [editDetail, setEditDetail] = useState<ExhibitionRes>();
  const location = useLocation();
  const id = Number(location.pathname.split("/")[2]);
  const { mode } = props;
  const [placeholderText, setplaceholderText] = useState({
    type: "전체 전시",
  });

  const getEditExhb = useCallback(async () => {
    if (mode === "edit") {
      const res: AxiosResponse<ExhibitionRes> = await exhbApi(id);
      const { data } = res;
      console.log(data);
      setEditDetail(data);
    }
  }, [id, mode]);

  useEffect(() => {
    getEditExhb();
  }, [getEditExhb]);

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
    const dateFormat = `${startDateFormat} ~ ${endDateFormat}`;
    setDetail({
      ...detail,
      duration: dateFormat,
    });
  };

  const handleEndDate = (date: Date) => {
    setEndDate(date);
    const startDateFormat = startDate.toISOString().split("T")[0];
    const endDateFormat = date.toISOString().split("T")[0];
    const dateFormat = `${startDateFormat} ~ ${endDateFormat}`;
    setDetail({
      ...detail,
      duration: dateFormat,
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
      formData.append("file", e.target.files[0]);
      // api 호출
      postUploadImg(formData);
    }
  };

  // 이미지 업로드 api 호출
  const postUploadImg = async (imgfile: FormData) => {
    try {
      const res: AxiosResponse<ExhbUploadImgRes> = await exhbUploadImgApi(
        imgfile
      );
      const { data } = res;
      setDetail({
        ...detail,
        fileName: data.filename,
        posterUrl: data.s3Url,
      });
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") refreshTokenApi(); // 토큰 필요한 요청에서는 필수
    }
  };

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
    if (e !== undefined) {
      const { textContent } = e.currentTarget;
      setDetail({
        ...detail,
        [name]: textContent,
      });
    }
  };

  // 등록 api 호출
  const clickSubmitBtn = async () => {
    if (detail.title === "") {
      alert("제목을 입력해주세요.");
    } else if (detail.type === "") {
      alert("전시 타입을 선택해주세요.");
    } else if (detail.status === "") {
      alert("전시 관람여부를 선택해주세요.");
    } else if (detail.duration === "") {
      alert("전시 일정을 선택해주세요.");
    } else if (thumbnail === "") {
      alert("전시 포스터를 등록해주세요.");
    } else if (detail.space === "") {
      alert("전시 장소를 입력해주세요.");
    } else if (detail.content === "") {
      alert("전시 내용을 작성해주세요.");
    } else if (detail.author === "") {
      alert("작가정보를 작성해주세요.");
    } else if (detail.webLink === "") {
      alert("전시회 웹페이지 주소를 작성해주세요.");
    } else
      try {
        const res: AxiosResponse<ExhbCreateRes> = await exhbCreateApi(detail);
        if (res.status === 200) {
          alert("전시글 등록이 완료되었습니다. 메인 페이지로 돌아갑니다.");
          navigate("/");
        }
      } catch (err) {
        const errorRes = isApiError(err);
        // if (errorRes === "accessToken 만료") refreshTokenApi();
      }
  };

  // 수정 api 호출
  const clickEditBtn = async () => {
    try {
      const reqbody = {
        title: editDetail?.title,
        status: editDetail?.status,
        type: editDetail?.type,
        space: editDetail?.space,
        adultPrice: editDetail?.adultPrice,
        // fileName: editDetail?.
        posterUrl: editDetail?.posterUrl,
        date: editDetail?.duration,
        webLink: editDetail?.webLink,
        content: editDetail?.content,
        author: editDetail?.author,
      };
      console.log(detail);
      const res = await exhbUpdateApi(id, reqbody);
      console.log(res);
      alert("수정이 완료되었습니다.");
      navigate(`/exhibition/${id}`);
    } catch (err) {
      isApiError(err);
    }
  };

  return (
    <WriteExhibitionContainer>
      <WriteExhibitionWrapper>
        <TitleWrapper>
          <InputTitle
            type="text"
            name="title"
            value={mode === "edit" ? editDetail?.title ?? "" : detail.title}
            onChange={(e) => handleInputAndTextArea(e)}
            placeholder="제목을 입력해주세요"
          />
        </TitleWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-type">전시타입</Label>
          <Selectbox
            placeholder={placeholderText.type}
            options={getExhbTypeArray()}
            width="130px"
            name="type"
            onClick={handleSetDetail}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-status">관람 가능 여부</Label>
          <Selectbox
            placeholder="전체 전시"
            options={["지난 전시", "현재 전시", "예정 전시"]}
            width="130px"
            name="status"
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
            value={mode === "edit" ? editDetail?.space ?? "" : detail.space}
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
            <CheckLabelArea>
              <CheckLabel label="무료 관람" onClick={handlePriceFree} />
            </CheckLabelArea>
          </div>
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-content">전시내용</Label>
          <TextArea
            as="textarea"
            name="content"
            placeholder="내용을 입력해주세요."
            value={mode === "edit" ? editDetail?.content ?? "" : detail.content}
            onChange={(e) => handleInputAndTextArea(e)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-author">작가 정보</Label>
          <TextArea
            as="textarea"
            name="author"
            placeholder="내용을 입력해주세요."
            value={mode === "edit" ? editDetail?.author ?? "" : detail.author}
            onChange={(e) => handleInputAndTextArea(e)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-posterUrl">전시회 웹페이지 주소</Label>
          <InputLink
            type="text"
            name="webLink"
            placeholder="내용을 입력해주세요."
            value={mode === "edit" ? editDetail?.webLink ?? "" : detail.webLink}
            onChange={(e) => handleInputAndTextArea(e)}
            style={{ width: "100%" }}
          />
        </OptionWrapper>
      </WriteExhibitionWrapper>
      <ButtonWrapper>
        <SubmitBtn
          variant="primary"
          size="large"
          type="button"
          onClick={() => navigate("/")}
        >
          취소
        </SubmitBtn>
        {mode === "edit" ? (
          <SubmitBtn
            variant="primary"
            size="large"
            type="button"
            onClick={clickEditBtn}
          >
            수정하기
          </SubmitBtn>
        ) : (
          <SubmitBtn
            variant="primary"
            size="large"
            type="button"
            onClick={clickSubmitBtn}
          >
            등록하기
          </SubmitBtn>
        )}
      </ButtonWrapper>
    </WriteExhibitionContainer>
  );
};

export default ExhibitionWrite;

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
  height: 17px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};
  text-align: right;
`;

const CheckLabelArea = styled.div`
  display: inline-block;
  position: absolute;
  top: 5px;
  margin-left: 20px;
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

const SubmitBtn = styled(Button)`
  width: 153px;
`;
