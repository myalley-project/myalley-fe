import { paste } from "@testing-library/user-event/dist/paste";
import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { BlogReviewListRes, BookMarkedBlogApi } from "../../apis/member";
import useGetNewTokenApi from "../../apis/useGetRefreshToken";
import ReviewCardList from "../blogReviewList/ReviewCardList";
import isApiError from "../../utils/isApiError";
import NoList from "../NoList";

const BookMarkedBlog = () => {
  const getNewTokenApi = useGetNewTokenApi();
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });
  const getBookMarkedBlog = useCallback(
    async (pageNo: number) => {
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const res = await BookMarkedBlogApi(pageNo);
        return res.data;
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes = await BookMarkedBlogApi(pageNo);
          if (!reRes) return null;
          const refreshData = reRes.data;
          return refreshData;
        }
      }
      return null;
    },
    [getNewTokenApi]
  );

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["bookmarked"],
    queryFn: () => getBookMarkedBlog(pages.selected),
  });

  if (isError) return <div>...isError</div>;

  return (
    <div>
      {data?.pageInfo.totalElement === 0 ? (
        <NoList notice="북마크한 블로그 리뷰가 없습니다." />
      ) : (
        data?.blogInfo && (
          <ReviewCardList blogInfo={data?.blogInfo} pageInfo={data?.pageInfo} />
        )
      )}
    </div>
  );
};

export default BookMarkedBlog;

const ReviewCardListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: auto;
  gap: 30px;
  margin-bottom: 120px;
`;
