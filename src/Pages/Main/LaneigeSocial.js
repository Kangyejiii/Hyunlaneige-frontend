import React from "react";
import styled from "styled-components";
import SocialSlider from "./Slider/SocialSlider";

export default function LaneigeSocial() {
  return (
    <Wrapper>
      <Title>#LUMINOUS LIVE</Title>
      <Desc>SHARE YOUR LUMINOUS MOMENTS WITH LANEIGE!</Desc>
      <SocialSlider />
      <Button>Veiw More</Button>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  text-align: center;
  padding: 100px;
`;

const Title = styled.div`
  height: 50px;
  font-size: 42px;
  font-weight: 600;
`;

const Desc = styled.div`
  height: 25px;
  margin: 8px 20px 20px;
  font-size: 16px;
  color: #5f5f5f;
`;

const Button = styled.button`
  height: 32px;
  margin-top: 20px;
  padding: 8px 25px 7px;
  border: 1px solid #2b2b2b;
  background-color: transparent;
  font-family: inherit;
  font-size: 16px;
  color: #2b2b2b;
  line-height: 1;

  &:hover {
    cursor: pointer;
    border: 1px solid #447ebe;
    background-color: #447ebe;
    color: white;
  }
`;
