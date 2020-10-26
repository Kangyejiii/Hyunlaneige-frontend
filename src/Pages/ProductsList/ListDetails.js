import React from "react";
import styled from "styled-components";
import productsConfig from "./productsConfig";
import PartOfType from "./InTheCategory/PartOfType";
import PartOfWorries from "./InTheCategory/PartOfWorries";
import PartOfLine from "./InTheCategory/PartOfLine";
import data from "./InTheCategory/dataOfPart";

function ListDetails({ handleCategory, arrangeAllList, moveCategory }) {
  return (
    <ListDetailsOuter>
      <CloseBtn onClick={handleCategory} />
      <Lists>
        <AllList onClick={arrangeAllList}>전체보기</AllList>
        <WrapperOfPart>
          <PartOfType moveCategory={moveCategory} />
          <PartOfWorries moveCategory={moveCategory} />
          <PartOfLine moveCategory={moveCategory} />
        </WrapperOfPart>
      </Lists>
    </ListDetailsOuter>
  );
}

const ListDetailsOuter = styled.ul`
  width: 1180px;
  padding: 18px 5% 30px 5%;
  border: ${productsConfig.color.borderColorGray};
  position: relative;
`;

const CloseBtn = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  top: 15px;
  right: 20px;
  background-image: url(${productsConfig.url.CloseIcon});
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center bottom -196px;
  opacity: 0.3;
`;

const Lists = styled.li`
  width: 100%;
  padding: 0 2%;
`;

const AllList = styled.span`
  display: inline-block;
  margin: 13px 20px 13px 0;

  &:hover {
    text-decoration: underline;
    color: #4477be;
  }
`;

const WrapperOfPart = styled.div`
  width: 100%;
  display: flex;
`;

export default ListDetails;
