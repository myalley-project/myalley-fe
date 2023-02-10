import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

interface SelectBoxType {
  placeholder: string;
  options: string[];
  width: string; // ex. 300px
  name: string;
  onClick: (e: React.MouseEvent<HTMLLIElement>, name: string) => void;
}

const Selectbox = ({
  placeholder,
  options,
  width,
  name,
  onClick,
}: SelectBoxType) => {
  const [show, setShow] = useState(false);
  const selectboxRef = useRef<HTMLUListElement>(null);
  const [isSelectboxOpen, setIsSelectboxOpen] = useState(false);
  const [selectItem, setSelectItem] = useState(placeholder);

  // 수정모드일 시 기존 placeholder 보여주기 위함
  useEffect(() => {
    setSelectItem(placeholder);
  }, [placeholder]);

  const ToggleSelector = () => {
    setIsSelectboxOpen((prev) => !prev);
    setShow((prev) => !prev);
  };

  const handleSelectData = (
    e: React.MouseEvent<HTMLLIElement>,
    item: string
  ) => {
    setSelectItem(item);
    ToggleSelector();
    onClick(e, name);
    setIsSelectboxOpen(false);
  };

  const toggleSelectbox = () => {
    if (selectboxRef.current) {
      setIsSelectboxOpen(false);
      setShow(false);
    }
  };

  return (
    <div>
      {isSelectboxOpen && <Background onClick={toggleSelectbox} />}
      <SelectBtn
        width={width}
        type="button"
        onClick={ToggleSelector}
        show={show}
      >
        {selectItem}
      </SelectBtn>
      {show && (
        <SelectUl ref={selectboxRef}>
          <SubTitle>종류</SubTitle>
          {options &&
            options.map((item) => (
              <SelectLi
                key={item}
                onClick={(e) => {
                  handleSelectData(e, item);
                }}
              >
                {item}
              </SelectLi>
            ))}
        </SelectUl>
      )}
    </div>
  );
};

export default Selectbox;

interface SelectboxProps {
  width: string;
  show: boolean;
}

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const SelectBtn = styled.button<SelectboxProps>`
  width: ${(props) => props.width};
  height: 36px;
  padding-left: 20px;
  border: 1px solid
    ${(props) =>
      props.show === true
        ? `${theme.colors.primry60}`
        : `${theme.colors.greys40}`};
  border-radius: 30px;
  background: ${(props) =>
      props.show === true
        ? `url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%234F378B'/%3E%3C/svg%3E%0A")`
        : `url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%239C9C9C'/%3E%3C/svg%3E%0A")`}
    no-repeat;
  background-position: right 16px center;
  font-size: 16px;
  color: ${(props) =>
    props.show === true
      ? `${theme.colors.primry60}`
      : `${theme.colors.greys60}`};
  border-radius: 30px;
  text-align: left;
  cursor: pointer;
  &:hover {
    border: 1px solid ${theme.colors.primry60};
    background: url("data:image/svg+xml,%3Csvg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.2998 1.69995L6.6998 6.29995C6.5998 6.39995 6.49147 6.47062 6.3748 6.51195C6.25814 6.55395 6.13314 6.57495 5.9998 6.57495C5.86647 6.57495 5.74147 6.55395 5.6248 6.51195C5.50814 6.47062 5.3998 6.39995 5.2998 6.29995L0.699804 1.69995C0.516471 1.51662 0.424804 1.28328 0.424804 0.999951C0.424804 0.716618 0.516471 0.483285 0.699804 0.299952C0.883137 0.116618 1.11647 0.024951 1.3998 0.0249509C1.68314 0.0249509 1.91647 0.116618 2.0998 0.299951L5.9998 4.19995L9.8998 0.299951C10.0831 0.116618 10.3165 0.0249505 10.5998 0.0249505C10.8831 0.0249505 11.1165 0.116618 11.2998 0.299951C11.4831 0.483284 11.5748 0.716618 11.5748 0.999951C11.5748 1.28328 11.4831 1.51662 11.2998 1.69995Z' fill='%234F378B'/%3E%3C/svg%3E%0A")
      no-repeat;
    background-position: right 16px center;
    color: ${theme.colors.primry60};
  }
`;

const SubTitle = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 12px;
  color: ${theme.colors.secondary40};
`;

const SelectUl = styled.ul`
  position: absolute;
  z-index: 1;
  width: 200px;
  height: fit-content;
  max-height: 300px;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid ${theme.colors.secondary5};
  border-radius: 10px;
  background-color: ${theme.colors.white100};
  box-shadow: 0px 4px 30px rgba(79, 55, 139, 0.05);
  ::-webkit-scrollbar {
    display: block;
    width: 14px;
  }
  ::-webkit-scrollbar-thumb {
    display: block;
    width: 14px;
    background-color: #d9d9d9;
    border-radius: 1000px;
    background-clip: padding-box;
    border: 5px solid transparent;
  }
  :focus-visible {
    outline: none;
  }
`;

const SelectLi = styled.li`
  width: 180px;
  height: 40px;
  padding: 10px;
  border-radius: 10px;
  font-weight: 50px;
  font-size: 16px;
  color: ${theme.colors.greys90};
  cursor: pointer;
  &:hover {
    color: ${theme.colors.primry70};
    background-color: #f6f3fe;
  }
`;
