import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import blogReviewApis from "../apis/blogReviewApis";
import BlogReviewDetailPresentation from "../components/blogreview/presentation/BlogReviewDetailPresentation";
import BlogReviewDetailContainer from "../components/blogreview/container/BlogReviewDetailContainer";

interface LocationState {
  state: {
    posterUrl: string;
    title: string;
    duration: string;
    space: string;
    adultPrice: number;
    webLink: string;
    id: number;
    bookmarked: boolean;
  };
}

const BlogReviewDetail = () => {
  const location: LocationState = useLocation();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogReviewDetail"],
    queryFn: () => blogReviewApis.readDetailBlogReview(location?.state.id),
  });

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <Container>
      <BlogReviewDetailContainer />
      {data ? (
        <BlogReviewDetailPresentation
          id={data.id}
          title={data.title}
          content={data.content}
          congestion={data.congestion}
          transportation={data.transportation}
          revisit={data.revisit}
          memberInfo={data.memberInfo}
          createdAt={data.createdAt}
          time={data.time}
          viewCount={data.viewCount}
          viewDate={data.viewDate}
          likeCount={data.likeCount}
          bookmarkCount={data.bookmarkCount}
          bookmarkStatus={data.bookmarkStatus}
          likeStatus={data.likeStatus}
          imageInfo={data.imageInfo}
          exhibitionInfo={data.exhibitionInfo}
        />
      ) : null}
    </Container>
  );
};

export default BlogReviewDetail;

const Container = styled.div`
  width: 100dvw;
  width: 100vw;
  text-align: center;
  border-radius: 0px;
`;
