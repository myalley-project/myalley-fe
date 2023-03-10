import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookMarkedMateApi, MateRes } from "../../apis/member";
import getNewTokenApi from "../../apis/getRefreshToken";
import { Mate } from "../../types/mateList";
import isApiError from "../../utils/isApiError";
import MateCard from "../mate/MateCard";
import NoList from "../NoList";
import Pagination from "../Pagination";

const BookMarkedMate = () => {
  const navigate = useNavigate();
  const [matesList, setMatesList] = useState<Mate[] | []>([]);
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
  const getBookMarkedMate = useCallback(
    async (pageNo: number) => {
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res: AxiosResponse<MateRes> = await BookMarkedMateApi(pageNo);
        const { mates, pageInfo } = res.data;
        setMatesList(mates);
        setPageInfoList(pageInfo);
      } catch (err) {
        const errorRes = isApiError(err);
        if (errorRes === "accessToken 만료") {
          await getNewTokenApi(refreshToken);
          const reRes: AxiosResponse<MateRes> = await BookMarkedMateApi(pageNo);
          if (!reRes) return;
          const { mates, pageInfo } = reRes.data;
          setMatesList(mates);
          setPageInfoList(pageInfo);
        }
      }
      navigate(`?type=mate&pageno=${pageNo}`);
    },
    [navigate]
  );

  useEffect(() => {
    getBookMarkedMate(pages.selected);
  }, [getBookMarkedMate, pages.selected]);

  return (
    <div>
      {matesList.length === 0 ? (
        <NoList notice="북마크한 메이트 모집글이 없습니다" />
      ) : (
        matesList.map((mate) => <MateCard key={mate.mateId} mate={mate} />)
      )}
      <Pagination
        pages={pages}
        setPages={setPages}
        totalPage={pageInfoList.totalPage}
      />
    </div>
  );
};

export default BookMarkedMate;
