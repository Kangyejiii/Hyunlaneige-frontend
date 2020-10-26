import React from "react";
import styled from "styled-components";
import "./NoResult.scss";

function NoResult() {
  return (
    <NoContent>
      <div className="msgContainer">
        <span>
          <i className="fas fa-exclamation-circle fa-2x" />
        </span>
        <NoProductList>등록된 상품이 없습니다.</NoProductList>
      </div>
    </NoContent>
  );
}

const NoContent = styled.div`
  width: 100%;
  padding: 120px 0;
`;

const NoProductList = styled.h1`
  text-align: center;
  font-size: 19px;
  color: #e0e0e0;
`;

export default NoResult;
