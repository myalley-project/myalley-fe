import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
import returnkeys from "../utils/returnkeys";

const Editor = () => {
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);

  const { previewImages } = usePreviewImages(imageFiles as FileList);
  const previewIds = returnkeys(previewImages.length);

  const onChangePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageFiles(() => event.target.files);
  };

  const onSubmitHandler = () => {};

  return (
    <Container>
      <PreviewContainer>
        {previewImages &&
          previewImages.map((each, index) => (
            <Preview key={previewIds[index]}>
              <PreviewImage src={each} alt="프리뷰 이미지" />
            </Preview>
          ))}
      </PreviewContainer>
      <form>
        <label htmlFor="image-files">사진 올리기</label>
        <input
          onChange={onChangePic}
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          id="image-files"
          ref={imageRef}
        />
        <button onClick={onSubmitHandler} type="button">
          제출
        </button>
      </form>
      <SubTitle>본문 내용</SubTitle>
      <TextArea />
    </Container>
  );
};

export default Editor;

function usePreviewImages(imageFiles: FileList) {
  const [previewImages, setPreviewImages] = useState<[] | string[]>([]);
  useEffect(() => {
    if (imageFiles) {
      setPreviewImages([]);
      for (let index = 0; index < imageFiles.length; index += 1) {
        const reader = new FileReader();
        reader.readAsDataURL(imageFiles[index]);
        reader.onload = () => {
          if (reader.readyState === 2) {
            setPreviewImages((prev) => [...prev, reader.result as string]);
          }
        };
      }
    }
  }, [imageFiles]);

  return { previewImages };
}

const Container = styled.div`
  max-width: 1200px;
  padding: 30px;
  border: 1px solid black;
  margin-inline: auto;
`;

const PreviewContainer = styled.div`
  display: flex;
  width: 600px;
  gap: 10px;
  margin-bottom: 1rem;
`;

const Preview = styled.div`
  display: inline-block;
  width: 250px;
  aspect-ratio: 1 /1;
  margin-inline: 1rem;
  margin-bottom: 2rem;
  object-fit: cover;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const SubTitle = styled.h2`
  font-weight: bold;
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  aspect-ratio: 1 / 0.7;
  border-radius: 1rem;
  padding-top: 1rem;
  border-color: ${theme.colors.main};
  outline-color: ${theme.colors.hover};
  resize: none;
`;
