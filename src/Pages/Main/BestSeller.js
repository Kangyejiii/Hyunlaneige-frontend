import React from "react";
import styled from "styled-components";
import Slider from "./Slider/Slider";

export default function BestSeller() {
  return (
    <Best>
      <Content>
        <h2> BEST SELLER</h2>
        <SliderWrapper>
          <Slider />
        </SliderWrapper>
      </Content>
      <VideoBackground>
        <video muted loop autoPlay>
          <source
            src="https://www.laneige.com/kr/ko/assets/video/index/bestseller-bg.mp4"
            type="video/mp4"
          />
        </video>
      </VideoBackground>
    </Best>
  );
}

const Best = styled.section`
  width: 100%;
  height: 833px;
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  top: 50px;
  text-align: center;
  z-index: 1;

  h2 {
    font-size: 42px;
    font-weight: bold;
    letter-spacing: 2.52px;
  }
`;

const SliderWrapper = styled.div`
  margin-top: 55px;
`;

const VideoBackground = styled.div`
  width: 100%;
  overflow: hidden;
  height: 460px;

  video {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;
