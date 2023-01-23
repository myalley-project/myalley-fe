import React, { ChangeEvent, useReducer } from "react";
import styled from "styled-components";
import ReviewTitle from "../components/blogreview/ReviewTitle";
import ExhibitionSelect from "../components/blogreview/ExhibitionSelect";
import Calender from "../components/Calendar";
import SubTitle from "../components/SubTitle";
import Selector from "../components/Selector";
import Editor from "../components/Editor";

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
        <Selector options={["1", "2", "3", "4", "5"]} width="123px" />
        <Selector options={["1", "2", "3", "4", "5"]} width="123px" />
      </SelectorConatiner>
      <SelectorConatiner>
        <SubTitle text="관람 시간" />
        <Selector options={["1", "2", "3", "4", "5"]} width="123px" />
        <Selector options={["1", "2", "3", "4", "5"]} width="123px" />
      </SelectorConatiner>
      <Editor />
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
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  gap: 30px;
  padding: 0px;
  margin-bottom: 30px;
`;

const SelectorConatiner = styled.div`
  margin-bottom: 30px;
`;
