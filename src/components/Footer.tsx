import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <Content>
        <div>logo</div>
        <Terms>
          {/* 추후 링크로 수정 */}
          <span>이용약관</span> | <span>개인정보처리방침</span> |
          <span> 청소년보호정책</span> | <span>문의하기</span>
        </Terms>
        <Copyright className="copyright">
          Copyright 2022 © mane. All rights reserved.
        </Copyright>
      </Content>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 250px;
  border-radius: 0px;
  background-color: #333333;
  color: #ffffff;
`;

const Content = styled.div`
  width: 75vw;
  margin: 54px auto 0px auto;
`;

const Terms = styled.div`
  margin-top: 50px;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.5px;
  > span {
    cursor: pointer;
  }
`;

const Copyright = styled(Terms)`
  margin-top: 20px;
`;
