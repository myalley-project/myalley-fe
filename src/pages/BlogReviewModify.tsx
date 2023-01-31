import React, {
  useState,
  ChangeEvent,
  useReducer,
  useEffect,
  useMemo,
} from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ReviewTitle from "../components/blogreview/ReviewTitle";
import ExhibitionSelect from "../components/blogreview/ExhibitionSelect";
import Calender from "../components/Calendar";
import SubTitle from "../components/SubTitle";
import Editor from "../components/Editor";
import Selectbox from "../components/atom/Selectbox";
import { theme } from "../styles/theme";
import getTimeOptions from "../utils/timeSelector";
import Button from "../components/atom/Button";
import blogReviewApis from "../apis/blogReviewApis";
import returnkeys from "../utils/returnkeys";
import xBtn from "../assets/icons/xBtn.svg";

// 차후 reducer로 일괄 조절예정
// interface BlogReviewPost {a
//   blogInfo: {
//     title: string;
//     viewDate: string;
//     time: {
//       enter: string;
//       exit: string;
//     };
//     transportation: string;
//     revisit: string;
//     congestion: string;
//     content: string;
//     exhibition: number;
//   };
//   images: FormData[] | [];
// }

// const initialState: BlogReviewPost = {
//   blogInfo: {
//     title: "",
//     viewDate: "",
//     time: {
//       enter: "",
//       exit: "",
//     },
//     transportation: "",
//     revisit: "",
//     congestion: "",
//     content: "",
//     exhibition: 0,
//   },
//   images: [],
// };

// const enum ReducerActionType {
//   Title,
//   ViewDate,
//   EnterTime,
//   ExitTime,
//   TransporTation,
//   Revisit,
//   Congestion,
//   Content,
//   Exhibition,
//   Images,
// }

// type ReducerAction = {
//   type: ReducerActionType;
//   payload?: string;
//   fileList?: FormData;
// };

// const reducer = (
//   state: typeof initialState,
//   action: ReducerAction
// ): typeof initialState => {
//   switch (action.type) {
//     case ReducerActionType.Title:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, title: action.payload ?? "" },
//       };
//     case ReducerActionType.ViewDate:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, viewDate: action.payload ?? "" },
//       };
//     case ReducerActionType.EnterTime:
//       return {
//         ...state,
//         blogInfo: {
//           ...state.blogInfo,
//           time: { ...state.blogInfo.time, enter: action.payload ?? "" },
//         },
//       };
//     case ReducerActionType.ExitTime:
//       return {
//         ...state,
//         blogInfo: {
//           ...state.blogInfo,
//           time: { ...state.blogInfo.time, exit: action.payload ?? "" },
//         },
//       };
//     case ReducerActionType.TransporTation:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, transportation: action.payload ?? "" },
//       };
//     case ReducerActionType.Revisit:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, revisit: action.payload ?? "" },
//       };
//     case ReducerActionType.Congestion:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, congestion: action.payload ?? "" },
//       };
//     case ReducerActionType.Content:
//       return {
//         ...state,
//         blogInfo: { ...state.blogInfo, content: action.payload ?? "" },
//       };
//     case ReducerActionType.Exhibition:
//       return {
//         ...state,
//         blogInfo: {
//           ...state.blogInfo,
//           exhibition: Number(action.payload),
//         },
//       };
//     case ReducerActionType.Images:
//       return {
//         ...state,
//         images: [action.fileList as FormData],
//       };
//     default:
//       return state;
//   }
// };

const BlogReviewWrite = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [enterTime, setEnterTime] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [congestion, setCongestion] = useState("");
  const [transportation, setTransportation] = useState("");
  const [revisit, setRevisit] = useState("");
  const [contents, setContents] = useState("");
  const [deleteimages, setDeleteImages] = useState<string[] | []>([]);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const { id } = useParams();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["blogDetail"],
    queryFn: () => blogReviewApis.readDetailBlogReview(id as string),
  });
  const keys = returnkeys(data?.imageInfo.length as number);
  const imagesArray = data?.imageInfo ?? [];

  const handleTitleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onCilckEnterTime = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "enterTime"
  ) => {
    const value = event.currentTarget.textContent;
    setEnterTime(value as string);
  };

  const onCilckExitTime = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "exitTime"
  ) => {
    const value = event.currentTarget.textContent;
    setExitTime(value as string);
  };

  const onCilckCongestion = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "congestion"
  ) => {
    const value = event.currentTarget.textContent;
    setCongestion(value as string);
  };

  const onClickTransportation = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "transpostation"
  ) => {
    const value = event.currentTarget.textContent;
    setTransportation(value as string);
  };

  const onClickRevisit = (
    event: React.MouseEvent<HTMLLIElement>,
    name = "revisit"
  ) => {
    const value = event.currentTarget.textContent;
    setRevisit(value as string);
  };

  const HandlerContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const HandleSubmit = () => {
    if (deleteimages) {
      deleteimages.forEach((each) =>
        blogReviewApis.deleteImage(id as string, each)
      );
    }

    const postData = {
      title,
      viewDate: selectedDate,
      time: `${enterTime}-${exitTime}`,
      transportation,
      revisit,
      congestion,
      content: contents,
    };

    const formData = new FormData();
    formData.append(
      "blogInfo",
      new Blob([JSON.stringify(postData)], { type: "application/json" })
    );

    blogReviewApis.updateReviewText(id as string, postData);

    if (imageFiles !== null) {
      const imageFormData = new FormData();
      Array.from(imageFiles).forEach((file) =>
        imageFormData.append("images", file)
      );

      blogReviewApis.updateReviewImage(id as string, imageFormData);
    }
  };

  function deleteExistingImg(imgInfo: { id: string; url: string }) {
    if (data?.imageInfo) {
      for (let index = 0; index < data.imageInfo.length; index += 1) {
        if (data.imageInfo[index].url === imgInfo.url) {
          setDeleteImages([...deleteimages, imagesArray[index].id]);
        }
      }
    }
  }

  if (isLoading) return <div>...loading</div>;

  if (isError) return <div>에러가 발생했습니다.</div>;

  return (
    <Container>
      <div style={{ marginBottom: "30px" }}>
        <ReviewTitle handleTitleInput={handleTitleInput} />
        <ExhibitionPicker>
          <ExhibitionSelect />
          <div>
            <SubTitle text="관람일" />
            <Calender setSelectedDate={setSelectedDate} />
          </div>
        </ExhibitionPicker>
        <SelectorConatiner>
          <SubTitle text="관람 시간" />
          <SelectContainer>
            <TimeSelector>
              <p>입장</p>
              <Selectbox
                onClick={onCilckEnterTime}
                options={getTimeOptions()}
                placeholder="00시"
                name="입장시간"
                width="130px"
              />
            </TimeSelector>
            <TimeSelector>
              <p>퇴장</p>
              <Selectbox
                onClick={onCilckExitTime}
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
                  onClick={onCilckCongestion}
                  options={["한산", "보통", "북적거림", "매우혼잡"]}
                  placeholder="한산"
                  name="혼잡도"
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
                  onClick={onClickTransportation}
                  options={["도보", "버스", "지하철", "차"]}
                  placeholder="도보"
                  name="교통 수단"
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
                  onClick={onClickRevisit}
                  options={["모르겠다", "전혀 없다", "조금 있다", "재방문예정"]}
                  placeholder="모르겠다"
                  name="재방문 의향"
                  width="130px"
                />
              </TimeSelector>
            </SelectContainer>
          </SelectorConatiner>
        </ConvinenceSelector>
        <Editor>
          <div>
            <SubTitle text="현재 저장된 이미지" />
            <PreviewContainer>
              {data
                ? data.imageInfo.map((each, index) => (
                    <Preview key={keys[index]}>
                      <PreviewImage src={each.url} alt="현재 투고된 이미지" />
                      <XButton onClick={() => deleteExistingImg(each)}>
                        <img src={xBtn} alt="기존 이미지 삭제버튼" />
                      </XButton>
                    </Preview>
                  ))
                : null}
            </PreviewContainer>
            <Editor.ImageArea
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
            <Editor.TextInputArea
              name="텍스트 에어리어"
              textChangeHandler={HandlerContents}
            />
          </div>
        </Editor>
      </div>
      <ButtonContainer>
        <Button variant="text" size="large">
          취소하기
        </Button>
        <Button onClick={HandleSubmit} variant="primary" size="large">
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

const PreviewContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 15px 0;
  flex-flow: row wrap;
`;

const Preview = styled.div`
  display: inline-block;
  position: relative;
  width: 250px;
  aspect-ratio: 1 /1;
  margin-inline: 1rem;
  margin-bottom: 2rem;
  object-fit: cover;
`;

const PreviewImage = styled.img`
  border: 1px solid ${theme.colors.greys40};
  border-radius: 4px;
  padding: 5px;
  width: 250px;
  aspect-ratio: 1 / 1;
  object-fit: fill;
  &:hover {
    box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
  }
`;

const XButton = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
`;
