import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import partition from "../../assets/icons/partition.svg";
import firstSlideImage from "../../assets/images/firstSlideImage.jpg";

interface MateListType {
  mates: {
    mateId: number;
    title: string;
    availableDate: string;
    status: string;
    mateGender: string;
    mateAge: string;
    createdAt: string;
    viewCount: number;
    exhibition: {
      exhibitionId: number;
      exhibitionTitle: string;
      exhibitionSpace: string;
      posterUrl: string;
      exhibitionStatus: string;
    };
  };
  pageInfo: object;
}

const MateList = ({ mates, pageInfo }: MateListType) => (
  <Link to="/" style={{ textDecoration: "none" }}>
    <Card>
      <Thumbnail src={mates.exhibition.posterUrl} alt="exhibition-img" />
      <FindMateDetail>
        <TitleAndEdit>
          <Title className="title">{mates.title}</Title>
          {/* 본인이 쓴 글일 경우 */}
          {1 + 1 == 2 && (
            <BtnContainer>
              <EditBtn type="button">수정</EditBtn>
              <div>
                <img src={partition} alt="bar" style={{ paddingTop: "6px" }} />
              </div>
              <EditBtn type="button">삭제</EditBtn>
            </BtnContainer>
          )}
        </TitleAndEdit>
        <Subscript>
          <SubscriptWrapper className="subscription-wrapper">
            등록일 <span>{mates.createdAt}</span>
          </SubscriptWrapper>
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
          <SubscriptWrapper className="subscription-wrapper">
            조회수 <span>{mates.viewCount}</span>
          </SubscriptWrapper>
        </Subscript>
        <ExhibitionDetail className="exhibition-detail">
          <ExhibitionTitle className="exhibition-title">
            {mates.exhibition.exhibitionTitle}
          </ExhibitionTitle>
          <ExSubscript>
            <ExSubscriptWrapper className="subscription-wrapper">
              관람 예정일 <span>{mates.availableDate}</span>
            </ExSubscriptWrapper>
            <ExSubscriptWrapper className="subscription-wrapper">
              메이트 성별 <span>{mates.mateGender}</span>
            </ExSubscriptWrapper>
            <ExSubscriptWrapper className="subscription-wrapper">
              메이트 나이 <span>{mates.mateAge}</span>
            </ExSubscriptWrapper>
          </ExSubscript>
        </ExhibitionDetail>
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
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.primry60};
    .title {
      color: ${(props) => props.theme.colors.primry80};
    }
    .subscription-wrapper {
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

const BtnContainer = styled.div`
  display: flex;
  height: 28px;
`;

const EditBtn = styled.button`
  padding: 4px 10px;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.greys10};
    border-radius: 10px;
    color: ${(props) => props.theme.colors.greys100};
  }
  &:focus-visible {
    border: 1px solid ${(props) => props.theme.colors.greys100};
    color: ${(props) => props.theme.colors.greys100};
  }
`;

const Subscript = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const ExSubscript = styled(Subscript)`
  gap: 30px;
  margin-bottom: 0;
`;

const SubscriptWrapper = styled.div`
  font-weight: 500;
  font-size: 12px;
  color: ${(props) => props.theme.colors.greys60};
  > span {
    padding-left: 4px;
    font-weight: 700;
    color: ${(props) => props.theme.colors.greys80};
  }
`;

const ExSubscriptWrapper = styled(SubscriptWrapper)`
  font-size: 14px >span {
    padding-left: 10px;
  }
`;

const ExhibitionDetail = styled.div`
  padding: 30px;
  background-color: ${(props) => props.theme.colors.greys5};
  border-radius: 16px;
`;

const ExhibitionTitle = styled.p`
  margin-bottom: 14px;
  font-weight: 500;
  font-size: 20px;
  color: ${(props) => props.theme.colors.greys90};
`;
