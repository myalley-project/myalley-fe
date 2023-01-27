import React, { useEffect, useReducer } from "react";
import OnelineWrite from "../components/onelineReview/OnelineWrite";
import { OnelineReviewPostType } from "../types/OnelineReview";

// interface OnelineReviewPost {
//   exhibitionId: number;
//   date: {
//     year: string;
//     month: string;
//     day: string;
//   };
//   time: {
//     enterence: string;
//     exit: string;
//   };
//   congestion: string;
//   rate: number;
//   content: string;
// }

const initialState: OnelineReviewPostType = {
  exhibitionId: 0,
  date: {
    year: "",
    month: "",
    day: "",
  },
  time: "",
  congestion: "",
  rate: 0,
  content: "",
};

const ReducerActionType = {
  YEAR: "YEAR",
  MONTH: "MONTH",
  DAY: "DAY",
  TIME: "TIME",
  CONGESTION: "CONGESTION",
  RATE: "RATE",
  CONTENT: "CONTENT",
};

type ReducerAction = {
  type: string;
  payload?: string;
  payloadToNumber?: number;
};

const reducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  switch (action.type) {
    case ReducerActionType.YEAR:
      return {
        ...state,
        date: { ...state.date, year: action.payload ?? "" },
      };
    case ReducerActionType.MONTH:
      return {
        ...state,
        date: { ...state.date, month: action.payload ?? "" },
      };
    case ReducerActionType.DAY:
      return {
        ...state,
        date: { ...state.date, day: action.payload ?? "" },
      };
    case ReducerActionType.TIME:
      return {
        ...state,
        time: action.payload ?? "",
      };
    case ReducerActionType.CONGESTION:
      return {
        ...state,
        congestion: action.payload ?? "",
      };
    case ReducerActionType.RATE:
      return {
        ...state,
        rate: action.payloadToNumber ?? 0,
      };
    case ReducerActionType.CONTENT:
      return {
        ...state,
        content: action.payload ?? "",
      };
    default:
      return state;
  }
};

const OnelineWrapper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const yearHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.YEAR,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const monthHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.MONTH,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const dayHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.DAY,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const timeHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.TIME,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const congestionHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.CONGESTION,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const rateHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        const { textContent } = e.currentTarget;
        const textToNumber = parseInt(textContent, 10);
        dispatch({
          type: ReducerActionType.RATE,
          payloadToNumber: textToNumber,
        });
      }
    }
  };

  const contentHandler = (e: React.ChangeEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.CONTENT,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  return (
    <OnelineWrite
      state={state}
      yearHandler={yearHandler}
      monthHandler={monthHandler}
      dayHandler={dayHandler}
      timeHandler={timeHandler}
      congestionHandler={congestionHandler}
      rateHandler={rateHandler}
      contentHandler={contentHandler}
    />
  );
};

export default OnelineWrapper;
