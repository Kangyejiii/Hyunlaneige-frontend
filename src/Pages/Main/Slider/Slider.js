import React, { useState } from "react";
import styled from "styled-components";
import Item from "../Item";
import { BEST_SELLER_LIST } from "./../maindata";

export default function Slider() {
  const getWidth = 393.33;
  const [translate, setTranslate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = BEST_SELLER_LIST.length;

  const nextSlide = () => {
    if (activeIndex !== slides - 3) {
      setActiveIndex(activeIndex + 1);
      setTranslate((activeIndex + 1) * getWidth);
    }
  };

  const prevSlide = () => {
    if (activeIndex !== 0) {
      setActiveIndex(activeIndex - 1);
      setTranslate((activeIndex - 1) * getWidth);
    }
  };

  return (
    <Wrapper>
      <Content
        translate={translate}
        transition="0.45"
        widthsize={getWidth * slides}
      >
        {BEST_SELLER_LIST.map((el) => (
          <Item key={el.enName} data={el} />
        ))}
      </Content>
      <Arrow direction="left" onClick={prevSlide}>
        <ArrowImg src="https://assets1.pxlecdn.com/assets/embed/glyph/prev@2x-831196d6c5ac3c7768872fb15b4a6b09ba6ed9d46a4f4456d337deaf54f537a3.png" />
      </Arrow>
      <Arrow direction="right" onClick={nextSlide}>
        <ArrowImg src="https://assets1.pxlecdn.com/assets/embed/glyph/next@2x-8dd64ee649b23a16e84d9d73cee03530becaa3adca45d7ccc70b9fe64333da30.png" />
      </Arrow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  width: ${(props) => props.widthsize}px;
  height: 100%;
  transform: translateX(-${(props) => props.translate}px);
  transition: transform ease-out ${(props) => props.transition}s;
`;

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 35%;
  ${(props) => (props.direction === "right" ? `right: 25px` : `left: 25px`)};
  cursor: pointer;
  z-index: 10;
`;

const ArrowImg = styled.img`
  width: 12px;
  height: 24px;

  &:focus {
    outline: 0;
  }
`;
