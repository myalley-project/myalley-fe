import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import styled from "styled-components";
import {
  LikedBlogReviewApi,
  BlogReviewListRes,
  BlogInfo,
} from "../../../apis/member";
import useGetNewTokenApi from "../../../apis/useGetRefreshToken";
import ReviewCardList from "../../blogReviewList/ReviewCardList";
import isApiError from "../../../utils/isApiError";
import NoList from "../../NoList";
import Pagination from "../../Pagination";

const LikedBlogReviewContainer = () => {
  const getNewTokenApi = useGetNewTokenApi();
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  const getLikedBlog = useCallback(
    async (pageNo: number) => {
      const refreshToken = localStorage.getItem("refreshToken");
      try {
        const res = await LikedBlogReviewApi(pageNo);
        return res;
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes = await LikedBlogReviewApi(pageNo);
          if (!reRes) return null;
          return reRes;
        }
      }
      return null;
    },
    [getNewTokenApi]
  );

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["bookmarked"],
    queryFn: () => getLikedBlog(pages.selected).then((res) => res?.data),
  });

  if (isLoading) return <div>...isloading</div>;

  if (isError) return <div>...isError</div>;

  return (
    <div style={{ marginTop: "10px" }}>
      {data?.pageInfo.totalElement === 0 ? (
        <NoList notice="북마크한 블로그 리뷰가 없습니다." />
      ) : (
        data?.blogInfo && (
          <>
            <ReviewCardList
              blogInfo={data?.blogInfo}
              pageInfo={data?.pageInfo}
            />
            <Pagination
              pages={pages}
              setPages={setPages}
              totalPage={data?.pageInfo.totalPage}
            />
          </>
        )
      )}
    </div>
  );
};

export default LikedBlogReviewContainer;
