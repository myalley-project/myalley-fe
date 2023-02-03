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
  const [isWithdrawal, setIsWithdrawal] = useState(false);
  const { infoData } = props;
  const { birth, nickname, gender, memberImage } = infoData;
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [profileImage, setProfileImage] = useState(profileImg);
  const [passwordCheck, setPasswordCheck] = useState("");
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

  // input 핸들러 함수
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setInfos({
      ...infos,
      [name]: value,
    });
  };

  // selectbox 핸들러 함수
  const handleSetInfos = (e: React.MouseEvent<HTMLLIElement>, name: string) => {
    if (e !== undefined) {
      const { textContent } = e.currentTarget;
      if (name === "gender") {
        setInfos({
          ...infos,
          gender: gender === "여성" ? "W" : "M",
        });
      } else if (textContent !== null) {
        setInfos({
          ...infos,
          [name]: textContent,
        });
      }
    }
  };

  // 닉네임 유효성 검사
  const handleNicknameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rNickname = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/;
    // 한글, 영어 대소문자, 숫자 2~10자리
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

  // 비밀번호 유효성 검사
  const handlePwValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*])[A-Za-z\d~!@#$%^&*]{8,16}$/;
    // 영어 대소문자, 숫자, 특수문자(~!@#$%^&*)를 포함한 8~16자
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

  // 비밀번호 체크 유효성 검사
  const handlePwCheckValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== "" && value === infos.password) {
      setErrorClass({ ...errorClass, password: "" });
    }
  };

  // 이미지 업로드
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

  // 회원정보 수정 api
  const editBtn = async () => {
    if (!valids.nickname && infos.nickname !== "") {
      // 별명 형식 체크
      setErrorClass({ ...errorClass, nickname: "error" });
      setErrorType({ ...errorType, nickname: "form" });
    } else if (!valids.password) {
      // 비밀번호 형식 체크
      if (infos.password !== null) {
        setErrorClass({ ...errorClass, password: "error" });
        setErrorType({ ...errorType, password: "form" });
        return;
      }
    } else if (passwordCheck !== "" && passwordCheck !== infos.password) {
      // 비밀번호 일치 체크
      if (infos.password !== null && passwordCheck !== "") {
        setErrorClass({ ...errorClass, password: "error" });
      }
      return;
    } else if (passwordCheck === "" && infos.password !== "") {
      setErrorClass({ ...errorClass, password: "error" });
      return;
    }

    // 아무것도 변경하지 않았을때 api 타지 않도록
    if (
      infos.imageFile === null &&
      infos.nickname === "" &&
      infos.gender === "" &&
      infos.year === "" &&
      infos.month === "" &&
      infos.day === "" &&
      infos.password === null
    ) {
      alert("변경을 원하는 항목을 입력해주세요.");
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
        alert("회원정보 수정이 완료되었습니다.");
        setErrorClass({ ...errorClass, nickname: "", password: "" });
        setErrorType({ ...errorType, nickname: "", password: "" });
        setValids({ ...valids, nickname: false, password: false });
      } else {
        alert("알 수 없는 오류입니다. 관리자에게 문의하세요.");
      }
    } catch (err) {
      const errorRes = isApiError(err);
      if (typeof errorRes !== "object") return;
      const { errorCode, errorMsg } = errorRes;
      if (errorCode === 409 && errorMsg === "닉네임 중복") {
        setValids({ ...valids, nickname: true });
        setErrorClass({ ...errorClass, nickname: "error" });
        setErrorType({ ...errorType, nickname: "duplicate" });
      } else if (errorCode === 400 && errorMsg === "닉네임 형식 오류") {
        setErrorType({ ...errorType, nickname: "form" });
      } else if (errorCode === 400 && errorMsg === "비밀번호 형식 오류") {
        setErrorClass({ ...errorClass, password: "error" });
        setErrorType({ ...errorType, password: "form" });
      } else if (
        errorCode === 400 &&
        errorMsg === "올바른 형식의 이미지 파일이 아닙니다."
      )
        alert("이미지 형식을 다시 확인해주세요.");
    }
  };

  // 탈퇴 버튼
  const withdrawalsBtn = async () => {
    try {
      const res: AxiosResponse<EditMyInfoRes> = await withdrawalsApi();
      const { resultCode } = res.data;
      if (resultCode === 200) {
        alert("탈퇴가 완료되었습니다.");
        removeLocalStorageItem();
        navigate("/");
      } else {
        alert("알 수 없는 오류입니다. 관리자에게 문의하세요.");
      }
    } catch (err) {
      isApiError(err);
    }
  };

  return (
    <EditProfileContainer>
      {isWithdrawal && (
        <SimpleDialog
          message="정말 탈퇴하시겠습니까?"
          cancelMessage="취소"
          confirmMessage="탈퇴하기"
          clickCancleBtn={() => setIsWithdrawal(false)}
          clickConfirmBtn={() => withdrawalsBtn()}
        />
      )}

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
          <Label htmlFor="nickname">별명</Label>
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
              한글, 영어 대소문자, 숫자 2~10자를 입력하세요
            </Notice>
          )}
          {errorType.nickname === "form" && infos.nickname !== "" && (
            <Notice color={colors.error}>
              별명은 2~10자리의 한글 또는 영어 대소문자 또는 숫자만 가능합니다.
            </Notice>
          )}
          {errorType.nickname === "duplicate" && (
            <Notice color={colors.error}>이미 사용중인 별명입니다.</Notice>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label>생년월일</Label>
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
          <Label htmlFor="gender">성별</Label>
          <Selectbox
            placeholder={gender === "W" ? "여성" : "남성"}
            options={["여성", "남성"]}
            width="26vw"
            name="gender"
            onClick={handleSetInfos}
          />
        </GenderWrapper>
        <InputWrapper>
          <Label htmlFor="password">비밀번호 변경</Label>
          <PasswordWrapper>
            <PasswordInput
              id="password"
              type={isPwType ? "password" : "text"}
              name="password"
              placeholder="비밀번호를 입력하세요"
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
              영어 대소문자, 숫자, 특수문자를 포함한 8~16자를 입력하세요
            </Notice>
          )}
          {errorType.password === "form" && infos.password !== "" && (
            <Notice color={colors.error}>
              비밀번호는 8~16자의 영어 대소문자, 숫자, 특수문자를 포함한
              형식이여야합니다.
            </Notice>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password-check">비밀번호 재확인</Label>
          <PasswordWrapper>
            <PasswordInput
              id="password-check"
              type={isPwCheckType ? "password" : "text"}
              placeholder="비밀번호를 입력하세요"
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
            <Notice color={colors.error}>비밀번호가 일치하지 않습니다!</Notice>
          )}
        </InputWrapper>
        <EditBtn type="submit" onClick={editBtn}>
          수정하기
        </EditBtn>
        <WithdrawalBtn
          type="button"
          onClick={() => setIsWithdrawal((prev) => !prev)}
        >
          탈퇴하기
        </WithdrawalBtn>
      </EditProtileWrapper>
      {isWithdrawal && (
        <SimpleDialog
          message="정말 탈퇴하시겠습니까?"
          cancelMessage="취소"
          confirmMessage="탈퇴하기"
          clickCancleBtn={() => setIsWithdrawal(false)}
          clickConfirmBtn={() => withdrawalsBtn()}
        />
      )}
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
  color: ${theme.colors.greys60};
  cursor: pointer;
  &:hover {
    color: ${theme.colors.greys100};
  }
`;
