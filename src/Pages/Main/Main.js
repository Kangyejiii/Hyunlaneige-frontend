import React from "react";
import styled from "styled-components";
import Slider from "./Slider/MainSlider";
import BestSeller from "./BestSeller";
import Banner from "./Banner";
import LaneigeSocial from "./LaneigeSocial";

export default function Main() {
  return (
    <Wrapper>
      <Slider />
      <BestSeller />
      <Banner />
      <LaneigeSocial />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  font-family: "Arita-dotum-Medium", "sans-serif";
  width: 100%;
  padding-top: 60px;
`;
