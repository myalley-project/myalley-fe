import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { AxiosResponse } from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/datePickerStyle.css";
import { ko } from "date-fns/esm/locale";
import { useLocation, useNavigate } from "react-router-dom";
import Selectbox from "../components/atom/Selectbox";
import Button from "../components/atom/Button";
import CheckLabel from "../components/atom/CheckLabel";
import getExhbTypeArray from "../utils/exhbTypeSelector";
import {
  exhbApi,
  exhbCreateApi,
  exhbUploadImgApi,
  exhbUpdateApi,
  ExhibitionRes,
  ExhbCreateRes,
  ExhbUploadImgRes,
} from "../apis/exhibition";
import isApiError from "../utils/isApiError";
import useRefreshTokenApi from "../apis/useRefreshToken";
import { theme } from "../styles/theme";
import SimpleDialog from "../components/SimpleDialog";
import Modal from "../Modal";

interface ModeType {
  mode: string;
}

const ExhibitionWrite = (props: ModeType) => {
  const formData = new FormData();
  const navigate = useNavigate();
  const location = useLocation();
  const refreshTokenApi = useRefreshTokenApi();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [thumbnail, setThumbnail] = useState("");
  const [userUploadImgFile, setUserUploadImgFile] = useState<File>();
  const [priceWithCommas, setPriceWithCommas] = useState("");
  const [priceFree, setPriceFree] = useState(false);
  const [isPriceZero, setIsPriceZero] = useState(false);
  const [isPriceOne, setIsPriceOne] = useState(false);
  const [disablePrice, setDisablePrice] = useState(false);
  const [exhbId, setExhbId] = useState(0);
  const [detail, setDetail] = useState<ExhbCreateRes>({
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
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const id = Number(location.pathname.split("/")[2]);
  const { mode } = props;

  // ??????????????????
  const getEditExhb = useCallback(async () => {
    if (mode === "edit") {
      const res: AxiosResponse<ExhibitionRes> = await exhbApi(id);
      const { data } = res;
      setExhbId(data.id);
      setDetail(data);
      setPriceWithCommas(data.adultPrice.toString());
      setThumbnail(data.posterUrl);
    }
  }, [id, mode]);

  useEffect(() => {
    getEditExhb();
    if (localStorage.getItem("authority") === "ROLE_USER") {
      alert("???????????? ?????? ????????? ??????????????????.");
      navigate("/");
    }
  }, [getEditExhb, navigate]);

  // ?????? ????????? ????????? ??????
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

  // ?????? ?????? ??????
  const handleStartDate = (date: Date) => {
    setStartDate(date);
    const startDateFormat = date.toLocaleDateString("sv-SE");
    const endDateFormat = startDateFormat;
    const dateFormat = `${startDateFormat} ~ ${endDateFormat}`;
    setDetail({
      ...detail,
      duration: dateFormat,
    });
  };

  // ?????? ?????? ??????
  const handleEndDate = (date: Date) => {
    setEndDate(date);
    const startDateFormat = startDate.toLocaleDateString("sv-SE");
    const endDateFormat = date.toLocaleDateString("sv-SE");
    const dateFormat = `${startDateFormat} ~ ${endDateFormat}`;
    setDetail({
      ...detail,
      duration: dateFormat,
    });
  };

  // ????????? ????????? ????????? ??????
  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = e.target.files;
    if (file !== null) {
      setUserUploadImgFile(file[0]);
      setDetail({
        ...detail,
        fileName: file[0].name,
      });
      reader.onload = () => {
        if (file !== null) {
          setThumbnail(URL.createObjectURL(file[0]));
        }
      };
      reader.readAsDataURL(file[0]);
      formData.append("file", file[0]);
    }
  };

  // ????????? ????????? api ??????
  const postUploadImg = async (imgfile: FormData) => {
    if (!userUploadImgFile) {
      const imgData = { filename: detail.fileName, s3Url: detail.posterUrl };
      updateExhb(imgData);
    } else
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
        switch (mode) {
          case "create":
            postExhb(data);
            break;
          case "edit":
            updateExhb(data);
            break;
          default:
            postExhb(data);
            break;
        }
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken ??????") {
          await refreshTokenApi();
          const reRes = await exhbUploadImgApi(imgfile);
          const { data } = reRes;
          setDetail({
            ...detail,
            fileName: data.filename,
            posterUrl: data.s3Url,
          });
        }
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

  const handlePriceFree = (price: string) => {
    if (price === "0") {
      setPriceWithCommas(price);
      setIsPriceZero(true);
      setIsPriceOne(false);
    } else if (price === "1") {
      setPriceWithCommas(price);
      setIsPriceZero(false);
      setIsPriceOne(true);
    }
    setPriceFree((prev) => {
      if (!prev === true) {
        setDetail({
          ...detail,
          adultPrice: Number(price),
        });
        setPriceWithCommas(price);
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

  // ?????? api ??????
  const postExhb = async (imgData: ExhbUploadImgRes) => {
    try {
      const res: AxiosResponse<ExhbCreateRes> = await exhbCreateApi({
        ...detail,
        fileName: imgData.filename,
        posterUrl: imgData.s3Url,
      });
      if (res.status === 200) {
        alert("????????? ????????? ?????????????????????.");
        navigate("/exhibition-list");
      }
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken ??????") {
        await refreshTokenApi();
        const reRes = await exhbCreateApi(detail);
        if (reRes.status === 200) {
          alert("????????? ????????? ?????????????????????.");
          navigate("/exhibition-list");
        }
      }
      if (typeof errorRes !== "object") return;
      const { errorCode } = errorRes;
      if (errorCode === 400) {
        alert("????????? ?????? ??????????????????");
      }
    }
  };

  // ?????? api ??????
  const updateExhb = async (imgData: ExhbUploadImgRes) => {
    try {
      const res: AxiosResponse<string> = await exhbUpdateApi(id, {
        ...detail,
        fileName: imgData.filename,
        posterUrl: imgData.s3Url,
      });
      const { data } = res;
      if (data === "????????? ?????? ????????? ?????????????????????.") {
        alert("????????? ?????????????????????.");
        navigate(`/exhibition/${id}`);
      } else alert("????????? ?????? ???????????????. ??????????????? ???????????????.");
    } catch (err) {
      const errorRes = isApiError(err);
      if (errorRes === "accessToken ??????") {
        await refreshTokenApi();
        const reRes = await exhbUpdateApi(id, detail);
        if (reRes.status === 200) {
          alert("????????? ????????? ?????????????????????. ?????? ???????????? ???????????????.");
          navigate("/");
        }
      }
      if (typeof errorRes !== "object") return;
      const { errorCode } = errorRes;
      if (errorCode === 400) {
        alert("????????? ?????? ??????????????????");
      }
    }
  };

  // ???????????? ?????? ?????? ??????
  const clickSubmitBtn = async () => {
    const regDetail = /^https:\/\//;
    if (detail.title === "") {
      alert("????????? ??????????????????.");
    } else if (detail.type === "") {
      alert("?????? ????????? ??????????????????.");
    } else if (detail.status === "") {
      alert("?????? ??????????????? ??????????????????.");
    } else if (detail.duration === "") {
      alert("?????? ????????? ??????????????????.");
    } else if (thumbnail === "") {
      alert("?????? ???????????? ??????????????????.");
    } else if (detail.space === "") {
      alert("?????? ????????? ??????????????????.");
    } else if (detail.content === "") {
      alert("?????? ????????? ??????????????????.");
    } else if (detail.author === "") {
      alert("??????????????? ??????????????????.");
    } else if (detail.webLink === "") {
      alert("????????? ???????????? ????????? ??????????????????.");
    } else if (!regDetail.test(detail.webLink)) {
      alert("???????????? ????????? 'https://'??? ?????????????????????.");
    } else formData.append("file", userUploadImgFile!);
    // ????????? ?????? ?????? ??????
    await postUploadImg(formData);
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
            placeholder="????????? ??????????????????"
          />
        </TitleWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-type">?????? ??????</Label>
          <Selectbox
            placeholder={detail.type === "" ? "????????????" : detail.type}
            options={getExhbTypeArray()}
            width="130px"
            name="type"
            onClick={handleSetDetail}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-status">?????? ?????? ??????</Label>
          <Selectbox
            placeholder={detail.status === "" ? "????????????" : detail.status}
            options={["?????? ??????", "?????? ??????", "?????? ??????"]}
            width="130px"
            name="status"
            onClick={handleSetDetail}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-date">?????? ??????</Label>
          <span>?????????</span>
          <DatePicker
            locale={ko}
            className="input-date"
            dateFormat="yy - MM - dd"
            selected={startDate}
            onChange={(date: Date) => handleStartDate(date)}
            value={detail.duration.substring(0, 10)}
          />
          <span>?????????</span>
          <DatePicker
            locale={ko}
            className="input-date"
            dateFormat="yy - MM - dd"
            selected={endDate}
            onChange={(date: Date) => handleEndDate(date)}
            value={detail.duration.substring(13, 23)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-space">?????? ??????</Label>
          <InputLink
            type="text"
            name="space"
            placeholder="????????? ??????????????????."
            value={detail.space}
            onChange={(e) => handleInputAndTextArea(e)}
            style={{ width: "280px" }}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-adultPrice">?????????</Label>
          <div style={{ position: "relative" }}>
            <span>??????</span>
            <InputTextArea as="div">
              <InputPrice
                type="text"
                value={priceWithCommas}
                disabled={disablePrice}
                onChange={(e) => {
                  handlePrice(e);
                }}
              />
              <p>???</p>
            </InputTextArea>
            <CheckLabelArea>
              <CheckLabel
                label="?????? ??????"
                checked={isPriceZero}
                onClick={() => handlePriceFree("0")}
              />
            </CheckLabelArea>
            <CheckLabelArea style={{ marginLeft: "120px" }}>
              <CheckLabel
                label="??????"
                checked={isPriceOne}
                onClick={() => handlePriceFree("1")}
              />
            </CheckLabelArea>
          </div>
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-poster">?????? ????????? ??????</Label>
          <InputFileName type="text" value={detail.fileName} disabled />
          <FileLabel htmlFor="exhibition-posterUrl">?????????</FileLabel>
          <InputFile
            type="file"
            name="fileName"
            id="exhibition-posterUrl"
            onChange={uploadImgFile}
            accept="image/jpeg,image/jpg,image/png"
          />
          {thumbnail && (
            <div>
              <img
                src={thumbnail}
                alt="thumbnail"
                style={{ maxWidth: "500px", marginTop: "10px" }}
              />
            </div>
          )}
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-content">????????????</Label>
          <TextArea
            as="textarea"
            name="content"
            placeholder="????????? ??????????????????."
            value={detail.content}
            onChange={(e) => handleInputAndTextArea(e)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-author">?????? ??????</Label>
          <TextArea
            as="textarea"
            name="author"
            placeholder="????????? ??????????????????."
            value={detail.author}
            onChange={(e) => handleInputAndTextArea(e)}
          />
        </OptionWrapper>
        <OptionWrapper>
          <Label htmlFor="exhibition-posterUrl">????????? ???????????? ??????</Label>
          <InputLink
            type="text"
            name="webLink"
            placeholder="https://"
            value={detail.webLink}
            onChange={(e) => handleInputAndTextArea(e)}
            style={{ width: "100%" }}
          />
        </OptionWrapper>
      </WriteExhibitionWrapper>
      <ButtonWrapper>
        <CancelBtn
          variant="primary"
          size="large"
          type="button"
          onClick={() => setOpenWithdrawalModal(true)}
        >
          ????????????
        </CancelBtn>
        {mode === "edit" ? (
          <SubmitBtn
            variant="primary"
            size="large"
            type="button"
            onClick={clickSubmitBtn}
          >
            ????????????
          </SubmitBtn>
        ) : (
          <SubmitBtn
            variant="primary"
            size="large"
            type="button"
            onClick={clickSubmitBtn}
          >
            ????????????
          </SubmitBtn>
        )}
      </ButtonWrapper>
      <Modal
        open={openWithdrawalModal}
        handleModal={() => setOpenWithdrawalModal(!openWithdrawalModal)}
      >
        <SimpleDialog
          message={`${exhbId ? "??????" : "??????"}??? ?????????????????????????`}
          cancelMessage={`?????? ${exhbId ? "??????" : "??????"}??????`}
          confirmMessage={`${exhbId ? "??????" : "??????"} ????????????`}
          clickCancleBtn={() => setOpenWithdrawalModal(false)}
          clickConfirmBtn={() => (exhbId ? navigate(-1) : navigate("/"))}
        />
      </Modal>
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
  background-color: ${theme.colors.white100};
  border: 1px solid ${theme.colors.greys40};
`;

const TitleWrapper = styled.div`
  height: 48px;
  margin-bottom: 30px;
  border-bottom: 1px solid ${theme.colors.greys40};
  border-radius: 0px;
`;

const InputTitle = styled.input`
  width: 100%;
  border-radius: 0px;
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: ${theme.colors.greys90};
  &::placeholder {
    color: ${theme.colors.greys90};
  }
`;

const OptionWrapper = styled.div`
  margin-bottom: 30px;
  span {
    font-weight: 500;
    font-size: 16px;
    color: ${theme.colors.greys60};
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.colors.greys90};
`;

const Input = styled.input`
  border: 1px solid ${theme.colors.greys40};
  border-radius: 10000px;
  font-weight: 500;
  font-size: 16px;
  color: ${theme.colors.greys90};
  &::placeholder {
    color: ${theme.colors.greys60};
  }
  &:hover {
    border: 1px solid ${theme.colors.primry60};
    &::placeholder {
      color: ${theme.colors.greys90};
    }
  }
`;

const InputFileName = styled.input`
  width: 59vw;
  max-width: 851px;
  height: 36px;
  padding: 8px 20px;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 10000px;
  font-weight: 400;
  font-size: 16px;
  color: ${theme.colors.greys60};
  margin-right: 10px;
  &:hover {
    border: 1px solid ${theme.colors.primry60};
    &::placeholder {
      color: ${theme.colors.greys90};
    }
  }
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: 8px 20px;
  width: 124px;
  height: 36px;
  background: ${theme.colors.primry70};
  border-radius: 10000px;
  font-weight: 700;
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  color: ${theme.colors.white100};
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
  width: 110px;
  margin-left: 10px;
  height: 36px;
  padding: 8px 34px 8px 18px;
  > p {
    position: absolute;
    left: 76px;
    top: 9px;
    color: ${theme.colors.greys60};
  }
`;

const InputPrice = styled.input`
  width: 58px;
  height: 17px;
  border-radius: 0px;
  font-weight: 400;
  font-size: 16px;
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
  font-size: 16px;
  resize: none; // ????????? ?????? ?????? ??????
  ::-webkit-scrollbar {
    display: block;
    width: 16px;
  }
  ::-webkit-scrollbar-thumb {
    display: block;
    width: 16px;
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

const CancelBtn = styled(Button)`
  width: 153px;
  &:hover {
    background-color: ${theme.colors.greys90};
  }
`;

const SubmitBtn = styled(Button)`
  width: 153px;
  & :hover {
    background-color: ${theme.colors.primry90};
  }
`;
