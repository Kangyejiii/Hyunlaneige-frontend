import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";
import New from "./New";
import Best from "./Best";
import useHover from "./ItemUseHover";

function Item({
  isId,
  isNew,
  isBest,
  image,
  hashFirst,
  hashSecond,
  productName,
  hover,
}) {
  const [hoverRef, isHoverd] = useHover();
  const history = useHistory();
  // const { id } = useParams();

  const goToDetail = () => {
    // console.log(id);
    history.push(`/product/list/${isId}`);
    // history.push(`/product/list/${isId}?sub=${}`);
  };

  return (
    <ItemOuter onClick={goToDetail}>
      <ItemImg ref={hoverRef} src={isHoverd ? hover : image} />
      <Mark>
        {isNew === "true" && <New />}
        {isBest === "true" && <Best />}
      </Mark>
      <HashWrapper>
        <HashFirst>{hashFirst}</HashFirst>
        <HashSecond>{hashSecond}</HashSecond>
      </HashWrapper>
      <ProductName>{productName}</ProductName>
    </ItemOuter>
  );
}

const ItemOuter = styled.li`
  width: 280px;
  height: 444px;
  margin: 0 10px 20px 10px;
  padding-bottom: 8px;
  position: relative;
`;

const ItemImg = styled.img`
  width: 100%;
  height: 336px;
  margin-bottom: 10px;
`;

const Mark = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
`;

const HashWrapper = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HashFirst = styled.span`
  margin: 0 3px;
  font-size: 0.875rem;
  font-weight: lighter;

  &::before {
    content: "#";
  }
`;

const HashSecond = styled.span`
  margin: 0 3px;
  font-size: 0.875rem;
  font-weight: lighter;

  &::before {
    content: "#";
  }
`;

const ProductName = styled.div`
  padding: 0 0.5em 1em 0.5em;
  margin-top: 4px;
  text-align: center;
  font-size: 1.0625rem;
  word-break: keep-all;
`;

export default Item;
