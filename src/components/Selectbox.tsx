import React, { useState } from "react";
import styled from "styled-components";

interface SelectBoxType {
  placeholder: string;
  selectedData: React.Dispatch<React.SetStateAction<ExhibitionType>>;
  options: string[];
  width: string;
}

export type ExhibitionType = string;

const Selectbox = ({
  placeholder,
  selectedData,
  options,
  width,
}: SelectBoxType) => {
  const [show, setShow] = useState(false);
  const [selectItem, setSelectItem] = useState(placeholder);

  const ToggleSelector = () => {
    setShow((prev) => !prev);
  };

  const getSelectItem = (item: string) => {
    setSelectItem(item);
    ToggleSelector();
    selectedData(item);
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <SelectBtn width={width} type="button" onClick={ToggleSelector}>
        {selectItem}
      </SelectBtn>
      {show && (
        <SelectUl>
          <SubTitle>종류</SubTitle>
          {options &&
            options.map((item) => (
              <SelectLi key={item} onClick={() => getSelectItem(item)}>
                {item}
              </SelectLi>
            ))}
        </SelectUl>
      )}
    </div>
  );
};

export default Selectbox;

const SelectBtn = styled.button<{ width: string }>`
  min-width: ${(props) => props.width};
  width: fit-content;
  height: 40px;
  margin: 10px 0;
  padding-left: 20px;
  border: 1px solid ${(props) => props.theme.colors.greys40};
  border-radius: 30px;
  background: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")
    no-repeat;
  background-size: 11.15px 6.55px;
  background-position: right 26px center;
  color: ${(props) => props.theme.colors.greys60};
  text-align: left;
  cursor: pointer;
`;

const SubTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 12px;
  color: #b0a7c0;
`;

const SelectUl = styled.ul`
  position: absolute;
  z-index: 1;
  width: 200px;
  height: fit-content;
  padding: 10px;
  border: 1px solid #f6f3fe;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.white100};
`;

const SelectLi = styled.li`
  width: 180px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 50px;
  color: #333333;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.primry70};
    background-color: #f6f3fe;
  }
`;
