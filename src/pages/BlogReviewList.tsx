import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import useDebounce from "../hooks/useDebounce";
import { theme } from "../styles/theme";
import Button from "../components/atom/Button";
import Selectbox from "../components/atom/Selectbox";
import SearchInput from "../components/atom/SearchInput";
import ReviewCardList from "../components/blogReviewList/ReviewCardList";
import Pagination from "../components/Pagination";
import { BlogReviewResponse } from "../types/blogReview";
import apiInstance from "../utils/apiInstance";
import NoList from "../components/NoList";
import blogReviewApis from "../apis/blogReviewApis";

const BlogReviewList = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });
  const [orderType, setOrderType] = useState<"Recent" | "ViewCount">("Recent");
  const [text, setText] = React.useState("");
  const defferedText = React.useDeferredValue(text);
  const [searchedData, setSearchedData] =
    React.useState<BlogReviewResponse | null>(null);
  const [searchedPage, setSearchedPage] = React.useState({
    started: 1,
    selected: 1,
  });

  const handleReviewWrite = () => {
    if (!localStorage.getItem("memberId")) {
      alert("리뷰를 등록하려면 로그인하셔야 합니다!");
    } else {
      navigate("/blogreview-write");
    }
  };

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const debounceText = useDebounce(handleText, 500);

  const handleOrderType = (event: React.MouseEvent<HTMLElement>) => {
    if (event.currentTarget.textContent === "최신 순") {
      setOrderType("Recent");
    } else {
      setOrderType("ViewCount");
    }
  };

  React.useEffect(() => {
    apiInstance
      .get(
        `/blogs/search?title=${defferedText}&page=${searchedPage.selected ?? 1}`
      )
      .then((res) => res.data as BlogReviewResponse)
      .then(setSearchedData);
  }, [defferedText, searchedPage.selected]);

  const { isError, data } = useQuery<BlogReviewResponse, Error>({
    queryKey: ["blogReviews", { page: pages.selected, orderType }],
    queryFn: () => blogReviewApis.readBlogReviews(pages.selected, orderType),
  });

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <Title>전시 리뷰</Title>
      <Divider />
      <TopLineContainer>
        <Flex>
          <Selectbox
            placeholder="최신 순"
            options={["최신 순", "조회수 순"]}
            width="130px"
            name="정렬 필터"
            onClick={handleOrderType}
          />
        </Flex>
        <Flex style={{ gap: "10px" }}>
          <SearchInput placeholder="검색" onChange={debounceText} />
          <Button
            onClick={handleReviewWrite}
            style={{ padding: "8px 20px" }}
            type="button"
            size="large"
            variant="primary"
          >
            리뷰 등록
          </Button>
        </Flex>
      </TopLineContainer>
      {searchedData &&
      searchedData?.pageInfo?.totalElement > 0 &&
      defferedText !== "" ? (
        <>
          <ReviewCardList
            blogInfo={searchedData.blogInfo}
            pageInfo={searchedData.pageInfo}
          />
          <Pagination
            pages={searchedPage}
            setPages={setSearchedPage}
            totalPage={searchedData?.pageInfo.totalPage ?? 0}
          />
        </>
      ) : (
        data &&
        (searchedData?.pageInfo?.totalElement === 0 && defferedText !== "" ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <NoList notice="검색된 블로그리뷰가 없습니다." />
          </div>
        ) : (
          <>
            <ReviewCardList blogInfo={data.blogInfo} pageInfo={data.pageInfo} />
            <Pagination
              pages={pages}
              setPages={setPages}
              totalPage={data?.pageInfo.totalPage ?? 0}
            />
          </>
        ))
      )}
    </Container>
  );
};

export default BlogReviewList;

const Container = styled.div`
  max-width: 1200px;
  margin-inline: auto;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 28px;
  color: ${theme.colors.greys90};
  text-align: center;
  margin: 40px 0 50px;
`;

const Divider = styled.div`
  border-radius: 0px;
  border-bottom: 1px solid ${theme.colors.greys40};
  margin-bottom: 14px;
`;

const TopLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0px;
  margin-bottom: 30px;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
