import React, { useState, useEffect } from "react";
import styled from "styled-components";
import data from "./dataOfPart";

function PartOfType({ moveCategory }) {
  const [partsList, setPartsList] = useState([]);

  useEffect(() => {
    setPartsList(data.dataOfType);
  }, []);

  return (
    <PartOfTypeOuter>
      <TitleOfTypes>유형별</TitleOfTypes>
      <ListOfTypes>
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
      </ListOfTypes>
    </PartOfTypeOuter>
  );
}

const PartOfTypeOuter = styled.ul`
  width: 33.3%;
  margin: 0 30px 12px 0;
`;

const TitleOfTypes = styled.li`
  height: 27px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  border-bottom: 1px solid #eaeaea;
`;

const ListOfTypes = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Types = styled.li`
  display: flex;
  align-items: center;
  width: 50%;
  height: 30px;
  color: #444444;

  &:hover {
    text-decoration: underline;
    color: #4477be;
  }
`;

export default PartOfType;
