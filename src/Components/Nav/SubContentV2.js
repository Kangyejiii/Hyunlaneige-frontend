import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

//TODO : 후에 link 주소 달기 !
export default function SubContentV2({
  firstData,
  secondData,
  lastData,
  bannerData,
  displayMode,
}) {
  return (
    <Wrapper condition={displayMode}>
      <ListContainer>
        <section>
          <Total>전체보기</Total>
          <ListBox>
            <List>
              <Title>{firstData.title}</Title>
              {firstData.list.map((el) => (
                <Content key={firstData.title + el}>{el}</Content>
              ))}
            </List>
            <List>
              <Title>{secondData.title}</Title>
              {secondData.list.map((el) => (
                <Content key={secondData.title + el}>{el}</Content>
              ))}
            </List>
            <List>
              <Title>{lastData.title}</Title>
              {lastData.list.map((el) => (
                <Content key={lastData.title + el}>{el}</Content>
              ))}
            </List>
          </ListBox>
        </section>
        <Banner>
          <ImgBox>
            <img alt={bannerData.comment} src={bannerData.img} />
          </ImgBox>
          <BannerTitle>{bannerData.title}</BannerTitle>
          <BannerContent>{bannerData.comment}</BannerContent>
        </Banner>
      </ListContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: ${(props) => props.condition};
  justify-content: center;
  width: 100%;
  position: absolute;
  left: 0;
  border-top: 1px solid #ddd;
  background-color: #f7f7f7;
  z-index: 999;
`;

const ListContainer = styled.div`
  display: flex;
  width: 1080px;
  padding: 30px 40px;
`;

const Total = styled.div`
  margin-bottom: 15px;
  color: #5f5f5f;
`;

const ListBox = styled.div`
  display: flex;
`;

const List = styled.div`
  width: 170px;
  margin-right: 70px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid;
  font-size: 16px;
  font-weight: 600;
`;

const Content = styled(Link)`
  display: block;
  width: 100%;
  padding: 8px 0px;
  font-size: 15px;
  font-weight: 300;
  color: #5f5f5f;

  &:hover {
    color: #2b2b2b;
    font-weight: 700;
  }
`;

const Banner = styled.div`
  width: 260px;
`;

const ImgBox = styled.div`
  height: 300px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const BannerTitle = styled.div`
  margin-bottom: 20px;
  font-size: 15px;
  color: #4477be;
`;

const BannerContent = styled.div`
  font-size: 16px;
`;
