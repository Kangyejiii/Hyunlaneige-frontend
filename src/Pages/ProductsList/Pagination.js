import React, { useState } from "react";
import styled from "styled-components";

function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];
  const [activeBtn, setActiveBtn] = useState(1);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationOuter>
      {pageNumbers.map((number) => (
        <PageBtn
          key={number}
          onClick={() => {
            paginate(number);
            setActiveBtn(number);
          }}
          backgroundColor={activeBtn === number ? "#2b2b2b" : ""}
          color={activeBtn === number ? "white" : "#2b2b2b"}
          hover={activeBtn === number ? "#4478be" : ""}
        >
          {number}
        </PageBtn>
      ))}
    </PaginationOuter>
  );
}

const PaginationOuter = styled.ul`
  ${({ theme }) => theme.justifyCenter};
  width: 1180px;
  height: 36px;
  margin-bottom: 120px;
`;

const PageBtn = styled.li`
  ${({ theme }) => theme.center};
  width: 33px;
  height: 33px;
  margin: 0 4px;
  color: ${(props) => props.color};
  /* background-color: #2b2b2b; */
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    background-color: ${(props) => props.hover};
    text-decoration: underline;
    transition: 0.3s;
  }
`;

export default Pagination;
