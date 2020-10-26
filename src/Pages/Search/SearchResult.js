import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "../../Components/Search/Search";
import NoResult from "../ProductsList/NoResult";
import Item from "../ProductsList/Item";

const mockdata = [
  {
    id: 1,
    is_new: "true",
    is_best: "false",
    image: [
      "https://www.laneige.com/kr/ko/skincare/__icsFiles/afieldfile/2020/08/24/20200824_final_Perfect-Renew-Youth-Regenerating-Cream_thumbnail_01_pc.png",
      "https://www.laneige.com/kr/ko/skincare/__icsFiles/afieldfile/2020/08/24/20200824_final_Perfect-Renew-Youth-Regenerating-Cream_thumbnail_01_pc.png",
    ],
    tag: ["초기피부노화징후개선", "안티에이징크림"],
    korean_name: "퍼펙트 리뉴 유스 리제너레이팅 크림",
  },
];

const SearchResult = (props) => {
  const [searchKeyword, setSearchKeyword] = useState();
  const [resultItems, setResultItems] = useState([]);

  useEffect(() => {
    if (props.history.location.state) {
      setSearchKeyword(props.history.location.state.text);
    }
  }, [props.history.location.state, props.history.location.state.text]);

  const handleSearch = (keyword) => {
    fetch(`http://3.128.33.10:8000/product/search?keyword=${keyword}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length) {
          setResultItems(res.data);
        } else {
          const result = [];
          setResultItems(result);
        }
      });
  };

  return (
    <Wrapper>
      <Search
        position={"inherit"}
        displayMode={"flex"}
        placeHolder={searchKeyword}
        clickSearch={handleSearch}
      />
      <ResultWrapper>
        <Comment>
          상품 <span>{resultItems.length}</span>건이 검색되었습니다.
        </Comment>
        <ResultContainer>
          {resultItems.length ? (
            resultItems.map((post) => (
              <Item
                key={post.id}
                isNew={post.is_new}
                isBest={post.is_best}
                image={post.image[0]}
                hashFirst={post.tag[0]}
                hashSecond={post.tag[1]}
                productName={post.korean_name}
                hover={
                  post.image[0] === post.image[1]
                    ? post.image[0]
                    : post.image[1]
                }
              />
            ))
          ) : (
            <NoResult />
          )}
        </ResultContainer>
      </ResultWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ResultWrapper = styled.div`
  width: 1200px;
  margin-top: 60px;
`;

const Comment = styled.div`
  width: 100%;
  font-size: 17px;
  margin-bottom: 10px;
  span {
    color: ${({ theme }) => theme.fontBlue};
  }
`;

const ResultContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-top: 1px solid ${(theme) => theme.fontGray};
`;

export default SearchResult;
