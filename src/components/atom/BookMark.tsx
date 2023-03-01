import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as HeartOn } from "../../assets/icons/heartOn.svg";
import { ReactComponent as HeartOff } from "../../assets/icons/heartOff.svg";
import { exhbBookMarkApi } from "../../apis/exhibition";
import useRefreshTokenApi from "../../apis/useRefreshToken";
import isApiError from "../../utils/isApiError";

interface BookMarkType {
  exhbId: number;
  isBookmarked: boolean;
}

const BookMark = ({ exhbId, isBookmarked }: BookMarkType) => {
  const refreshTokenApi = useRefreshTokenApi();
  const [isChecked, setIsChecked] = useState(isBookmarked);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    setIsChecked(isBookmarked);
  }, [isBookmarked]);

  // 북마크 추가/해제
  const handleBookMarkBtn = async () => {
    if (!localStorage.getItem("accessToken")) {
      alert("해당 기능은 로그인 후 이용 가능합니다.");
      return;
    }
    try {
      const res = await exhbBookMarkApi(exhbId);
      const { msg } = res.data;
      alert(msg);
      setIsChecked((prev) => !prev);
    } catch (err) {
      isApiError(err);
      const errorRes = isApiError(err);
      if (errorRes === "accessToken 만료") {
        await refreshTokenApi();
        const reRes = await exhbBookMarkApi(exhbId);
        const { msg } = reRes.data;
        alert(msg);
        setIsChecked((prev) => !prev);
      }
      if (typeof errorRes !== "object") return;
      const { errorCode, errorMsg } = errorRes;
      if (errorCode === 404 && errorMsg === "회원 정보 없음") {
        alert("유효하지 않은 토큰입니다. 다시 로그인해주세요.");
      }
    }
  };

  return (
    <BookMarkContainer
      type="button"
      onClick={handleBookMarkBtn}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
    >
      {isChecked || isMouseOver ? <HeartOn /> : <HeartOff />}
    </BookMarkContainer>
  );
};

export default BookMark;

const BookMarkContainer = styled.button`
  width: 24px;
  height: 24px;
  padding: 0px;
  cursor: pointer;
`;
