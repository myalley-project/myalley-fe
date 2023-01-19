import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.svg";

const Footer = () => (
  <FooterContainer>
    <Content>
      <TopArea>
        <img src={logo} alt="logo"></img>
        <Developers>
          <JobGroup>
            <JobTitle>P.O</JobTitle>
            <People>Hwadam Chae</People>
            <People>Youngeun Choi</People>
          </JobGroup>
          <JobGroup>
            <JobTitle>UI/UX DESIGN</JobTitle>
            <People>JinA Kim</People>
          </JobGroup>
          <JobGroup>
            <JobTitle>FRONT_END</JobTitle>
            <People>Yesun Park</People>
            <People>Nayoung Yu</People>
            <People>Dongkyu Kim</People>
          </JobGroup>
          <JobGroup>
            <JobTitle>BACK_END</JobTitle>
            <People>Hwadam Chae</People>
            <People>Youngeun Choi</People>
            <People>Yeongjin Han</People>
          </JobGroup>
          <JobGroup>
            <JobTitle>DEVOPS</JobTitle>
            <People>Geunsu Ryu</People>
          </JobGroup>
        </Developers>
      </TopArea>
      <BottomArea>
        <Copyright className="copyright">
          Copyright 2022 © mane. All rights reserved.
        </Copyright>
        <Terms>
          <span>이용약관</span> | <span>개인정보처리방침</span> |
          <span> 청소년보호정책</span> | <span>문의하기</span>
        </Terms>
      </BottomArea>
    </Content>
  </FooterContainer>
);

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100vw;
  height: 466px;
  border-radius: 0px;
  background-color: rgba(149, 141, 165, 0.05);
`;

const Content = styled.div`
  width: 100vw;
  max-width: 1440px;
  margin: 120px auto 0px auto;
`;

const TopArea = styled.div`
  display: flex;
  gap: 85px;
  margin-bottom: 60px;
`;

const Developers = styled.div`
  display: flex;
`;

const JobGroup = styled.div`
  width: 215px;
  font-family: "Roboto";
`;

const JobTitle = styled.p`
  margin-bottom: 18px;
  font-size: 18px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 1px;
  color: #6750a4;
`;

const People = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
  color: #958da5;
`;

const BottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  border-top: 1px solid #b0a7c0;
  border-radius: 0px;
  font-size: 14px;
  line-height: 16px;
  color: #b0a7c0;
`;

const Copyright = styled.div`
  /* width: 288px; */
  font-weight: 500;
`;

const Terms = styled.div`
  /* width: 346px; */
  font-weight: 400;
`;
