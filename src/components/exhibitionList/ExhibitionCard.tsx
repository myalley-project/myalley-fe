import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Exhibition } from "../../types/exhbList";

const ExhibitionCard = (props: ExhibitionCardType) => {
  const { exhbData } = props;
  const { id, title, space, duration, posterUrl, viewCount } = exhbData;

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
          <div className="content-footer flex space-between">
            <div className="exhb-period">{duration}</div>
            <span className="viewCount">조회수 {viewCount}</span>
          </div>
        </div>
      </div>
    </ExhibitionCardContainer>
  );
};

export default ExhibitionCard;

interface ExhibitionCardType {
  exhbData: Exhibition;
}

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
        .viewCount {
          color: #9c9c9c;
          font-size: 14px;
        }
      }
    }
  }
`;
