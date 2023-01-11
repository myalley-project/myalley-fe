import React, { useCallback, useEffect, useRef, useState } from "react";
import { AxiosResponse } from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import bookmarkIcon from "../assets/icons/like.svg";
import arrowRightIcon from "../assets/icons/arrowRight.svg";
import arrowLeftIcon from "../assets/icons/arrowLeft.svg";
import arrowRightDoubleIcon from "../assets/icons/arrowRightDouble.svg";
import arrowLeftDoubleIcon from "../assets/icons/arrowLeftDouble.svg";
import { ExhbType } from "../types/exhbList";
import exhbListApi, {
  ExhbListRes,
  FilterType,
  StatusType,
} from "../apis/getExhbList";

const EXHB_STATUS_ARRAY: StatusType[] = ["현재", "예정", "지난"];
const EXHB_SORT_ARRAY = ["최신순", "인기순"];
const EXHB_TYPE_ARRAY: FilterType[] = [
  "전체",
  "영상",
  "특별",
  "기획",
  "상설",
  "소장품",
];

interface SelectedFilters {
  sort: string;
  type: FilterType;
}

// 전시회 목록 조회 페이지_박예선_23.01.17
const ExhibitionList = () => {
  const [exhbList, setExhbList] = useState<ExhbType[]>([]);
  const [totalPage, setTotalPage] = useState<number | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<StatusType>("현재");
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    sort: "최신순",
    type: "전체",
  });
  const [pages, setPages] = useState({
    started: 1,
    selected: 1,
  });
  const typeFilterRef = useRef<HTMLSelectElement>(null);

  // 3. 선택페이지 바뀔 경우(상황, 필터 둘다 적용해서 호출)

  // 전시 상황별 리스트 요청 api_박예선_23.01.18
  const getStatusExhbList = useCallback(
    async (status: StatusType, type: FilterType) => {
      try {
        const res: AxiosResponse<ExhbListRes> = await exhbListApi(
          status,
          type,
          pages.selected
        );
        const { exhibitions, pageInfo } = res.data;
        setExhbList(exhibitions);
        setTotalPage(pageInfo.totalPage);
        setSelectedFilters({
          sort: EXHB_SORT_ARRAY[0],
          type: EXHB_TYPE_ARRAY[0],
        });
      } catch (err) {
        alert(
          "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
        );
      }
    },
    [pages.selected]
  );

  // 첫 렌더링 시 전시목록 불러오는 로직_박예선_23.01.18
  useEffect(() => {
    getStatusExhbList("현재", "전체");
  }, [getStatusExhbList]);

  // 전시타입 필터 적용한 리스트 요청 api_박예선_23.01.18
  const getFilteredExhbList = async () => {
    try {
      const res: AxiosResponse<ExhbListRes> = await exhbListApi(
        selectedStatus,
        selectedFilters.type,
        pages.selected
      );
      const { exhibitions, pageInfo } = res.data;
      setExhbList(exhibitions);
      setTotalPage(pageInfo.totalPage);
    } catch (err) {
      alert(
        "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
      );
    }
  };

  // 테스트용
  useEffect(() => {
    if (typeFilterRef.current) {
      const type = typeFilterRef.current.name;
      console.log("name: ", type);
    }
  }, [typeFilterRef.current?.name, selectedFilters.type]);

  // 필터 적용버튼 클릭 함수_박예선_23.01.18
  const clickFilterApplyBtn = () => {
    const appliedType = typeFilterRef.current?.name;
    console.log(
      EXHB_TYPE_ARRAY.filter((type) => [appliedType].includes(type)).length
    );
    for (let i = 0; i < EXHB_TYPE_ARRAY.length; i += 1) {
      if (appliedType === EXHB_TYPE_ARRAY[i])
        setSelectedFilters({ ...selectedFilters, type: appliedType });
    }
  };

  //  페이지 버튼 변경될 시 전시목록 불러오는 로직_박예선_23.01.18
  const getPagedExhbList = useCallback(
    async (page: number) => {
      try {
        const res: AxiosResponse<ExhbListRes> = await exhbListApi(
          selectedStatus,
          selectedFilters.type,
          page
        );
        const { exhibitions, pageInfo } = res.data;
        setExhbList(exhibitions);
        setTotalPage(pageInfo.totalPage);
      } catch (err) {
        alert(
          "죄송합니다.\n전시목록을 불러오는데에 실패하였습니다. 다시 시도해주십시오."
        );
      }
    },
    [selectedFilters.type, selectedStatus]
  );

  // 페이지 번호 변경될 시 전시목록 불러오는 로직_박예선_23.01.18
  useEffect(() => {
    if (pages.selected !== 1) {
      getPagedExhbList(pages.selected);
    }
  }, [getPagedExhbList, pages.selected]);

  // 전시상황 버튼 클릭 함수_박예선_23.01.18
  const handleStatusBtn = (status: StatusType) => {
    setPages({ started: 1, selected: 1 });
    setSelectedStatus(status);
    getStatusExhbList(status, selectedFilters.type);
  };

  // 필터 조건 핸들 함수_박예선_23.01.17
  const handleFilters = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value === "인기순") {
      alert("준비 중인 기능입니다.");
      return;
    }
    // setSelectedFilters({ ...selectedFilters, [name]: value });
    if (typeFilterRef.current) {
      typeFilterRef.current.name = value;
    }
  };

  // 전시글 북마크 api_박예선_23.01.16
  const handleBookmark = () => {
    console.log("bookmark");
    // 북마크 api, 아이콘 완성 후 추가에정
  };

  // 페이지 넘버 클릭 함수_박예선_23.01.16
  const clickPageNo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newSelected = Number(e.currentTarget.innerHTML);
    if (newSelected !== pages.selected) {
      setPages({ ...pages, selected: newSelected });
    }
  };

  // 좌우 페이지 방향버튼 클릭 함수_박예선_23.01.16
  const handlePageArrow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { started, selected } = pages;
    const { name } = e.currentTarget;
    if (!totalPage) return;
    if (name === "doubleMinus") {
      if (started !== 1) {
        setPages({ started: started - 5, selected: started - 1 });
      }
      if (started === 1) {
        setPages({ ...pages, selected: 1 });
      }
    }
    if (name === "minus") {
      if (selected === 1) return;
      if (started === selected) {
        setPages({ started: started - 5, selected: selected - 1 });
      }
      if (selected - started >= 1)
        setPages({ ...pages, selected: selected - 1 });
    }
    if (name === "plus") {
      if (totalPage === selected) return;
      if (selected - started < 4) {
        setPages({ ...pages, selected: selected + 1 });
      }
      if (started + 4 === selected) {
        setPages({ started: started + 5, selected: started + 5 });
      }
    }
    if (name === "doublePlus") {
      if (started >= totalPage - 4) {
        setPages({ ...pages, selected: totalPage });
      }
      if (started < totalPage - 4) {
        setPages({ started: started + 5, selected: started + 5 });
      }
    }
  };

  return (
    <ExhibitionListContainer className="flex">
      <h1>전시회</h1>
      <div className="status-filter flex space-between">
        {EXHB_STATUS_ARRAY.map((status) => (
          <button
            key={status}
            type="button"
            className={selectedStatus === status ? "selected" : ""}
            onClick={() => handleStatusBtn(status)}
          >
            {status} 전시
          </button>
        ))}
      </div>
      <div className="filter-search-line flex space-between">
        <div>
          <select
            className="sort border"
            value={selectedFilters.sort}
            onChange={handleFilters}
          >
            {EXHB_SORT_ARRAY.map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
          <select
            ref={typeFilterRef}
            className="type border"
            onChange={handleFilters}
          >
            {EXHB_TYPE_ARRAY.map((type) => (
              <option key={type} value={type}>
                {type} 전시
              </option>
            ))}
          </select>
          <button
            type="button"
            className="apply-btn"
            // onClick={() =>
            //   getStatusExhbList(selectedStatus, selectedFilters.type)
            // }
            onClick={() => {
              // getFilteredExhbList();
              clickFilterApplyBtn();
            }}
          >
            적용
          </button>
        </div>
        <input placeholder="검색" className="search-input border" />
      </div>
      <CardListContainer className="flex">
        {exhbList.map((exhb) => (
          <ExhibitionCard key={exhb.id} className="border">
            <Link to={`/exhibition/${exhb.id}`}>
              <img
                alt="thumbnail"
                className="thumbnail border"
                src={exhb.posterUrl}
              />
            </Link>
            <div className="content-box flex">
              <div className="content">
                <Link className="content-top" to={`/exhibition/${exhb.id}`}>
                  <div className="title">{exhb.title}</div>
                  <div className="space">{exhb.space}</div>
                </Link>
                <div className="content-footer">
                  <div className="exhb-period">
                    {exhb.startDate} ~ {exhb.endDate}
                  </div>
                  <button
                    type="button"
                    className="bookmark-box flex"
                    onClick={handleBookmark}
                  >
                    <img
                      className="bookmark-icon"
                      alt="bookmark icon"
                      src={bookmarkIcon}
                    />
                    {/* 북마크 누를 때 아이콘은 추후 추가해주시기로 함 */}
                  </button>
                </div>
              </div>
            </div>
          </ExhibitionCard>
        ))}
      </CardListContainer>
      <PageNoContanier>
        <button type="button" name="doubleMinus" onClick={handlePageArrow}>
          <img alt="double left icon" src={arrowLeftDoubleIcon} />
        </button>
        <button type="button" name="minus" onClick={handlePageArrow}>
          <img alt="left icon" src={arrowLeftIcon} />
        </button>
        {pageNoArr(totalPage).map((pageNo) => {
          const { selected, started } = pages;
          if (pageNo >= started && pageNo <= started + 4) {
            return (
              <button
                onClick={clickPageNo}
                className={pageNo === selected ? "selected" : ""}
                key={pageNo}
                type="button"
              >
                {pageNo}
              </button>
            );
          }
          return null;
        })}
        <button type="button" name="plus" onClick={handlePageArrow}>
          <img alt="right icon" src={arrowRightIcon} />
        </button>
        <button type="button" name="doublePlus" onClick={handlePageArrow}>
          <img alt="double right icon" src={arrowRightDoubleIcon} />
        </button>
      </PageNoContanier>
    </ExhibitionListContainer>
  );
};

export default ExhibitionList;

// 페이지 번호 배열 반환 함수_박예선_23.01.18
const pageNoArr = (totalPage: number | undefined) => {
  const newArr = [];
  if (totalPage)
    for (let i = 1; i < totalPage + 1; i += 1) {
      newArr.push(i);
    }
  return newArr;
};

const ExhibitionListContainer = styled.div`
  flex-direction: column;
  align-items: center;
  width: 99vw;
  font-size: 14px;
  h1 {
    margin: 50px 0;
    font-size: 28px;
    font-weight: 700;
  }
  .status-filter {
    align-items: center;
    width: 300px;
    height: 36px;
    margin-bottom: 14px;
    font-size: 14px;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 93px;
      height: inherit;
      color: ${(props) => props.theme.colors.hover};
      font-weight: 700;
      cursor: pointer;
      &.selected {
        color: #1c1c1c;
      }
    }
  }
  .filter-search-line {
    width: inherit;
    padding-top: 14px;
    border-top: 1px solid ${(props) => props.theme.colors.main};
    border-radius: 0%;
    select,
    input,
    button {
      height: 36px;
      font-size: 14px;
      padding-left: 20px;
      cursor: pointer;
    }
    select {
      margin-right: 10px;
      border-radius: 30px;
      color: ${(props) => props.theme.colors.hover};
      background: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
        no-repeat;
      background-size: 11.15px 6.55px;
      background-position: right 16px center;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      &.sort {
        width: 102px;
      }
      &.type {
        width: 117px;
      }
    }
    .apply-btn {
      width: 66px;
      padding: 0;
      border-color: #6750a4;
      background-color: #6750a4;
      color: ${(props) => props.theme.colors.white100};
      font-weight: 700;
      &:active {
        background-color: #483974;
      }
    }
  }
  .search-input {
    width: 277px;
    padding-right: 54px;
    background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11' cy='11' r='6' stroke='%239C9C9C' stroke-width='2'/%3E%3Cpath d='M16.2071 14.7929L15.5 14.0858L14.0858 15.5L14.7929 16.2071L16.2071 14.7929ZM18.2929 19.7071C18.6834 20.0976 19.3166 20.0976 19.7071 19.7071C20.0976 19.3166 20.0976 18.6834 19.7071 18.2929L18.2929 19.7071ZM14.7929 16.2071L18.2929 19.7071L19.7071 18.2929L16.2071 14.7929L14.7929 16.2071Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
      no-repeat;
    background-position: right 25px center;
    &::placeholder {
      color: ${(props) => props.theme.colors.hover};
    }
    &:hover {
      cursor: text;
    }
  }
  &.flex,
  .flex {
    display: flex;
  }
  .space-between {
    justify-content: space-between;
  }
  .border {
    border: 1px solid ${(props) => props.theme.colors.main};
    border-radius: 30px;
  }
`;

const CardListContainer = styled.div`
  width: inherit;
  flex-wrap: wrap;
  margin: 30px 0;
`;

const ExhibitionCard = styled.div`
  position: relative;
  width: 23.43%;
  margin: 0 2.093% 2.093% 0;
  padding-bottom: 42.99%;
  :nth-child(4n) {
    margin: 0 0 2.093% 0;
  }
  .thumbnail {
    position: absolute;
    width: 100%;
    height: 75.5%;
    object-fit: cover;
    cursor: pointer;
  }
  .content-box {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    align-items: center;
    width: 82.24%;
    height: 24.5%;
    .content {
      position: relative;
      width: 100%;
      height: 60.5%;
      .content-top {
        height: 30.4%;
        max-height: 28px;
        color: ${(props) => props.theme.colors.txt};
        text-decoration: none;
        cursor: pointer;
        .title {
          position: relative;
          border-radius: 0;
          font-size: 20px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
        }
        .space {
          line-height: 16px;
          margin: 1.3% 0 0;
          font-size: 12px;
          color: ${(props) => props.theme.colors.hover};
        }
      }
      .content-footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        line-height: 24px;
        .exhb-period {
          color: ${(props) => props.theme.colors.pressed};
          font-size: 14px;
        }
        .bookmark-box {
          position: absolute;
          right: 0;
          bottom: 50%;
          transform: translate(25%, 50%);
          align-items: center;
          justify-content: center;
          height: 40px;
          width: 40px;
          padding: 0;
          cursor: pointer;
          .bookmark-icon {
            width: 20.94px;
          }
        }
      }
    }
  }
`;

const PageNoContanier = styled.div`
  display: flex;
  justify-content: space-between;
  width: 326px;
  height: 30px;
  margin-bottom: 50px;
  button {
    width: 30px;
    height: 30px;
    padding: 0;
    font-weight: 500;
    cursor: pointer;
    &.selected {
      background-color: #6750a4;
      color: ${(props) => props.theme.colors.white100};
    }
  }
`;
