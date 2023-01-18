import React from "react";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import bookmarkIcon from "../../assets/icons/like.svg";
import { Exhibition } from "../../types/exhbList";
import putExhbBookmarkApi from "../../apis/putExhbBookmark";

interface ExhibitionCardType {
  exhbData: Exhibition;
}

const ExhibitionCard = (props: ExhibitionCardType) => {
  const { exhbData } = props;
  const { id, title, space, startDate, endDate, posterUrl } = exhbData;

  // 전시글 북마크 api_박예선_23.01.16
  const handleBookmark = async (exhbId: number) => {
    // 북마크 api, 아이콘 완성 후 추가에정
    try {
      const res: AxiosResponse = await putExhbBookmarkApi(exhbId);
    } catch (err) {
      alert("죄송합니다.\n 다시 시도해주십시오.");
    }
  };

  return (
    <ExhibitionCardContainer className="border">
      <Link to={`/exhibition/${id}`}>
        <img alt="thumbnail" className="thumbnail border" src={posterUrl} />
      </Link>
      <div className="content-box flex">
        <div className="content">
          <Link className="content-top" to={`/exhibition/${id}`}>
            <div className="title">{title}</div>
            <div className="space">{space}</div>
          </Link>
          <div className="content-footer">
            <div className="exhb-period">
              {startDate} ~ {endDate}
            </div>
            <button
              type="button"
              className="bookmark-box flex"
              onClick={() => {
                handleBookmark(id);
              }}
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
    </ExhibitionCardContainer>
  );
};

export default ExhibitionCard;

const ExhibitionCardContainer = styled.div`
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
