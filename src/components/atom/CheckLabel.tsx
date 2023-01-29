import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import { ReactComponent as CheckOn } from "../../assets/icons/checkOn.svg";
import { ReactComponent as CheckOff } from "../../assets/icons/checkOff.svg";

interface CheckLabelType {
  label: string;
  checked: boolean;
  onClick: () => void; // 체크박스를 클릭했을 때 실행될 함수
}

// 체크박스 + 라벨 컴포넌트_박예선_23.01.23
const CheckLabel = ({ label, checked, onClick }: CheckLabelType) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [isCheckOffHover, setIsCheckOffHover] = useState(false);

  return (
    <CheckLabelContainer
      type="button"
      onClick={() => {
        setIsChecked(!isChecked);
        onClick();
      }}
      onMouseOver={() => setIsCheckOffHover(true)}
      onMouseOut={() => setIsCheckOffHover(false)}
    >
      {isChecked && <CheckOn fill={theme.colors.primry70} />}
      {!isChecked && (
        <CheckOff
          stroke={isCheckOffHover ? theme.colors.greys80 : theme.colors.greys60}
        />
      )}
      <label className={`label ${isChecked ? "checked" : ""}`}>{label}</label>
    </CheckLabelContainer>
  );
};
export default CheckLabel;

const CheckLabelContainer = styled.button`
  display: flex;
  padding: 0;
  align-items: center;
  cursor: pointer;
  :hover {
    label {
      color: ${theme.colors.greys80};
    }
  }
  label {
    margin-left: 4px;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    color: ${theme.colors.greys60};
    cursor: pointer;
    &.checked {
      color: ${theme.colors.primry70};
    }
  }
  :focus-visible {
    border: 1px solid ${theme.colors.primry80};
    border-radius: 0;
  }
`;
