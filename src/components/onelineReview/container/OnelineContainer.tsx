import React, { useEffect, useReducer } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import OnelineWrite from "../presentation/OnelineWrite";
import { OnelineReviewPostType } from "../../../types/oneLineReview";
import oneLineReviewApis from "../../../apis/oneLineReviewApis";
import isApiError from "../../../utils/isApiError";
import useRefreshTokenApi from "../../../apis/useRefreshToken";

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

interface OnelineContainerProps {
  handleModal: () => void;
  writeType: WriteType;
  simpleId: number;
}

const OnelineContainer = ({
  writeType,
  simpleId = 0,
  handleModal,
}: OnelineContainerProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id } = useParams();
  const refreshTokenApi = useRefreshTokenApi();
  const queryClient = useQueryClient();

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
    mutationFn: (payload: Payload) => oneLineReviewApis.createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["simpleReviews"]);
    },
  });

  const modifyMutation = useMutation({
    mutationFn: (payload: Payload) =>
      oneLineReviewApis.updateReview(simpleId, payload),
  });

  const SubmitHandler = () => {
    const body = getPayload(id as string, state);

    if (Object.values(body).includes("") || Object.values(body).includes(0)) {
      throw Error("빈 칸으로 남겨진 값이 있습니다.");
    }
    if (body.content.length < 10) alert("본문 내용이 너무 짧습니다");

    if (writeType === "create") {
      try {
        newReviewMutation.mutate(body);
        handleModal();
      } catch (err) {
        const errResponese = isApiError(err);
        if (errResponese === "accessToken 만료") refreshTokenApi();
      }
    } else if (writeType === "modify") {
      try {
        modifyMutation.mutate(body);
        handleModal();
      } catch (err) {
        const errResponese = isApiError(err);
        if (errResponese === "accessToken 만료") refreshTokenApi();
      }
    }
  };

  return (
    <OnelineWrite
      state={state}
      handleModal={handleModal}
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

export default OnelineContainer;

function getPayload(
  exhibitionId: string,
  state: OnelineReviewPostType
): Payload {
  const BIRTHDAY = `${state.date.year}-${state.date.month}-${state.date.day}`;
  const ID = Number(exhibitionId);

  return {
    exhibitionId: ID,
    viewDate: BIRTHDAY,
    time: state.time,
    congestion: state.congestion,
    rate: state.rate,
    content: state.content,
  };
}
