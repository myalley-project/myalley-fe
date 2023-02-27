import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import blogReviewApis from "../apis/blogReviewApis";
import BlogReviewPresentation from "../components/blogreview/presentation/BlogReviewPresentation";
import BlogReviewTop from "../components/blogreview/container/BlogReviewTop";

interface LocationState {
  state: number;
}

const BlogReview = () => {
  const location: LocationState = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogReviewDetail"],
    queryFn: () => blogReviewApis.readDetailBlogReview(location?.state),
  });
  const memberInfo = data?.memberInfo ?? {
    memberId: 0,
    memberImage: "",
    nickname: "",
  };
  const isMemberId = !!localStorage.getItem("memberId");

  if (isError) return <div>에러가 발생했습니다</div>;

  return (
    <>
      {data && (
        <TopContainer>
          <BlogReviewTop
            id={data?.exhibitionInfo.id}
            memberInfo={memberInfo}
            blogReviewId={data?.id}
            exhibitionInfo={data?.exhibitionInfo}
          />
        </TopContainer>
      )}
      {data && (
        <PresentationContainer>
          <BlogReviewPresentation
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
        </PresentationContainer>
      )}
    </>
  );
};

export default BlogReview;

const TopContainer = styled.div`
  padding: 50px 0;
  border-radius: 0;
  background-color: rgba(149, 141, 165, 0.05);
  @media (max-width: 1280px) {
    padding: 50px 20px;
  }
  @media (max-width: 1064px) {
    padding: 50px 16px;
  }
`;

const PresentationContainer = styled.div`
  @media (max-width: 1280px) {
    padding: 0 20px;
  }
  @media (max-width: 1064px) {
    padding: 0 16px;
  }
`;
