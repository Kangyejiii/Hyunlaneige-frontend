import React from "react";
import styled from "styled-components";

function OrderShowAndHide() {
  return (
    <OrderWrapper>
      <OrderOfNew>
        <span>신상품 순</span>
      </OrderOfNew>
      <OrderOfBest>
        <span>베스트 순</span>
      </OrderOfBest>
    </OrderWrapper>
  );
}

const OrderWrapper = styled.div`
  border-right: 1px solid #767676;
  border-bottom: 1px solid #767676;
  border-left: 1px solid #767676;
`;

const OrderOfNew = styled.span`
  width: 180px;
  height: 100%;
  ${({ theme }) => theme.centerSpaceBetween};
  padding: 16px 15px;
  background-color: white;

  &:hover {
    background-color: #f7f7f7;
  }
`;

const OrderOfBest = styled.span`
  width: 180px;
  height: 100%;
  ${({ theme }) => theme.centerSpaceBetween};
  padding: 16px 15px;
  background-color: white;

  &:hover {
    background-color: #f7f7f7;
  }
`;

export default OrderShowAndHide;
