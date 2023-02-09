import React from "react";
import styled from "styled-components";
import logo from "../assets/icons/logo.svg";
import { theme } from "../styles/theme";

const Footer = () => {
  const developers = [
    { title: "P.O", people: ["Hwadam Chae", "Youngeun Choi"] },
    { title: "UI/UX DESIGN", people: ["JinA Kim"] },
    { title: "FRONT-END", people: ["Yesun Park", "Nayoung Yu", "Dongkyu Kim"] },
    {
      title: "BACK-END",
      people: ["Hwadam Chae", "Youngeun Choi", "Yeongjin Han"],
    },
    { title: "DEVOPS", people: ["Geunsu Ryu"] },
  ];

  return (
    <FooterContainer>
      <FooterWrapper>
        <TopArea>
          <img src={logo} alt="logo" />
          <Developers>
            <>
              {developers.map((developer) => (
                <JobGroup key={developer.title}>
                  <JobTitle>{developer.title}</JobTitle>
                  {developer.people.map((person) => (
                    <People key={person}>{person}</People>
                  ))}
                </JobGroup>
              ))}
            </>
          </Developers>
        </TopArea>
        <BottomArea>
          <Copyright className="copyright">
            Copyright 2022 © mane. All rights reserved.
          </Copyright>
          <Terms>
            <span>이용약관</span> | <span>개인정보처리방침</span> |
            <span> 청소년보호정책</span> |
            <span>
              <Link
                href="https://docs.google.com/forms/d/1UX8MuID74mg9afbzWdIfKU1CagQMA_FoXoDqvORx50w/edit"
                target="_blank"
              >
                문의하기
              </Link>
            </span>
          </Terms>
        </BottomArea>
      </FooterWrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  justify-content: start;
  width: 100vw;
  height: fit-content;
  min-height: 466px;
  border-radius: 0px;
  background-color: rgba(149, 141, 165, 0.05);
  @media (max-width: 1440px) {
    padding: 0 20px;
  }
`;

const FooterWrapper = styled.div`
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
  flex-wrap: wrap;
  gap: 30px;
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
  color: ${theme.colors.primry70};
`;

const People = styled.p`
  font-weight: 300;
  font-size: 18px;
  line-height: 24px;
  color: ${theme.colors.secondary50};
`;

const BottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  border-top: 1px solid ${theme.colors.secondary40};
  border-radius: 0px;
  font-size: 14px;
  line-height: 16px;
  color: ${theme.colors.secondary40};
`;

const Copyright = styled.div`
  font-weight: 500;
`;

const Terms = styled.div`
  font-weight: 400;
`;

const Link = styled.a`
  text-decoration: none;
  color: ${theme.colors.secondary40};
`;
