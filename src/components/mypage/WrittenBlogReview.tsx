import { AxiosResponse } from "axios";
import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { BlogReviewListRes, myBlogReviewsApi } from "../../apis/member";
import useGetNewTokenApi from "../../apis/useGetRefreshToken";
import isApiError from "../../utils/isApiError";
import BlogReviewCard from "../blogReviewList/ReviewCard";
import Pagination from "../Pagination";

const WrittenBlogReview = () => {
  const getNewTokenApi = useGetNewTokenApi;
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  // 내가 쓴 블로그 리뷰 목록 조회
  const getBlogReview = async (pageNo: number) => {
    const res: AxiosResponse<BlogReviewListRes> = await myBlogReviewsApi(
      pageNo
    );
    return res.data;
  };

  const { isError, isLoading, error, data } = useQuery({
    queryKey: ["mypage", { pages }],
    queryFn: () => getBlogReview(pages.selected),
  });

  if (isLoading) return <div />;

  return (
    <Container>
      <CardWrapper>
        {data &&
          data?.blogInfo.map((each) => (
            <BlogReviewCard
              key={each.id}
              id={each.id}
              title={each.title}
              writer={each.writer}
              viewCount={each.viewCount}
              viewDate={each.date}
              imageInfo={each.imageInfo}
            />
          ))}
      </CardWrapper>
      {data?.pageInfo && (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={data.pageInfo.totalPage}
        />
      )}
    </Container>
  );
};

export default WrittenBlogReview;

const Container = styled.div`
  margin-inline: auto;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: auto;
  gap: 30px;
  margin-bottom: 120px;
`;
