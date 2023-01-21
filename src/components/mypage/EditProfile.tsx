import React, { useState } from "react";
import styled from "styled-components";
import { Input, Label } from "../../styles/labelAndInputStyles";
import profileImg from "../../assets/icons/profileImg.svg";
import cameraCircle from "../../assets/icons/cameraCircle.svg";
import Selectbox from "../Selectbox";

// import CommonOnly from "../signUp/CommonOnly";

// export interface IsOnly {
//   email: boolean | null;
//   nickname: boolean | null;
//   adminNo: boolean | null;
// }

const EditProfile = () => {
  const [infos, setInfos] = useState({
    email: "",
    password: "",
    pwCheck: "",
    gender: "",
    birth: { year: "", month: "", day: "" },
    nickname: "",
    adminNo: 0,
    name: "",
  });
  const [year, setYear] = useState("");
  // const [valids, setValids] = useState({
  //   email: false,
  //   password: false,
  //   pwCheck: false,
  //   nickname: false,
  //   adminNo: true,
  //   name: false,
  // });
  // const [isOnly, setIsOnly] = useState<IsOnly>({
  //   email: null,
  //   nickname: null,
  //   adminNo: null,
  // });

  // const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value, name } = e.target;
  //   setInfos({
  //     ...infos,
  //     [name]: value,
  //   });
  // };

  return (
    <EditProfileContainer>
      <EditProtileWrapper>
        <ImgWrapper>
          <img src={profileImg} alt="base-img" />
          <UploadImg src={cameraCircle} alt="upload-btn" />
        </ImgWrapper>
        <InputWrapper>
          <Label htmlFor="nickname">별명</Label>
          <Input
            type="text"
            id="nickname"
            placeholder="Nickname"
            width="26vw"
            height="44px"
          />
          {/* {true && <div>한글, 영어 대소문자, 숫자 2~10자를 입력하세요</div>} */}
        </InputWrapper>
        <InputWrapper>
          <Label>생년월일</Label>
          <Selectbox
            placeholder="년도"
            selectedData={setYear}
            options={yearArr()}
            width="130px"
          ></Selectbox>
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="gender">성별</Label>
          <Input type="text" id="gender" width="26vw" height="44px" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">비밀번호 변경</Label>
          <PasswordInput
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            width="26vw"
            height="44px"
          />
        </InputWrapper>{" "}
        <InputWrapper>
          <Label htmlFor="password-check">비밀번호 재확인</Label>
          <PasswordInput
            type="password"
            id="password-check"
            placeholder="비밀번호를 입력하세요"
            width="26vw"
            height="44px"
          />
        </InputWrapper>
        {/* <CommonOnly
          infos={infos}
          setInfos={setInfos}
          valids={valids}
          setValids={setValids}
          isOnly={isOnly}
          handleInput={handleInput}
        /> */}
        <EditBtn type="submit">수정하기</EditBtn>
      </EditProtileWrapper>
    </EditProfileContainer>
  );
};

export default EditProfile;

const yearArr = () => {
  const years: string[] = [];
  for (let i = new Date().getFullYear(); i > 1950 - 1; i -= 1) {
    years.push(i.toString());
  }
  return years;
};

const monthArr = () => {
  const months: string[] = [];
  for (let i = 1; i < 12 + 1; i += 1) {
    months.push(i.toString());
  }
  return months;
};

const dayArr = () => {
  const days: string[] = [];
  for (let i = 1; i < 31 + 1; i += 1) {
    days.push(i.toString());
  }
  return days;
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

const UploadImg = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  width: fit-content;
  margin-bottom: 10px;
`;

const PasswordInput = styled(Input)`
  background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9.5 10.3411C9.18408 10.8163 9 11.3867 9 12C9 13.6569 10.3431 15 12 15C13.0015 15 13.8884 14.5093 14.4333 13.7552M12.594 9.05884C13.3872 9.21816 14.0673 9.69033 14.5 10.3411' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M6 7.80245C4.8335 8.55932 3.79192 9.55472 2.95402 10.789L2 12.1942L2.28897 12.6807C5.6219 18.2914 12.9828 19.4408 18 16.2368M9 6.44352C13.4719 5.16815 18.6587 6.64425 21.4704 10.86L22 11.6539L21.6186 12.3529C21.2186 13.0858 20.7498 13.7478 20.2256 14.3386' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M2 5L22 19' stroke='%239C9C9C' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-position: right 19px center;
  background-repeat: no-repeat;
`;

const EditBtn = styled.button`
  width: 26vw;
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
