import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { theme } from "../../../styles/theme";
import profileImg from "../../../assets/icons/profileImg.svg";
import StarIcon from "../../../assets/icons/starIcon.svg";
import { OnelineReviewCardType } from "../../../types/oneLineReview";
import Modal from "../../../Modal";
import Button from "../../atom/Button";
import oneLineReviewApis from "../../../apis/oneLineReviewApis";
import OnelineWriteContainer from "../container/OnelineWriteContainer";
import isApiError from "../../../utils/isApiError";
import useRefreshTokenApi from "../../../apis/useRefreshToken";
import OnelineModifyContainer from "../container/OnelineModifyContainer";

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
  const queryClient = useQueryClient();
  const refreshTokenApi = useRefreshTokenApi();
  const userconfirm =
    memberInfo?.memberId === Number(localStorage.getItem("memberId"));

  const placeHolder = {
    id,
    viewDate,
    rate,
    content,
    time,
    congestion,
    memberInfo,
  };

  const modifyModalHandler = () => {
    if (memberInfo?.memberId === Number(localStorage.getItem("memberId"))) {
      setModifyModalIsopen((prev) => !prev);
    } else {
      alert("리뷰를 작성한 본인이 아니면 수정할 수 없습니다.");
    }
  };

  const deleteModalHandler = () => {
    if (memberInfo?.memberId === Number(localStorage.getItem("memberId"))) {
      setDeleteModalIsopen((prev) => !prev);
    } else {
      alert("리뷰를 작성한 본인이 아니면 삭제할 수 없습니다.");
    }
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
        <img
          src={memberInfo?.memberImage ? memberInfo.memberImage : profileImg}
          alt="사람 이미지"
        />
        <ReviewInfo>
          {/* eslint-disable */}
          <div>
            {[...Array(rate)].map((_, index) => (
              <img key={`star-rate-${index}`} src={StarIcon} alt="별점" />
            ))}
          </div>
          <div>
            {memberInfo && <Span>{memberInfo.nickname}</Span>} |
            <Span>{viewDate}</Span> |<Span>{time}</Span> |
            <Span>{congestion}</Span>
          </div>
          <p>{content}</p>
        </ReviewInfo>
      </Review>
      <ButtonItems>
        <button
          data-visible={userconfirm}
          onClick={modifyModalHandler}
          type="button"
        >
          수정
        </button>
        <Spliter />
        <button
          data-visible={userconfirm}
          onClick={deleteModalHandler}
          type="button"
        >
          삭제
        </button>
      </ButtonItems>
      <Modal open={modifyModalIsopen} handleModal={modifyModalHandler}>
        <OnelineModifyContainer
          simpleId={id}
          handleModal={modifyModalHandler}
          modifyInfo={placeHolder}
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
    border-radius: 100vmax;
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
    margin-bottom: 15px;
    text-align: start;
  }
  & > p {
    text-align: start;
    color: ${theme.colors.greys90};
    font-weight: 700;
    font-size: 14px;
  }
`;

const ExhibitionTitle = styled.div`
  color: ${theme.colors.greys90};
  font-weight: 500;
  font-size: 14px;
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
  & > [data-visible="false"] {
    display: none;
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

const Span = styled.span`
  display: inline-block;
  font-size: 14px;
  padding-right: 8px;
  &:not(:first-child) {
    padding-left: 8px;
  }
`;
