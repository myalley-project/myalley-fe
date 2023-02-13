import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Mate } from "../../types/mateList";
import partition from "../../assets/icons/partition.svg";
import { theme } from "../../styles/theme";

interface MateListType {
  mate: Mate;
}

const MateCard = ({ mate }: MateListType) => {
  const {
    mateId,
    title,
    availableDate,
    mateAge,
    mateGender,
    createdAt,
    viewCount,
    exhibition,
    memberNickname,
  } = mate;
  return (
    <Link to={`/mate/${mateId}`} style={{ textDecoration: "none" }}>
      <Card>
        {exhibition.posterUrl && (
          <Thumbnail src={exhibition.posterUrl} alt="exhibition-img" />
        )}
        <FindMateDetail
          width={exhibition.posterUrl === undefined ? "100%" : "68.4%"}
        >
          <TitleAndEdit>
            <Title className="title">{title}</Title>
          </TitleAndEdit>
          <Subscript>
            {memberNickname && (
              <>
                <div className="subscript-wrapper">{memberNickname}</div>
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
              등록일 <span>{createdAt}</span>
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
              조회수 <span>{viewCount}</span>
            </div>
          </Subscript>
          <div className="exhibition-detail">
            <div className="exhibition-title">{exhibition.exhibitionTitle}</div>
            <ExSubscript>
              <div className="subscript-wrapper exhb">
                관람 예정일 <span>{availableDate}</span>
              </div>
              <div className="subscript-wrapper exhb">
                메이트 성별 <span>{mateGender}</span>
              </div>
              <div className="subscript-wrapper exhb">
                메이트 나이 <span>{mateAge}</span>
              </div>
            </ExSubscript>
          </div>
        </FindMateDetail>
      </Card>
    </Link>
  );
};

export default MateCard;

const Card = styled.div`
  display: flex;
  width: 83vw;
  max-width: 1200px;
  height: 19vh;
  min-height: 274px;
  margin-bottom: 10px;
  border: 1px solid ${theme.colors.greys40};
  border-radius: 32px;
  cursor: pointer;
  .subscript-wrapper {
    font-weight: 500;
    font-size: 12px;
    color: ${theme.colors.greys60};
    > span {
      padding-left: 4px;
      font-weight: 700;
      color: ${theme.colors.greys80};
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
    background-color: ${theme.colors.greys5};
    border-radius: 16px;
  }

  .exhibition-title {
    margin-bottom: 14px;
    font-weight: 500;
    font-size: 20px;
    color: ${theme.colors.greys90};
  }

  &:hover {
    border: 1px solid ${theme.colors.primry60};
    box-shadow: 0px 0px 20px rgba(56, 30, 114, 0.1);
    .title {
      color: ${theme.colors.primry80};
    }
    .subscript-wrapper {
      color: ${theme.colors.primry60};
      > span {
        color: ${theme.colors.primry60};
      }
    }
    .exhibition-detail {
      background-color: ${theme.colors.secondary5};
    }
    .exhibition-title {
      color: ${theme.colors.primry80};
    }
  }
`;

const Thumbnail = styled.img`
  width: 31.6%;
  border-bottom: 1px solid ${theme.colors.greys40};
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  object-fit: cover;
`;

const FindMateDetail = styled.div<{ width: string }>`
  width: ${(props) => props.width};
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
  color: ${theme.colors.greys100};
`;

const Subscript = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const ExSubscript = styled(Subscript)`
  gap: 30px;
  margin-bottom: 0;
`;
