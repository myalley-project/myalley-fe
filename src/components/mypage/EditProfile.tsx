import React, { useRef, useState } from "react";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  editMyInfoApi,
  EditMyInfoType,
  EditMyInfoRes,
  withdrawalsApi,
} from "../../apis/member";
import { Input, Label, Notice } from "../atom/labelInput";
import profileImg from "../../assets/icons/profileImg.svg";
import cameraCircle from "../../assets/icons/cameraCircle.svg";
import Selectbox from "../atom/Selectbox";
import {
  getYearArray,
  getMonthArray,
  getDayArray,
} from "../../utils/dateSelector";
import { theme } from "../../styles/theme";
import isApiError from "../../utils/isApiError";
import eyeOff from "../../assets/icons/eyeOff.svg";
import eyeOn from "../../assets/icons/eyeOn.svg";
import alertCircle from "../../assets/icons/alertCircle.svg";
import SimpleDialog from "../SimpleDialog";
import Modal from "../../Modal";
import removeLocalStorageItem from "../../utils/removeLocalStorageItem";

interface MyInfoType {
  infoData: {
    memberId: number;
    email: string;
    nickname: string;
    gender: string;
    birth: string;
    level: string;
    memberImage: string;
    authority: string;
  };
}

interface InfosType {
  password: string | null;
  nickname: string;
  gender: string;
  year: string;
  month: string;
  day: string;
  imageFile: File | null;
  imageFileName: string;
}

const MyProfileEdit = (props: MyInfoType) => {
  const navigate = useNavigate();
  const formData = new FormData();
  const nicknameRef = useRef<HTMLInputElement>(null);
  const { infoData } = props;
  const { birth, nickname, gender, memberImage } = infoData;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [profileImage, setProfileImage] = useState(profileImg);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [openWithdrawalModal, setOpenWithdrawalModal] = useState(false);
  const [errorType, setErrorType] = useState({
    nickname: "",
    password: "",
  });
  const [errorClass, setErrorClass] = useState({
    nickname: "",
    password: "",
  });
  const [valids, setValids] = useState({
    nickname: false,
    password: false,
  });
  const [infos, setInfos] = useState<InfosType>({
    password: null,
    nickname: "",
    gender: "",
    year: "",
    month: "",
    day: "",
    imageFile: null,
    imageFileName: "",
  });
  const [isPwType, setIsPwType] = useState(true);
  const [isPwCheckType, setIsCheckPwType] = useState(true);

  // input ????????? ??????
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInfos({
      ...infos,
      [name]: value,
    });
  };

  // selectbox ????????? ??????
  const handleSetInfos = (e: React.MouseEvent<HTMLLIElement>, name: string) => {
    if (e !== undefined) {
      const { textContent } = e.currentTarget;
      if (name === "gender") {
        setInfos({
          ...infos,
          gender: gender === "??????" ? "W" : "M",
        });
      } else if (textContent !== null) {
        setInfos({
          ...infos,
          [name]: textContent,
        });
      }
    }
  };

  // ????????? ????????? ??????
  const handleNicknameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rNickname = /^[???-???|a-z|A-Z|0-9|]{2,10}$/;
    // ??????, ?????? ????????????, ?????? 2~10??????
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isNicknameValid = rNickname.test(value);
      if (isNicknameValid) {
        setErrorClass({ ...errorClass, nickname: "" });
        setErrorType({ ...errorType, nickname: "" });
      }
      setValids({
        ...valids,
        nickname: isNicknameValid,
      });
    }, 500);
    setTimer(newTimer);
  };

  // ???????????? ????????? ??????
  const handlePwValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,16}$/;
    // ?????? ????????????, ??????, ????????????(~!@#$%^&*)??? ????????? 8~16???
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isPwValid = rPassword.test(value);
      if (isPwValid) {
        setErrorClass({ ...errorClass, password: "" });
        setErrorType({ ...errorType, password: "" });
      }
      setValids({
        ...valids,
        password: isPwValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  // ???????????? ?????? ????????? ??????
  const handlePwCheckValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== "" && value === infos.password) {
      setErrorClass({ ...errorClass, password: "" });
    }
  };

  // ????????? ?????????
  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files !== null) {
      setInfos({
        ...infos,
        imageFile: e.target.files[0],
        imageFileName: URL.createObjectURL(e.target.files[0]),
      });
      reader.onload = () => {
        if (e.target.files !== null) {
          setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // ???????????? ?????? api
  const editBtn = async () => {
    if (!valids.nickname && infos.nickname !== "") {
      // ?????? ?????? ??????
      setErrorClass({ ...errorClass, nickname: "error" });
      setErrorType({ ...errorType, nickname: "form" });
    } else if (!valids.password) {
      // ???????????? ?????? ??????
      if (infos.password !== null) {
        setErrorClass({ ...errorClass, password: "error" });
        setErrorType({ ...errorType, password: "form" });
        return;
      }
    } else if (passwordCheck !== "" && passwordCheck !== infos.password) {
      // ???????????? ?????? ??????
      if (infos.password !== null && passwordCheck !== "") {
        setErrorClass({ ...errorClass, password: "error" });
      }
      return;
    } else if (passwordCheck === "" && infos.password !== "") {
      setErrorClass({ ...errorClass, password: "error" });
      return;
    }

    // ???????????? ???????????? ???????????? api ?????? ?????????
    if (
      infos.imageFile === null &&
      infos.nickname === "" &&
      infos.gender === "" &&
      infos.year === "" &&
      infos.month === "" &&
      infos.day === "" &&
      infos.password === null
    ) {
      alert("????????? ????????? ????????? ??????????????????.");
      return;
    }

    const editMyInfo: EditMyInfoType = {
      nickname: `${infos.nickname === "" ? nickname : infos.nickname}`,
      gender: `${infos.gender === "" ? gender : infos.gender}`,
      birth: `${infos.year === "" ? `${birth.substring(0, 4)}` : infos.year}-${
        infos.month === "" ? `${birth.substring(5, 7)}` : infos.month
      }-${infos.day === "" ? `${birth.substring(8)}` : infos.day}`,
      password: infos.password,
    };
    if (infos.imageFile !== null) {
      formData.append("imageFile", infos.imageFile);
    }
    formData.append(
      "data",
      new Blob([JSON.stringify(editMyInfo)], { type: "application/json" })
    );
    try {
      const res: AxiosResponse<EditMyInfoRes> = await editMyInfoApi(formData);
      const { resultCode } = res.data;
      if (resultCode === 200) {
        alert("???????????? ????????? ?????????????????????.");
        setErrorClass({ ...errorClass, nickname: "", password: "" });
        setErrorType({ ...errorType, nickname: "", password: "" });
        setValids({ ...valids, nickname: false, password: false });
        window.location.reload();
      } else {
        alert("??? ??? ?????? ???????????????. ??????????????? ???????????????.");
      }
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorCode, errorMsg } = errorRes;
      if (errorCode === 409 && errorMsg === "????????? ??????") {
        setValids({ ...valids, nickname: true });
        setErrorClass({ ...errorClass, nickname: "error" });
        setErrorType({ ...errorType, nickname: "duplicate" });
      } else if (errorCode === 400 && errorMsg === "????????? ?????? ??????") {
        setErrorType({ ...errorType, nickname: "form" });
      } else if (errorCode === 400 && errorMsg === "???????????? ?????? ??????") {
        setErrorClass({ ...errorClass, password: "error" });
        setErrorType({ ...errorType, password: "form" });
      } else if (
        errorCode === 400 &&
        errorMsg === "????????? ????????? ????????? ????????? ????????????."
      )
        alert("????????? ????????? ?????? ??????????????????.");
    }
  };

  // ?????? ??????
  const withdrawalsBtn = async () => {
    try {
      const res: AxiosResponse<EditMyInfoRes> = await withdrawalsApi();
      const { resultCode } = res.data;
      if (resultCode === 200) {
        alert("????????? ?????????????????????.");
        removeLocalStorageItem();
        navigate("/");
      } else {
        alert("??? ??? ?????? ???????????????. ??????????????? ???????????????.");
      }
    } catch (err) {
      isApiError(err);
    }
  };

  return (
    <EditProfileContainer>
      <EditProtileWrapper>
        <ImgWrapper>
          {memberImage === "" ? (
            <ProfileImg
              src={
                infos.imageFile === null ? profileImage : infos.imageFileName
              }
              alt="base-img"
            />
          ) : (
            <ProfileImg
              src={infos.imageFile === null ? memberImage : infos.imageFileName}
              alt="base-img"
            />
          )}

          <label htmlFor="exhibition-posterUrl">
            <UploadImg src={cameraCircle} alt="upload-btn" />
          </label>
          <InputFile
            id="exhibition-posterUrl"
            type="file"
            name="fileName"
            onChange={uploadImgFile}
            accept="image/jpeg,image/jpg,image/png"
          />
        </ImgWrapper>
        <InputWrapper>
          <Label htmlFor="nickname">??????</Label>
          <Input
            id="nickname"
            type="text"
            placeholder={nickname}
            ref={nicknameRef}
            width="26vw"
            className={errorClass.nickname}
            height="44px"
            name="nickname"
            value={infos.nickname}
            onFocus={() => {
              if (infos.nickname === "") {
                setInfos({ ...infos, nickname });
              }
            }}
            onChange={(e) => {
              handleInput(e);
              handleNicknameValid(e);
            }}
          />
          <ErrorIcon>
            {errorType.nickname !== "" && (
              <img src={alertCircle} alt="error-icon" />
            )}
          </ErrorIcon>
          {!valids.nickname && errorType.nickname === "" && (
            <Notice color={colors.default}>
              ??????, ?????? ????????????, ?????? 2~10?????? ???????????????
            </Notice>
          )}
          {errorType.nickname === "form" && infos.nickname !== "" && (
            <Notice color={colors.error}>
              ????????? 2~10????????? ?????? ?????? ?????? ???????????? ?????? ????????? ???????????????.
            </Notice>
          )}
          {errorType.nickname === "duplicate" && (
            <Notice color={colors.error}>?????? ???????????? ???????????????.</Notice>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label>????????????</Label>
          <BirthWrapper>
            <Selectbox
              placeholder={birth === null ? "" : birth.substring(0, 4)}
              options={getYearArray()}
              width="9vw"
              name="year"
              onClick={handleSetInfos}
            />
            <Selectbox
              placeholder={birth === null ? "" : birth.substring(5, 7)}
              options={getMonthArray()}
              width="6.9vw"
              name="month"
              onClick={handleSetInfos}
            />
            <Selectbox
              placeholder={birth === null ? "" : birth.substring(8, 10)}
              options={getDayArray()}
              width="6.9vw"
              name="day"
              onClick={handleSetInfos}
            />
          </BirthWrapper>
        </InputWrapper>
        <GenderWrapper style={{ marginBottom: "50px" }}>
          <Label htmlFor="gender">??????</Label>
          <Selectbox
            placeholder={gender === "W" ? "??????" : "??????"}
            options={["??????", "??????"]}
            width="26vw"
            name="gender"
            onClick={handleSetInfos}
          />
        </GenderWrapper>
        <InputWrapper>
          <Label htmlFor="password">???????????? ??????</Label>
          <PasswordWrapper>
            <PasswordInput
              id="password"
              type={isPwType ? "password" : "text"}
              name="password"
              placeholder="??????????????? ???????????????"
              className={errorClass.password}
              width="26vw"
              height="44px"
              onChange={(e) => {
                handleInput(e);
                handlePwValid(e);
              }}
            />
            <EyeIconbtn
              type="button"
              onClick={() => setIsPwType((prev) => !prev)}
            >
              <img src={isPwType ? eyeOff : eyeOn} alt="eye-icon" />
            </EyeIconbtn>
          </PasswordWrapper>
          {!valids.password && errorType.password === "" && (
            <Notice color={colors.default}>
              ?????? ????????????, ??????, ??????????????? ????????? 8~16?????? ???????????????
            </Notice>
          )}
          {errorType.password === "form" && infos.password !== "" && (
            <Notice color={colors.error}>
              ??????????????? 8~16?????? ?????? ????????????, ??????, ??????????????? ?????????
              ????????????????????????.
            </Notice>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password-check">???????????? ?????????</Label>
          <PasswordWrapper>
            <PasswordInput
              id="password-check"
              type={isPwCheckType ? "password" : "text"}
              placeholder="??????????????? ???????????????"
              className={errorClass.password}
              width="26vw"
              height="44px"
              onChange={(e) => {
                handlePwCheckValid(e);
                setPasswordCheck(e.target.value);
              }}
            />
            <EyeIconbtn
              type="button"
              onClick={() => setIsCheckPwType((prev) => !prev)}
            >
              <img src={isPwCheckType ? eyeOff : eyeOn} alt="eye-icon" />
            </EyeIconbtn>
          </PasswordWrapper>
          {passwordCheck !== infos.password && (
            <Notice color={colors.error}>??????????????? ???????????? ????????????</Notice>
          )}
        </InputWrapper>
        <EditBtn type="submit" onClick={editBtn}>
          ????????????
        </EditBtn>
        <div style={{ textAlign: "center" }}>
          <WithdrawalBtn
            type="button"
            onClick={() => setOpenWithdrawalModal(true)}
          >
            ????????????
          </WithdrawalBtn>
          <Modal
            open={openWithdrawalModal}
            handleModal={() => setOpenWithdrawalModal(!openWithdrawalModal)}
          >
            <SimpleDialog
              message="?????? ?????????????????????????"
              cancelMessage="????????????"
              confirmMessage="????????????"
              clickCancleBtn={() => setOpenWithdrawalModal(false)}
              clickConfirmBtn={() => withdrawalsBtn()}
            />
          </Modal>
        </div>
      </EditProtileWrapper>
    </EditProfileContainer>
  );
};

export default MyProfileEdit;

const colors = {
  default: `${theme.colors.greys60}`,
  success: `${theme.colors.success}`,
  error: `${theme.colors.error}`,
};

const EditProfileContainer = styled.div`
  width: 83vw;
  max-width: 1200px;
  margin: 50px auto 200px auto;
`;

const EditProtileWrapper = styled.div`
  width: 26vw;
  max-width: 380px;
  margin: 0 auto;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 120px;
  margin: 0px auto 50px auto;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 1000px;
`;

const UploadImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
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

const InputWrapper = styled.div`
  margin-bottom: 10px;
  position: relative;
  > * {
    max-width: 380px !important;
  }
  button {
    max-width: 380px;
  }
`;

const ErrorIcon = styled.div`
  position: absolute;
  top: 40px;
  right: 20px;
  width: 24px;
  height: 24px;
`;

const BirthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    max-width: 100px;
    height: 44px;
  }
  > div:first-child > button {
    max-width: 130px;
  }
`;

const GenderWrapper = styled(InputWrapper)`
  button {
    height: 44px;
  }
`;

const PasswordWrapper = styled.div`
  width: 26vw;
  position: relative;
`;

const EyeIconbtn = styled.button`
  position: absolute;
  right: 20px;
  top: 10px;
  padding: 0;
  cursor: pointer;
`;

const PasswordInput = styled(Input)`
  width: 100%;
  background-position: right 19px center;
  background-repeat: no-repeat;
  color: ${(props) => props.theme.colors.greys90};

  &:focus {
    border: 1px solid ${(props) => props.theme.colors.primry60};
  }
`;

const EditBtn = styled.button`
  width: 26vw;
  max-width: 380px;
  height: 48px;
  margin-top: 40px;
  padding: 10px 40px;
  background-color: ${(props) => props.theme.colors.primry70};
  color: ${(props) => props.theme.colors.white100};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.greys90};
  }
`;

const WithdrawalBtn = styled.button`
  margin-top: 10px;
  text-align: center;
  color: ${theme.colors.greys60};
  cursor: pointer;
  &:hover {
    color: ${theme.colors.greys100};
  }
`;
