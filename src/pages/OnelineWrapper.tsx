import React, { useEffect, useReducer } from "react";
import OnelineWrite from "../components/onelineReview/OnelineWrite";

interface OnelineReviewPost {
  exhibitionId: number;
  date: {
    year: string;
    month: string;
    day: string;
  };
  time: {
    enterence: string;
    exit: string;
  };
  congestion: string;
  rate: number;
  content: string;
}

const initialState: OnelineReviewPost = {
  exhibitionId: 0,
  date: {
    year: "",
    month: "",
    day: "",
  },
  time: {
    enterence: "",
    exit: "",
  },
  congestion: "",
  rate: 0,
  content: "",
};

const ReducerActionType = {
  YEAR: "YEAR",
  MONTH: "MONTH",
  DAY: "DAY",
  ENTERANCETIME: "ENTERANCETIME",
  EXITTIME: "EXITTIME",
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
    case ReducerActionType.ENTERANCETIME:
      return {
        ...state,
        time: { ...state.time, enterence: action.payload ?? "" },
      };
    case ReducerActionType.EXITTIME:
      return {
        ...state,
        time: { ...state.time, exit: action.payload ?? "" },
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

  useEffect(() => {
    console.log(state);
  }, [state]);

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

  const enteranceHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.ENTERANCETIME,
          payload: e.currentTarget.textContent,
        });
      }
    }
  };

  const exitHandler = (e: React.MouseEvent) => {
    if (e !== undefined) {
      if (e.currentTarget.textContent !== null) {
        dispatch({
          type: ReducerActionType.EXITTIME,
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

  const contentHandler = (e: React.MouseEvent) => {
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
      yearHandler={yearHandler}
      monthHandler={monthHandler}
      dayHandler={dayHandler}
      enteranceHandler={enteranceHandler}
      exitHandler={exitHandler}
      congestionHandler={congestionHandler}
      rateHandler={rateHandler}
      contentHandler={contentHandler}
    />
  );
};

export default OnelineWrapper;
