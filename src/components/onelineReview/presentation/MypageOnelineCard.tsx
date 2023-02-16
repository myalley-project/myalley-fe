import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import profileImg from "../../../assets/icons/profileImg.svg";
import StarIcon from "../../../assets/icons/starIcon.svg";
import { MypageOnelineReviewCardType } from "../../../types/oneLineReview";
import Modal from "../../../Modal";
import Button from "../../atom/Button";
import oneLineReviewApis from "../../../apis/oneLineReviewApis";
import OnelineWriteContainer from "../container/OnelineWriteContainer";
import isApiError from "../../../utils/isApiError";
import useRefreshTokenApi from "../../../apis/useRefreshToken";

const MypageOnelineCard = ({
  id,
  viewDate,
  rate,
  content,
  time,
  congestion,
  exhibitionInfo,
}: MypageOnelineReviewCardType) => {
  const [modifyModalIsopen, setModifyModalIsopen] = useState<boolean>(false);
  const [deleteModalIsopen, setDeleteModalIsopen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const refreshTokenApi = useRefreshTokenApi();

  const modifyModalHandler = () => {
    setModifyModalIsopen((prev) => !prev);
  };

  const deleteModalHandler = () => {
    setDeleteModalIsopen((prev) => !prev);
  };

  const deleteMutation = useMutation({
    mutationFn: () => oneLineReviewApis.deleteReview(id),
    onSuccess: () => queryClient.invalidateQueries(["simpleReviews"]),
  });

  const handleDelete = () => {
    try {
      deleteMutation.mutate();
      deleteModalHandler();
    } catch (err) {
      const errResponese = isApiError(err);
      if (errResponese === "accessToken 만료") refreshTokenApi();
    }
  };

  /* eslint-disable */
  return (
    <Container>
      <Review>
        <ReviewInfo>
          <div className="exhibition-title">{exhibitionInfo?.title}</div>
          {/* eslint-disable */}
          {[...Array(rate)].map((_, index) => (
            <div key={`star-rate-${index}`}>
              <img src={StarIcon} alt="별점" />
            </div>
          ))}
          <DateInfo>
            <span>{viewDate}</span> | <span>{time}</span> |{" "}
            <span>{congestion}</span>
          </DateInfo>
          <p>{content}</p>
        </ReviewInfo>
      </Review>
      <ButtonItems>
        <button onClick={modifyModalHandler} type="button">
          수정
        </button>
        <Spliter />
        <button onClick={deleteModalHandler} type="button">
          삭제
        </button>
      </ButtonItems>
      <Modal open={modifyModalIsopen} handleModal={modifyModalHandler}>
        <OnelineWriteContainer
          simpleId={id}
          handleModal={modifyModalHandler}
          writeType="modify"
        />
      </Modal>
      <Modal open={deleteModalIsopen} handleModal={deleteModalHandler}>
        <Dialog>
          <Message>
            <Title>작성하신 내용을 정말 삭제하시겠습니까?</Title>
          </Message>
          <DialogContainer>
            <Button
              onClick={deleteModalHandler}
              variant="text"
              size="large"
              type="button"
            >
              취소하기
            </Button>
            <Button
              onClick={handleDelete}
              variant="primary"
              size="large"
              type="button"
            >
              삭제하기
            </Button>
          </DialogContainer>
        </Dialog>
      </Modal>
    </Container>
  );
};
export default MypageOnelineCard;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 30px;
  border: 1px solid ${theme.colors.greys40};
`;

const Review = styled.div`
  display: flex;
  justify-content: start;
  gap: 30px;
  & > img {
    width: 86px;
    aspect-ratio: 1 / 1;
  }
`;

const ReviewInfo = styled.div`
  & > .exhibition-title {
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
  }
  & > img {
    margin-bottom: 10px;
  }
  & > div {
    color: ${theme.colors.greys60};
    font-size: 12px;
    margin-bottom: 20px;
    text-align: start;
  }
  & > p {
    text-align: start;
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 14px;
  }
`;

const DateInfo = styled.div`
  & > span {
    color: ${theme.colors.greys80};
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.5px;
  }
`;

const ButtonItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: first baseline;
  padding: 0px;
  & > button {
    cursor: pointer;
    color: ${theme.colors.greys60};
    border: 0;
  }
`;

const Spliter = styled.div`
  width: 1px;
  height: 20px;
  border-right: 1px solid ${theme.colors.greys10};
`;

const Dialog = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  background-color: #fff;
  z-index: 1000;
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 380px;
  height: 116px;
  padding: 0px;
  margin-bottom: 30px;
`;

const DialogContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
  padding: 0px;
  margin-bottom: 30px;
  & > button {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  color: ${theme.colors.greys90};
  font-weight: 400;
  font-size: 20px;
  text-align: center;
`;
