import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import productsConfig from "./productsConfig";
import CategoryContainer from "./CategoryContainer";
import SortByContainer from "./SortByContainer";
import OrderShowAndHide from "./OrderShowAndHide";
import ListDetails from "./ListDetails";
import Item from "./Item";
import config from "../../config";
import NoResult from "./NoResult";
import Pagination from "./Pagination";

const LIST_HEADER_NAME = {
  category: "카테고리",
  sortBy: "신상품 순",
};

function ProductsList() {
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isSortByActive, setIsSortByActive] = useState(false);
  const [giftSet, onGiftSet] = useState(false);
  const [posts, setPosts] = useState([
    {
      image: [],
      tag: [],
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(16);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://3.128.33.10:8000/product/list"
        // "http://192.168.219.106:8000/product/list"
      );
      console.log(res.data.data);
      setPosts(res.data.data);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 320, behavior: "smooth" });
  };

  return (
    <ProductsListOuter>
      <HeaderImage>
        <ProductsPath>
          <PathWrapper>
            <li>스킨케어</li>
            <SeeAll>
              {posts[0].sub_category === undefined
                ? "전체보기"
                : posts[0].sub_category}
            </SeeAll>
            <Path history={posts[0].type_category}>
              {posts[0].type_category}
            </Path>
          </PathWrapper>
        </ProductsPath>
        <TitleWrapper>
          <TitleOfProducts>스킨케어</TitleOfProducts>
        </TitleWrapper>
      </HeaderImage>
      <ProductsListContainer>
        <ListHeaderWrapper>
          <ListHeader>
            <CategoryContainer
              handleCategory={() => setIsCategoryActive(!isCategoryActive)}
              isCategoryActive={isCategoryActive}
              category={LIST_HEADER_NAME.category}
            />
            <SortByWrapper>
              <SortByContainer
                handleSortBy={() => setIsSortByActive(!isSortByActive)}
                isSortByActive={isSortByActive}
                sortBy={LIST_HEADER_NAME.sortBy}
              />
              {isSortByActive === false ? null : <OrderShowAndHide />}
            </SortByWrapper>
            <TotalProducts>
              {posts[0].type_category} {posts.length ? posts.length : 0}개 상품
            </TotalProducts>
          </ListHeader>
          {isCategoryActive === false ? null : (
            <ListDetails
              moveCategory={(e) => {
                if (e.target.id === "28") {
                  onGiftSet(true);
                } else {
                  onGiftSet(false);
                }
                if (e.target.id === "0") {
                  const allList = async () => {
                    const res = await axios.get(
                      // "/Data/mockData/productsList.json"
                      "http://3.128.33.10:8000/product/list"
                      // "http://192.168.219.106:8000/product/list?sub=3"
                    );
                    setPosts(res.data.data);
                  };
                  allList();
                }
                console.log(e.target.sub_id, e.target.id);
                const fetchPosts = async () => {
                  const res = await axios.get(
                    `http://3.128.33.10:8000/product/list?sub=${e.target.sub_id}&type=${e.target.id}`
                  );
                  console.log(posts[0]);
                  setPosts(res.data.data);
                };
                fetchPosts();
              }}
              handleCategory={() => setIsCategoryActive(!isCategoryActive)}
              arrangeAllList={() => {
                const fetchPosts = async () => {
                  const res = await axios.get(
                    // "/Data/mockData/productsList.json"
                    "http://3.128.33.10:8000/product/list"
                  );
                  setPosts(res.data.data);
                };
                fetchPosts();
              }}
            />
          )}
        </ListHeaderWrapper>
        <ListContainer>
          {!giftSet &&
            currentPosts.map((post) => (
              <Item
                key={post.id}
                isId={post.id}
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
            ))}
          {giftSet && <NoResult />}
        </ListContainer>
        {!giftSet && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
        )}
      </ProductsListContainer>
    </ProductsListOuter>
  );
}

const ProductsListOuter = styled.main`
  width: 100vw;
  padding-top: 60px;
`;

const HeaderImage = styled.header`
  width: 100%;
  height: 320px;
  margin-bottom: 50px;
  position: relative;
  background-image: url(${productsConfig.url.HeaderImage});
  background-position: center;
`;

const ProductsPath = styled.ul`
  display: inline-block;
  padding: 15px 50px 0 50px;
  font-size: 14px;
`;

const PathWrapper = styled.div`
  display: flex;
`;

const SeeAll = styled.li`
  &:before {
    content: ">";
  }
`;

const Path = styled.li`
  &:before {
    content: ${(props) => (props.history ? ">" : "")};
  }
`;

const TitleWrapper = styled.div`
  ${({ theme }) => theme.full}
  ${({ theme }) => theme.center}
  position: absolute;
  top: 0;
`;

const TitleOfProducts = styled.h1`
  text-align: center;
  font-size: 40px;
  font-weight: 400;
`;

const ProductsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListHeaderWrapper = styled.section`
  margin-bottom: 20px;
`;

const ListHeader = styled.header`
  width: 1180px;
  height: 50px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 8px;
`;

const SortByWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 185px;
  z-index: 5;
`;

const ListContainer = styled.ul`
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
`;

const TotalProducts = styled.span`
  position: absolute;
  right: 0;
  font-weight: 300;
`;

export default ProductsList;
