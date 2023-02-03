import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery, UseQueryResult } from "react-query";
import ReviewSearchbar from "./ReviewSearchbar";
import OnelineCard from "./onelineReview/OnelineCard";
import {
  OnelineReviewCardType,
  OnelineReviewReadType,
} from "../types/oneLineReview";
import oneLineReviewApis from "../apis/oneLineReviewApis";
import Pagination from "./Pagination";
import OnelineWrapper from "../pages/OnelineWrapper";
import Modal from "../Modal";

type ReviewFilter = "oneline" | "blog";

const ReviewWrapper = () => {
  const [simpleReviewModal, setSimpleReviewModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<ReviewFilter>("oneline");
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });
  const [orderType, setOrderType] = useState("Recent");
  const { id } = useParams();

  const handleOneLineReview = () => {
    setSimpleReviewModal((prev) => !prev);
  };

  const {
    isLoading,
    isError,
    error,
    data,
  }: UseQueryResult<OnelineReviewReadType, Error> = useQuery({
    queryKey: ["simpleReviews", { page: pages.selected, orderType }],
    queryFn: () => oneLineReviewApis.getReviews(id, pages.selected, orderType),
  });

  // if (isLoading) return <div>...loading</div>;

  // if (isError) return <div>{error.message}</div>;

  return (
    <Container>
      <ReviewSearchbar
        totalElement={data ? data?.pageInfo.totalElement : 0}
        filter={filter}
        setFilter={setFilter}
        setOrderType={setOrderType}
        handleReviewModal={handleOneLineReview}
      />
      {filter === "oneline" ? (
        <OnelineContainer>
          {data &&
            data.simpleInfo.map((each) => (
              <div key={each.id}>
                <OnelineCard
                  id={each.id}
                  viewDate={each.viewDate}
                  rate={each.rate}
                  content={each.content}
                  time={each.time}
                  congestion={each.congestion}
                  memberInfo={each.memberInfo}
                />
              </div>
            ))}
        </OnelineContainer>
      ) : null}
      {filter === "blog" ? <div>블로그 작업영역!</div> : null}
      {data ? (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={data.pageInfo.totalElement}
        />
      ) : null}
      <Modal open={simpleReviewModal} handleModal={handleOneLineReview}>
        <OnelineWrapper writeType="create" simpleId={0} />
      </Modal>
    </Container>
  );
};

export default ReviewWrapper;

const Container = styled.div`
  width: 1200px;
  margin-inline: auto;
`;

const OnelineContainer = styled.div`
  display: flex;
  flex-flow: column;
`;

const Button = styled.button`
  border: 1px solid blue;
`;
