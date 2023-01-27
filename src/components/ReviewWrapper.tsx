import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import ReviewSearchbar from "./ReviewSearchbar";
import OnelineCard from "./onelineReview/OnelineCard";
import { OnelineReviewReadType } from "../types/OnelineReview";
import onelineReviewApis from "../apis/onelineReviewapis";

const ReviewWrapper = () => {
  const [filter, setFilter] = useState("oneline");
  const [page, setPage] = useState(1);
  const [orderType, setOrderType] = useState("Recent");
  const { id } = useParams();

  const { error, data } = useQuery<
    Promise<AxiosResponse<any, any>>,
    Error,
    OnelineReviewReadType
  >({
    queryKey: ["simpleReviews", { page, orderType }],
    queryFn: () => onelineReviewApis.getReviews(id, page, orderType),
  });

  if (error) return <div>{error.message}</div>;

  return (
    <Container>
      <ReviewSearchbar
        totalElement={data?.pageInfo.totalElement as number}
        setFilter={setFilter}
        setOrderType={setOrderType}
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
      {filter === "blog" ? <div /> : null}
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
