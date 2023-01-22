import React, { useReducer } from "react";
import styled from "styled-components";

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
        // ...state,
        // blogInfo: {
        //   ...state.blogInfo,
        //   exhibition: parseInt(action.payload, 10),
        // },
      };
    default:
      return state;
  }
};

const BlogReviewWrite = () => <div>BlogReviewWrite</div>;

export default BlogReviewWrite;

const Container = styled.div``;
