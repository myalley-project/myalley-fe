import React from "react";
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

const MateList = ({ mates, pageInfo }: MateListType) => {
  console.log(mates);
  return (
    <Card>
      <Thumbnail src={mates.exhibition.posterUrl} alt="exhibition-img" />
      <FindMateDetail>
        <TitleAndEdit>
          <Title>{mates.title}</Title>
          <BtnContainer>
            <EditBtn type="button">수정</EditBtn>
            <div>
              <img src={partition} alt="bar" style={{ paddingTop: "6px" }} />
            </div>
            <EditBtn type="button">삭제</EditBtn>
          </BtnContainer>
        </TitleAndEdit>
        <Subscript>
          <SubscriptWrapper>
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
          <SubscriptWrapper>
            조회수 <span>{mates.viewCount}</span>
          </SubscriptWrapper>
        </Subscript>
        <ExhibitionDetail className="exhibition-detail">
          <ExhibitionTitle>{mates.exhibition.exhibitionTitle}</ExhibitionTitle>
          <ExSubscript>
            <ExSubscriptWrapper>
              관람 예정일 <span>{mates.availableDate}</span>
            </ExSubscriptWrapper>
            <ExSubscriptWrapper>
              메이트 성별 <span>{mates.mateGender}</span>
            </ExSubscriptWrapper>
            <ExSubscriptWrapper>
              메이트 나이 <span>{mates.mateAge}</span>
            </ExSubscriptWrapper>
          </ExSubscript>
        </ExhibitionDetail>
      </FindMateDetail>
    </Card>
  );
};

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
    .exhibition-detail {
      background-color: ${(props) => props.theme.colors.secondary5};
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
  color: ${(props) => props.theme.colors.primry80};
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
  color: ${(props) => props.theme.colors.primry60};
  > span {
    padding-left: 4px;
    font-weight: 700;
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
  color: ${(props) => props.theme.colors.primry80};
`;
