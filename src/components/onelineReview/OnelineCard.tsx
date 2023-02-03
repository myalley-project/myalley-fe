import React, { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import ProfileImg from "../../assets/icons/profileImg.svg";
import StarIcon from "../../assets/icons/starIcon.svg";
import { OnelineReviewCardType } from "../../types/oneLineReview";
import Modal from "../../Modal";
import Button from "../atom/Button";
import oneLineReviewApis from "../../apis/oneLineReviewApis";

import OnelineWrapper from "../../pages/OnelineWrapper";

const OnelineCard = ({
  id,
  viewDate,
  rate,
  content,
  time,
  congestion,
  memberInfo,
}: OnelineReviewCardType) => {
  const [modifyModalIsopen, setModifyModalIsopen] = useState<boolean>(false);
  const [deleteModalIsopen, setDeleteModalIsopen] = useState<boolean>(false);

  const modifyModalHandler = () => {
    setModifyModalIsopen((prev) => !prev);
  };

  const deleteModalHandler = () => {
    setDeleteModalIsopen((prev) => !prev);
  };

  const deleteMutation = useMutation({
    mutationFn: () => oneLineReviewApis.deleteReview(id),
  });

  return (
    <Container>
      <Review>
        <img src={ProfileImg} alt="사람 이미지" />
        <ReviewInfo>
          {rate === 1 ? (
            <div>
              <img src={StarIcon} alt="별점" />
            </div>
          ) : null}
          {rate === 2 ? (
            <div>
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
            </div>
          ) : null}
          {rate === 3 ? (
            <div>
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
            </div>
          ) : null}
          {rate === 4 ? (
            <div>
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
            </div>
          ) : null}
          {rate === 5 ? (
            <div>
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
              <img src={StarIcon} alt="별점" />
            </div>
          ) : null}
          <div>
            <span>{memberInfo.nickname}</span> | <span>{viewDate}</span> |
            <span>{time}</span> | <span>{congestion}</span>
          </div>
          <p>{content}</p>
        </ReviewInfo>
      </Review>
      <ButtonItems>
        <button type="button">수정</button>
        <Spliter />
        <button onClick={deleteModalHandler} type="button">
          삭제
        </button>
      </ButtonItems>
      <Modal open={modifyModalIsopen} handleModal={modifyModalHandler}>
        <OnelineWrapper writeType="modify" simpleId={id} />
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
              onClick={() => deleteMutation.mutate()}
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
export default OnelineCard;

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
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 14px;
  }
`;

const ButtonItems = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: first baseline;
  padding: 0px;
  & > button {
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
`;

const Title = styled.h1`
  color: ${theme.colors.greys90};
  font-weight: 400;
  font-size: 20px;
  text-align: center;
`;
