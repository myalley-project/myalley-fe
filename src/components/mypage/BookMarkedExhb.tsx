import { AxiosResponse } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookMarkedExhbApi, ExhibitionListRes } from "../../apis/member";
import { Exhibition } from "../../types/exhbList";
import isApiError from "../../utils/isApiError";
import ExhbCardList from "../exhibitionList/ExhbCardList";
import NoList from "../NoList";
import Pagination from "../Pagination";

const BookMarkedExhb = () => {
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

  const getImgAndId = (imgUrl: string, exhbId: number) => {};

  const getBookMarkedExhb = useCallback(
    async (pageNo: number) => {
      try {
        const res: AxiosResponse<ExhibitionListRes> = await BookMarkedExhbApi(
          pageNo
        );
        const { exhibitions, pageInfo } = res.data;
        setExhibitionList(exhibitions);
        setPageInfoList(pageInfo);
      } catch (err) {
        isApiError(err);
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
        <NoList />
      ) : (
        <ExhbCardList
          exhbList={exhibitionList}
          type="myPage"
          getImgAndId={getImgAndId}
        />
      )}
      {pageInfoList.totalPage > 0 && (
        <Pagination
          pages={pages}
          setPages={setPages}
          totalPage={pageInfoList.totalPage}
        />
      )}
    </div>
  );
};

export default BookMarkedExhb;
