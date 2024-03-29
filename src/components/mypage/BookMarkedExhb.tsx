import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookMarkedExhbApi, ExhibitionListRes } from "../../apis/member";
import getNewTokenApi from "../../apis/getRefreshToken";
import { Exhibition } from "../../types/exhbList";
import isApiError from "../../utils/isApiError";
import ExhbCardList from "../exhibitionList/ExhbCardList";
import NoList from "../NoList";
import Pagination from "../Pagination";

const BookMarkedExhb = () => {
  const navigate = useNavigate();
  const [exhibitionList, setExhibitionList] = useState<Exhibition[] | []>([]);
  const [totalPageNum, setTotalPageNum] = useState(0);
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
        const { exhibitions, totalPage } = res.data;
        setExhibitionList(exhibitions);
        setTotalPageNum(totalPage);
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes: AxiosResponse<ExhibitionListRes> =
            await BookMarkedExhbApi(pageNo);
          if (!reRes) return;
          const { exhibitions, totalPage } = reRes.data;
          setExhibitionList(exhibitions);
          setTotalPageNum(totalPage);
        }
      }
      navigate(`?type=exhibition&pageno=${pageNo}`);
    },
    [navigate]
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
      <Pagination pages={pages} setPages={setPages} totalPage={totalPageNum} />
    </div>
  );
};

export default BookMarkedExhb;
