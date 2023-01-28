import React, { ChangeEvent, useReducer } from "react";
import styled from "styled-components";
import ReviewTitle from "../components/blogreview/ReviewTitle";
import ExhibitionSelect from "../components/blogreview/ExhibitionSelect";
import Calender from "../components/Calendar";
import SubTitle from "../components/SubTitle";
import Editor from "../components/Editor";
import Selectbox from "../components/atom/Selectbox";
import { theme } from "../styles/theme";
import getTimeOptions from "../utils/timeSelector";
import Button from "../components/atom/Button";

interface BlogReviewPost {
  blogInfo: {
    title: string;
    viewDate: string;
    time: string;
    transportation: string;
    revisit: string;
    congestion: string;
    content: string;
    exhibition: number;
  };
  images: FormData[] | [];
}

const initialState: BlogReviewPost = {
  blogInfo: {
    title: "",
    viewDate: "",
    time: "",
    transportation: "",
    revisit: "",
    congestion: "",
    content: "",
    exhibition: 0,
  },
  images: [],
};

const enum ReducerActionType {
  Title,
  ViewDate,
  Time,
  TransporTation,
  Revisit,
  Congestion,
  Content,
  Exhibition,
  Images,
}

type ReducerAction = {
  type: ReducerActionType;
  payload?: string;
};

const reducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  switch (action.type) {
    case ReducerActionType.Title:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, title: action.payload ?? "" },
      };
    case ReducerActionType.ViewDate:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, viewDate: action.payload ?? "" },
      };
    case ReducerActionType.Time:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, time: action.payload ?? "" },
      };
    case ReducerActionType.TransporTation:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, transportation: action.payload ?? "" },
      };
    case ReducerActionType.Revisit:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, revisit: action.payload ?? "" },
      };
    case ReducerActionType.Congestion:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, congestion: action.payload ?? "" },
      };
    case ReducerActionType.Content:
      return {
        ...state,
        blogInfo: { ...state.blogInfo, content: action.payload ?? "" },
      };
    case ReducerActionType.Exhibition:
      return {
        ...state,
        blogInfo: {
          ...state.blogInfo,
          exhibition: Number(action.payload),
        },
      };
    default:
      return state;
  }
};

const BlogReviewWrite = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ReducerActionType.Title, payload: event.target.value });
  };

  return (
    <Container>
      <div style={{ marginBottom: "30px" }}>
        <ReviewTitle handleTitleInput={handleTitleInput} />
        <ExhibitionPicker>
          <ExhibitionSelect />
          <div>
            <SubTitle text="관람일" />
            <Calender />
          </div>
        </ExhibitionPicker>
        <SelectorConatiner>
          <SubTitle text="관람 시간" />
          <SelectContainer>
            <TimeSelector>
              <p>입장</p>
              <Selectbox
                onClick={(
                  e: React.MouseEvent<HTMLElement>,
                  name = "입장시간"
                ) => {}}
                options={getTimeOptions()}
                placeholder="00시"
                name="입장시간"
                width="130px"
              />
            </TimeSelector>
            <TimeSelector>
              <p>퇴장</p>
              <Selectbox
                onClick={(
                  e: React.MouseEvent<HTMLElement>,
                  name = "퇴장시간"
                ) => {}}
                options={getTimeOptions()}
                placeholder="24시"
                name="퇴장시간"
                width="130px"
              />
            </TimeSelector>
          </SelectContainer>
        </SelectorConatiner>

        <ConvinenceSelector>
          <SelectorConatiner>
            <SubTitle text="혼잡도" />
            <SelectContainer>
              <TimeSelector>
                <Selectbox
                  onClick={(
                    e: React.MouseEvent<HTMLElement>,
                    name = "sjei"
                  ) => {}}
                  options={["상관 없음", "남자", "여자"]}
                  placeholder="상관 없음"
                  name="원하는 메이트 성별"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
          <SelectorConatiner>
            <SubTitle text="교통 수단" />
            <SelectContainer>
              <TimeSelector>
                <Selectbox
                  onClick={(
                    e: React.MouseEvent<HTMLElement>,
                    name = "sjei"
                  ) => {}}
                  options={["상관 없음", "남자", "여자"]}
                  placeholder="상관 없음"
                  name="원하는 메이트 성별"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
          <SelectorConatiner>
            <SubTitle text="재방문 의향" />
            <SelectContainer>
              <TimeSelector>
                <Selectbox
                  onClick={(
                    e: React.MouseEvent<HTMLElement>,
                    name = "sjei"
                  ) => {}}
                  options={["상관 없음", "남자", "여자"]}
                  placeholder="상관 없음"
                  name="원하는 메이트 성별"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
        </ConvinenceSelector>
        <Editor textChangeHandler={() => {}}>
          <div>{}</div>
        </Editor>
      </div>
      <ButtonContainer>
        <Button variant="text" size="large">
          취소하기
        </Button>
        <Button variant="primary" size="large">
          등록하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default BlogReviewWrite;

const Container = styled.div`
  width: 75vw;
  padding: 30px;
  margin: 50px auto;
`;

const ExhibitionPicker = styled.div`
  display: grid;
  /* justify-content: flex-start;
  align-items: stretch; */
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  align-content: start;
  /* gap: 30px; */
  padding: 0px;
  margin-bottom: 30px;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const TimeSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  & > p {
    color: ${theme.colors.greys60};
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

const ConvinenceSelector = styled.div`
  display: flex;
  gap: 20px;
`;

const SelectorConatiner = styled.div`
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
