import React, { useState } from "react";
import styled from "styled-components";

// 여기에다가 slides src 정보 넣기
const slides = [0, 1, 2, 3];
export default function MainSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    if (activeIndex !== slides.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <Wrapper>
      <Content translate={activeIndex} transition="0.45">
        <video muted loop autoPlay>
          <source
            src="https://www.laneige.com/kr/ko/layout/main/key-visual/__icsFiles/afieldfile/2020/04/14/Laneige_WBE_Main_PC.mp4"
            type="video/mp4"
          />
        </video>
        <video muted loop autoPlay>
          <source
            src="https://www.laneige.com/kr/ko/layout/main/key-visual/__icsFiles/afieldfile/2020/09/01/perfect-renew-youth-regenerator-mainkv_pc_2_1.mp4"
            type="video/mp4"
          />
        </video>
        <SlideImg src="https://www.laneige.com/kr/ko/layout/main/key-visual/__icsFiles/afieldfile/2020/08/18/20200812_water-sleeping-mask-limited-edition_KV_pc_01_1.png" />
        <SlideImg src="https://www.laneige.com/kr/ko/layout/main/key-visual/__icsFiles/afieldfile/2020/06/17/20200617_neo-cushion_KV_pc_1.png" />
      </Content>

      <Indicator>
        <Arrow onClick={prevSlide}>
          <span>{`<`}</span>
        </Arrow>
        <Dots>
          {slides.map((slide, i) => (
            <Dot
              key={slide}
              active={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </Dots>
        <Arrow onClick={nextSlide}>
          <span>{`>`}</span>
        </Arrow>
      </Indicator>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 820px;
  margin: 0 auto;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  width: 100vw;
  height: 100%;
  transform: translateX(-${(props) => props.translate * 100}%);
  transition: transform ease-out ${(props) => props.transition}s;

  video {
    width: 100%;
    min-width: 100%;
    object-fit: fill;
  }
`;

const SlideImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Indicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  width: 100%;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  width: 25px;
  cursor: pointer;

  span {
    padding-top: 2px;
    font-size: 20px;
    text-align: center;
    color: #444;
  }
`;

const Dot = styled.span`
  padding: 4px;
  margin: 0 6px;
  cursor: pointer;
  border-radius: 50%;
  ${({ active }) => (active ? "border: 2px solid" : "")};
  background: ${({ active }) => (active ? "transparent" : "#5F5F5F")};

  &:hover {
    background: black;
  }
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  margin: 0 5px;
`;
