import React, { useState } from "react";
// import { AxiosResponse } from "axios";
import styled from "styled-components";
import { Input, Label, Notice } from "../../styles/labelAndInputStyles";
import profileImg from "../../assets/icons/profileImg.svg";
import cameraCircle from "../../assets/icons/cameraCircle.svg";
import Selectbox from "../Selectbox";
import {
  getYearArray,
  getMonthArray,
  getDayArray,
} from "../../utils/dateSelector";
import { theme } from "../../styles/theme";
// import mypageApi, { MypageRes } from "../../apis/mypage";

const EditProfile = () => {
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>();
  const [profileImage, setProfileImage] = useState(profileImg);
  const [passwordCheck, setPasswordCheck] = useState("");
  const [valids, setValids] = useState({
    nickname: false,
    password: false,
  });
  const [infos, setInfos] = useState({
    password: "",
    nickname: "",
    gender: "",
    year: "",
    month: "",
    day: "",
    imageFile: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInfos({
      ...infos,
      [name]: value,
    });
  };

  const handleSetInfos = (e: React.MouseEvent<HTMLLIElement>, name: string) => {
    if (e !== undefined) {
      const { textContent } = e.currentTarget;
      if (textContent !== null) {
        setInfos({
          ...infos,
          [name]: textContent,
        });
      }
    }
  };

  const handleNicknameValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const rNickname = /^[가-힣|a-z|A-Z|0-9|]{2,10}$/;
    // 한글, 영어 대소문자, 숫자 2~10자리
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      const isNicknameValid = rNickname.test(value);
      setValids({
        ...valids,
        nickname: isNicknameValid,
      });
    }, 800);
    setTimer(newTimer);
  };

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
      setValids({
        ...valids,
        password: isPwValid,
      });
    }, 800);
    setTimer(newTimer);
  };

  const uploadImgFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files !== null) {
      setInfos({
        ...infos,
        imageFile: e.target.files[0].name,
      });
      reader.onload = () => {
        if (e.target.files !== null) {
          setProfileImage(URL.createObjectURL(e.target.files[0]));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const editBtn = () => {
    console.log(infos);
    // get mypage api test
    // try {
    //   const res: AxiosResponse<MypageRes> = await mypageApi();
    //   console.log(res);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <EditProfileContainer>
      <EditProtileWrapper>
        <ImgWrapper>
          <ProfileImg src={profileImage} alt="base-img" />
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
            placeholder="Nickname"
            width="26vw"
            height="44px"
            name="nickname"
            value={infos.nickname}
            onChange={(e) => {
              handleInput(e);
              handleNicknameValid(e);
            }}
          />
          {!valids.nickname && (
            <Notice color={colors.default}>
              한글, 영어 대소문자, 숫자 2~10자를 입력하세요
            </Notice>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label>생년월일</Label>
          <BirthWrapper>
            <Selectbox
              placeholder="9999"
              options={getYearArray()}
              width="9vw"
              name="year"
              onClick={handleSetInfos}
            />
            <Selectbox
              placeholder="12"
              options={getMonthArray()}
              width="6.9vw"
              name="month"
              onClick={handleSetInfos}
            />
            <Selectbox
              placeholder="31"
              options={getDayArray()}
              width="6.9vw"
              name="day"
              onClick={handleSetInfos}
            />
          </BirthWrapper>
        </InputWrapper>
        <InputWrapper style={{ marginBottom: "50px" }}>
          <Label htmlFor="gender">성별</Label>
          <Selectbox
            placeholder="성별"
            options={gender}
            width="26vw"
            name="gender"
            onClick={handleSetInfos}
          />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">비밀번호 변경</Label>
          <PasswordInput
            id="password"
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            width="26vw"
            height="44px"
            onChange={(e) => {
              handleInput(e);
              handlePwValid(e);
            }}
          />
          {!valids.password ? (
            <Notice color={colors.default}>
              영어 대소문자, 숫자, 특수문자를 포함한 8~16자를 입력하세요
            </Notice>
          ) : (
            <Notice color={colors.success}>안전한 비밀번호입니다</Notice>
          )}
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password-check">비밀번호 재확인</Label>
          <PasswordInput
            id="password-check"
            type="password"
            placeholder="비밀번호를 입력하세요"
            width="26vw"
            height="44px"
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
          />
          {passwordCheck !== "" && passwordCheck === infos.password ? (
            <Notice color={colors.success}>동일한 비밀번호입니다</Notice>
          ) : (
            <Notice color={colors.error}>비밀번호가 일치하지 않습니다</Notice>
          )}
        </InputWrapper>
        <EditBtn type="submit" onClick={editBtn}>
          수정하기
        </EditBtn>
      </EditProtileWrapper>
    </EditProfileContainer>
  );
};

export default EditProfile;

const gender = ["여성", "남성"];

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
  > * {
    max-width: 380px !important;
  }
  button {
    max-width: 380px;
  }
`;

const BirthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    max-width: 100px;
  }
  > div:first-child > button {
    max-width: 130px;
  }
`;

const PasswordInput = styled(Input)`
  /* background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='3' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2.95402 10.789L2 12.1942L2.28897 12.6807C6.58859 19.9188 17.5916 19.7322 21.6186 12.3529L22 11.6539L21.4704 10.86C17.169 4.41087 7.30969 4.37306 2.95402 10.789Z' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); */
  background-position: right 19px center;
  background-repeat: no-repeat;
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
