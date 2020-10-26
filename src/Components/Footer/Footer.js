import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <Wrapper>
      <Line />
      <Content>
        <Top>
          <Nav>
            {footerNav.map((el, idx) => (
              <Item to="/" key={idx}>
                {el}
              </Item>
            ))}
          </Nav>
          <SnsList>
            <Icon to="/">
              <img
                alt="instagram"
                src="https://www.laneige.com/kr/ko/assets/image/sns_instagram_renew.png"
              />
            </Icon>
            <Icon to="/">
              <img
                alt="facebook"
                src="https://www.laneige.com/kr/ko/assets/image/sns_facebook_renew.png"
              />
            </Icon>
            <Icon to="/">
              <img
                alt="youtube"
                src="https://www.laneige.com/kr/ko/assets/image/sns_youtube_renew.png"
              />
            </Icon>
          </SnsList>
        </Top>
        <Bottom>
          <div>
            <Info>고객상담실 (수신자요금부담) 080-023-5454</Info>
            <Info rightpadding>운영시간 : 월-금 09:00 ~ 18:00</Info>
          </div>
          <CopyRight>
            <span>© AMOREPACIFIC</span> CORPORATION. ALL RIGHTS RESERVED.
          </CopyRight>
          <Mark>
            <img
              alt="WA인증마크"
              src="https://www.laneige.com/kr/ko/assets/image/a/wa-mark.png"
            />
          </Mark>
        </Bottom>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-bottom: 100px;
  background-color: #fff;
  font-family: "Arita-dotum-Medium";
`;

const Line = styled.div`
  position: absolute;
  height: 44px;
  width: 100%;
  border-top: 1px solid #dddd;
  border-bottom: 1px solid #dddd;
`;

const Content = styled.div`
  width: 1180px;
`;

const Top = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: space-between;
`;

const Nav = styled.nav`
  display: flex;
`;

const Item = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 20px;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
`;

const SnsList = styled.div`
  display: flex;
  height: 100%;
`;

const Icon = styled(Link)`
  height: 100%;
  padding: 10px;

  img {
    height: 100%;
  }
`;

const Bottom = styled.div`
  position: relative;
  margin: 25px 0 0 10px;
  font-size: 15px;
`;

const Info = styled.span`
  padding: 0 10px 0 ${(props) => (props.rightpadding ? "10px" : "0")};
`;

const CopyRight = styled.div`
  margin-top: 18px;
  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.08em;
  span {
    font-weight: 600;
  }
`;

const Mark = styled.a`
  width: 72px;
  height: 52px;
  position: absolute;
  bottom: 0;
  right: 0;

  img {
    width: 100%;
  }
`;

const footerNav = [
  "회사소개",
  "서비스이용약관",
  "UGC 이용약관",
  "개인정보처리방침",
  "영상정보처리방침",
  "뷰티포인트",
  "사이트맵",
  "공지사항",
];
