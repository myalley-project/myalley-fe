import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BlogReviewReadContainer from "../blogreview/container/BlogReviewReadContainer";
import OnelineWriteContainer from "../onelineReview/container/OnelineWriteContainer";
import Modal from "../../Modal";
import OneLineReadContainer from "../onelineReview/container/OneLineReadContainer";

type ReviewFilter = "oneline" | "blog";

const ReviewWrapper = () => {
  const [simpleReviewModal, setSimpleReviewModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<ReviewFilter>("oneline");
  const [orderType, setOrderType] = useState<
    "Recent" | "StarScore" | "ViewCount"
  >("Recent");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleOneLineReview = () => {
    if (!localStorage.getItem("refreshToken")) {
      alert("리뷰를 등록하려면 로그인하셔야 합니다.");
    } else if (filter === "oneline") {
      setSimpleReviewModal((prev) => !prev);
    } else {
      navigate("/blogreview-write");
    }
  };

  return (
    <Container>
      {filter === "oneline" ? (
        <OneLineReadContainer
          id={id as string}
          orderType={orderType}
          filter={filter}
          setFilter={setFilter}
          setOrderType={setOrderType}
          handleReviewModal={handleOneLineReview}
        />
      ) : null}
      {filter === "blog" ? (
        <BlogReviewReadContainer
          id={id as string}
          orderType={orderType}
          filter={filter}
          setFilter={setFilter}
          setOrderType={setOrderType}
          handleReviewModal={handleOneLineReview}
        />
      ) : null}
      <Modal open={simpleReviewModal} handleModal={handleOneLineReview}>
        <OnelineWriteContainer
          handleModal={handleOneLineReview}
          writeType="create"
          simpleId={0}
        />
      </Modal>
    </Container>
  );
};

export default ReviewWrapper;

const Container = styled.div`
  width: 1200px;
  margin-inline: auto;
`;
