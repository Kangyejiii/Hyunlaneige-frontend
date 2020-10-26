import React from "react";
import styled from "styled-components";

function SortByContainer({ isSortByActive, sortBy, handleSortBy }) {
  return (
    <SortBy onClick={handleSortBy} isSortByActive={isSortByActive}>
      <span>{sortBy}</span>
      <SortByToggle
        style={{ transform: isSortByActive === false ? "" : "scaleY(-1)" }}
      />
    </SortBy>
  );
}

const SortBy = styled.div`
  width: 182px;
  height: 100%;
  ${({ theme }) => theme.centerSpaceBetween};
  border: 1px solid
    ${(props) => (props.isSortByActive === false ? "#cccccc" : "#767676")};
  padding: 16px 15px;
`;

const SortByToggle = styled.span`
  width: 14px;
  height: 14px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid Meet' width='100' height='100'%3e%3cpath d='M100 5.5c0 1.3-.5 2.6-1.5 3.5L50 57.5 1.5 9c-2-2-2-5.1 0-7.1s5.1-2 7.1 0L50 43.4 91.5 1.9c2-2 5.1-2 7.1 0 .9 1 1.4 2.3 1.4 3.6z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: top 3px center;
  background-size: 100%;
`;

export default SortByContainer;
