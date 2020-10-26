import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//후에 data뿐만아니라 link 주소도 같이 써줘야함
export default function SubContent(props) {
  return (
    <Wrapper condition={props.displayMode}>
      <ul>
        {props.data.map((el) => (
          <Link to="/" key={el}>
            {el}
          </Link>
        ))}
      </ul>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: ${(props) => props.condition};
  justify-content: center;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #ddd;
  background-color: #f7f7f7;
  z-index: 999;

  ul {
    display: flex;
    justify-content: flex-start;
    width: 613px;
    height: 100%;

    a {
      display: flex;
      padding: 17px 20px 14px;
      font-weight: 400;
    }
  }
`;
