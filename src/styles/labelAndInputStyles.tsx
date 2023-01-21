import styled from "styled-components";

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  color: ${(props) => props.theme.colors.greys80};
`;

export const Input = styled.input<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  padding: 8px 20px;
  border: 1px solid ${(props) => props.theme.colors.greys40};
  border-radius: 10000px;
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.colors.greys60};
  &::placeholder {
    color: ${(props) => props.theme.colors.greys60};
  }
`;

export const Notice = styled.span<{ color: string }>`
  font-size: 12px;
  color: ${(props) => props.color};
`;
