import React, { useEffect, useReducer } from "react";
import { useMutation } from "react-query";
import OnelineWrite from "../components/onelineReview/OnelineWrite";
import { OnelineReviewPostType } from "../types/OnelineReview";
import onelineReviewApis from "../apis/onelineReviewapis";

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

type Payload = {
  exhibitionId: number;
  viewDate: string;
  time: string;
  congestion: string;
  rate: number;
  content: string;
};

type WriteType = "create" | "modify";

interface OnelineWrapperProps {
  writeType: WriteType;
  simpleId: number;
}

const OnelineWrapper = ({ writeType, simpleId = 0 }: OnelineWrapperProps) => {
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

  const contentHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e !== undefined) {
      if (e.target.value !== null) {
        dispatch({
          type: ReducerActionType.CONTENT,
          payload: e.target.value,
        });
      }
    }
  };

  const newReviewMutation = useMutation({
    mutationFn: (payload: Payload) => onelineReviewApis.createReview(payload),
  });

  const modifyMutation = useMutation({
    mutationFn: (payload: Payload) =>
      onelineReviewApis.updateReview(simpleId, payload),
  });

  const SubmitHandler = () => {
    const body = getPayload(state);
    if (Object.values(body).includes("") || Object.values(body).includes(0)) {
      throw Error("빈 칸으로 남겨진 값이 있습니다.");
    }

    if (writeType === "create") {
      newReviewMutation.mutate(body);
    } else if (writeType === "modify") {
      modifyMutation.mutate(body);
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
      submitHandler={SubmitHandler}
    />
  );
};

export default OnelineWrapper;

function getPayload(state: OnelineReviewPostType): Payload {
  const BIRTHDAY = `${state.date.year}-${state.date.month}-${state.date.day}`;

  return {
    exhibitionId: state.exhibitionId,
    viewDate: BIRTHDAY,
    time: state.time,
    congestion: state.congestion,
    rate: state.rate,
    content: state.content,
  };
}
