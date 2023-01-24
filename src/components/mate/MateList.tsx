import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Mate } from "../../types/mateList";
import partition from "../../assets/icons/partition.svg";

interface MateListType {
  mates: Mate;
}

const MateList = ({ mates }: MateListType) => (
  <Link to="/" style={{ textDecoration: "none" }}>
    <Card>
      <Thumbnail src={mates.exhibition.posterUrl} alt="exhibition-img" />
      <FindMateDetail>
        <TitleAndEdit>
          <Title className="title">{mates.title}</Title>
        </TitleAndEdit>
        <Subscript>
          {mates.memberNickname && (
            <>
              <div className="subscript-wrapper">{mates.memberNickname}</div>
              <div>
                <img
                  src={partition}
                  alt="bar"
                  style={{
                    margin: "0 10px",
                    height: "13px",
                    paddingBottom: "3px",
                  }}
                />
              </div>
            </>
          )}
          <div className="subscript-wrapper">
            등록일 <span>{mates.createdAt}</span>
          </div>
          <div>
            <img
              src={partition}
              alt="bar"
              style={{
                margin: "0 10px",
                height: "13px",
                paddingBottom: "3px",
              }}
            />
          </div>
          <div className="subscript-wrapper">
            조회수 <span>{mates.viewCount}</span>
          </div>
        </Subscript>
        <div className="exhibition-detail">
          <div className="exhibition-title">
            {mates.exhibition.exhibitionTitle}
          </div>
          <ExSubscript>
            <div className="subscript-wrapper exhb">
              관람 예정일 <span>{mates.availableDate}</span>
            </div>
            <div className="subscript-wrapper exhb">
              메이트 성별 <span>{mates.mateGender}</span>
            </div>
            <div className="subscript-wrapper exhb">
              메이트 나이 <span>{mates.mateAge}</span>
            </div>
          </ExSubscript>
        </div>
      </FindMateDetail>
    </Card>
  </Link>
);

export default MateList;

const Card = styled.div`
  display: flex;
  width: 83vw;
  max-width: 1200px;
  height: 19vh;
  min-height: 274px;
  margin-bottom: 10px;
  border: 1px solid ${(props) => props.theme.colors.greys40};
  box-shadow: 0px 0px 20px rgba(56, 30, 114, 0.1);
  cursor: pointer;

  .subscript-wrapper {
    font-weight: 500;
    font-size: 12px;
    color: ${(props) => props.theme.colors.greys60};
    > span {
      padding-left: 4px;
      font-weight: 700;
      color: ${(props) => props.theme.colors.greys80};
    }
    &.exhb {
      font-size: 14px;
      > span {
        padding-left: 10px;
      }
    }
  }

  .exhibition-detail {
    padding: 30px;
    background-color: ${(props) => props.theme.colors.greys5};
    border-radius: 16px;
  }

  .exhibition-title {
    margin-bottom: 14px;
    font-weight: 500;
    font-size: 20px;
    color: ${(props) => props.theme.colors.greys90};
  }

  &:hover {
    border: 2px solid ${(props) => props.theme.colors.primry60};
    .title {
      color: ${(props) => props.theme.colors.primry80};
    }
    .subscript-wrapper {
      color: ${(props) => props.theme.colors.primry60};
      > span {
        color: ${(props) => props.theme.colors.primry60};
      }
    }
    .exhibition-detail {
      background-color: ${(props) => props.theme.colors.secondary5};
    }
    .exhibition-title {
      color: ${(props) => props.theme.colors.primry80};
    }
  }
`;

const Thumbnail = styled.img`
  width: 175px;
  height: 274px;
`;

const FindMateDetail = styled.div`
  width: 100%;
  padding: 30px;
`;

const TitleAndEdit = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 28px;
  line-height: 36px;
  color: ${(props) => props.theme.colors.greys100};
`;

const Subscript = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const ExSubscript = styled(Subscript)`
  gap: 30px;
  margin-bottom: 0;
`;
