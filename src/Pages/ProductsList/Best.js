import React from "react";
import styled from "styled-components";
import productsConfig from "./productsConfig";

function Best() {
  return <BestMark>BEST</BestMark>;
}

const BestMark = styled.span`
  width: 40px;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  background-color: ${productsConfig.color.bestColor};
  color: white;
`;

export default Best;
