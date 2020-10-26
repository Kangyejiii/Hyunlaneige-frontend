import React from "react";
import styled from "styled-components";
import productsConfig from "./productsConfig";

function New() {
  return <NewMark>NEW</NewMark>;
}

const NewMark = styled.span`
  width: 40px;
  margin-bottom: 2px;
  text-align: center;
  font-size: 14px;
  font-weight: 300;
  background-color: ${productsConfig.color.newColor};
  color: white;
`;

export default New;
