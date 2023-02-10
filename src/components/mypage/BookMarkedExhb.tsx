import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookMarkedExhbApi, ExhibitionListRes } from "../../apis/member";
import useGetNewTokenApi from "../../apis/useGetRefreshToken";
import { Exhibition } from "../../types/exhbList";
import isApiError from "../../utils/isApiError";
import ExhbCardList from "../exhibitionList/ExhbCardList";
import NoList from "../NoList";
import Pagination from "../Pagination";

const BookMarkedExhb = () => {
  const getNewTokenApi = useGetNewTokenApi;

  const navigate = useNavigate();
  const [exhibitionList, setExhibitionList] = useState<Exhibition[] | []>([]);
  const [pageInfoList, setPageInfoList] = useState({
    page: 0,
    size: 0,
    totalElement: 0,
    totalPage: 0,
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });

  const getBookMarkedExhb = useCallback(
    async (pageNo: number) => {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res: AxiosResponse<ExhibitionListRes> = await BookMarkedExhbApi(
          pageNo
        );
        const { exhibitions, pageInfo } = res.data;
        setExhibitionList(exhibitions);
        setPageInfoList(pageInfo);
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes: AxiosResponse<ExhibitionListRes> =
            await BookMarkedExhbApi(pageNo);
          if (!reRes) return;
          const { exhibitions, pageInfo } = reRes.data;
          setExhibitionList(exhibitions);
          setPageInfoList(pageInfo);
        }
      }
      navigate(`?type=exhibition&pageno=${pageNo}`);
    },
    [navigate, getNewTokenApi]
  );

  useEffect(() => {
    getBookMarkedExhb(pages.selected);
  }, [getBookMarkedExhb, pages.selected]);

  return (
    <div>
      {exhibitionList.length === 0 ? (
        <NoList notice="아직 작성한 글이 없습니다" />
      ) : (
        <ExhbCardList exhbList={exhibitionList} type="myPage" />
      )}
      <Pagination
        pages={pages}
        setPages={setPages}
        totalPage={pageInfoList.totalPage}
      />
    </div>
  );
};

export default BookMarkedExhb;
