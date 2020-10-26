import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "./dataOfPart";

function PartOfWorries({ moveCategory }) {
  const [partsList, setPartsList] = useState([]);

  useEffect(() => {
    setPartsList(data.dataOfWorries);
  }, []);

  return (
    <PartOfWorriesOuter>
      <TitleOfWorries>고민별</TitleOfWorries>
      <ListOfWorries>
        {partsList.map((part) => (
          <Types
            id={part.id}
            sub_id={part.sub_id}
            key={part.id}
            onClick={moveCategory}
          >
            {part.part}
          </Types>
        ))}
      </ListOfWorries>
    </PartOfWorriesOuter>
  );
}

const PartOfWorriesOuter = styled.ul`
  width: 33.3%;
  margin: 0 30px 12px 0;
`;

const TitleOfWorries = styled.li`
  height: 27px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #eaeaea;
`;

const ListOfWorries = styled.ul`
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

export default PartOfWorries;
