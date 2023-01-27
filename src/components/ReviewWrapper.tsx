import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import ReviewSearchbar from "./ReviewSearchbar";
import OnelineCard from "./onelineReview/OnelineCard";
import onelineReviewApis from "../apis/onelineReviewapis";

const getReviews = async (
  baseUrl = "",
  exhibitionId = "",
  pageNo = 0,
  Type = "Recent"
) => {
  const response = await axios.get(
    `${baseUrl}simple-reviews/exhibitions/${exhibitionId}?page=${pageNo}&order=${Type}`
  );
  return response;
};

const ReviewWrapper = () => {
  const [filter, setFilter] = useState("oneline");
  const [page, setPage] = useState(1);
  const [orderType, setOrderType] = useState("Recent");

  const { id } = useParams();

  const { error, data, isPreviousData } = useQuery({
    queryKey: ["simpleReviews", { page }],
    keepPreviousData: true,
    queryFn: () => onelineReviewApis.getReviews(id, page, orderType),
  });

  return (
    <Container>
      <ReviewSearchbar setFilter={setFilter} />
      <Button onClick={() => setPage((p) => p + 1)} type="button">
        버튼!!!!
      </Button>
      {filter === "oneline" ? (
        <OnelineContainer>
          <OnelineCard />
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
