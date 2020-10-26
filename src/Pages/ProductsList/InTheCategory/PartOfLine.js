import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "./dataOfPart";

function PartOfLine({ moveCategory }) {
  const [partsList, setPartsList] = useState([]);

  useEffect(() => {
    setPartsList(data.dataOfLine);
  }, []);

  return (
    <PartOfLineOuter>
      <TitleOfLine>라인별</TitleOfLine>
      <ListOfLine>
        {partsList.map((part) => (
          <Types
            sub_id={part.sub_id}
            id={part.id}
            key={part.id}
            onClick={moveCategory}
          >
            {part.part}
          </Types>
        ))}
      </ListOfLine>
    </PartOfLineOuter>
  );
}

const PartOfLineOuter = styled.ul`
  width: 33.3%;
  margin: 0 30px 12px 0;
`;

const TitleOfLine = styled.li`
  height: 27px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #eaeaea;
`;

const ListOfLine = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Types = styled.li`
  width: 50%;
  height: 30px;
  display: flex;
  align-items: center;
  color: #444444;

  &:hover {
    text-decoration: underline;
    color: #4477be;
  }
`;

export default PartOfLine;
