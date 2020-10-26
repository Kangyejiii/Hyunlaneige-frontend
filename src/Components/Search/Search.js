import React, { useState } from "react";
import styled from "styled-components";
import productsConfig from "../../Pages/ProductsList/productsConfig";
import { useHistory } from "react-router-dom";

function Search(props) {
  const { position, displayMode, placeHolder } = props;
  const [keyword, setKeyword] = useState();
  const history = useHistory();

  const handleClick = () => {
    history.push({ pathname: "/search", state: { text: keyword } });
    if (props.clickSearch) {
      props.clickSearch(keyword);
    }
  };

  return (
    <SearchBar position={position} displayMode={displayMode}>
      <InputContainer>
        <SearchInput
          placeholder={placeHolder ? placeHolder : "검색어를 입력해 주세요"}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Icon className="fas fa-search" />
        <CloseBtn />
        <SearchBtn onClick={handleClick}>검색</SearchBtn>
      </InputContainer>
      <RecoContainer>
        <RecoItem>크림스킨</RecoItem>
        <RecoItem>워터뱅크</RecoItem>
        <RecoItem>레이어링 립 바</RecoItem>
        <RecoItem>수분맑음피부</RecoItem>
        <RecoItem>피부장벽강화</RecoItem>
        <Recommendation>추천검색어</Recommendation>
      </RecoContainer>
    </SearchBar>
  );
}

const SearchBar = styled.section`
  display: ${(props) => props.displayMode};
  flex-direction: column;
  align-items: center;
  width: 100vw;
  position: ${(props) => props.position};
  top: 0;
  left: 0;
  margin-top: 60px;
  padding: 5.625rem 0 5rem 0;
  border-bottom: 1px solid #ddd;
  background-color: #f7f7f7;
`;

const InputContainer = styled.div`
  width: 780px;
  padding-right: 200px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 55px;
  padding-left: 2.5em;
  padding-top: 10px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #cccccc;
  font-size: 1.0625rem;
`;

const Icon = styled.i`
  position: absolute;
  left: 11px;
  top: 23px;
`;

const CloseBtn = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 21px;
  right: 210px;
  background-image: url(https://ssl.gstatic.com/translate/2x_mobile.png);
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center bottom -140px;
  opacity: 0.5;
`;

const SearchBtn = styled.button`
  width: 180px;
  height: 55px;
  position: absolute;
  right: 0;
  background-color: #2b2b2b;
  color: white;
  font-size: 1.0625rem;
  font-weight: 300;
  cursor: pointer;
`;

const RecoContainer = styled.div`
  display: flex;
  position: relative;
  width: 780px;
  height: 67px;
  padding-top: 1.875rem;
  padding-left: 6.5625rem;
`;

const RecoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  padding: 4px 12px;
  margin-right: 10px;
  border: 1px solid #ccc;
  color: #444;
`;

const Recommendation = styled.div`
  position: absolute;
  top: 38px;
  left: 0px;
  color: #444;
`;

export default Search;
