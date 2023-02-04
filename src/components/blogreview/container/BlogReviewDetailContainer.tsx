import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { exhbApi } from "../../../apis/exhibition";
import MainCard from "../../exhibition/MainCard";

interface LocationProps {
  state: number;
}

const BlogReviewDetailContainer = () => {
  const location: LocationProps = useLocation();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogCard"],
    queryFn: () => exhbApi(location.state),
  });

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <div>
      {data ? (
        <MainCard
          id={data?.data.id}
          posterUrl={data?.data.posterUrl}
          title={data?.data.title}
          duration={data?.data.duration}
          place={data?.data.space}
          charge={data?.data.adultPrice}
          webLink={data?.data.webLink}
          bookmarked={data?.data.bookmarked as boolean}
        />
      ) : null}
    </div>
  );
};
export default BlogReviewDetailContainer;
