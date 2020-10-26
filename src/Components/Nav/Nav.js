import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubContent from "./SubContent";
import SubContentV2 from "./SubContentV2";
import Search from "./../Search/Search";
import { Brand, BestNewItem, Skin, MakeUp, Homme } from "./navData";
import pin from "./navImage/pin.svg";
import user from "./navImage/user.svg";
import search from "./navImage/search.svg";

export default function Nav({ searchBar }) {
  const [index, setIndex] = useState(-1);
  const [top, setTop] = useState(0);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    function onScroll() {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setTop(0);
      } else {
        setTop(-60);
      }
      prevScrollpos = currentScrollPos;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHover = (e) => {
    if (e.target.id) {
      setIndex(e.target.id);
    }
    setIsSearch(false);
  };

  const clickResult = () => {
    setIsSearch(false);
  };

  return (
    <NavBar top={top} onMouseLeave={() => setIndex(-1)}>
      <Logo to="/">
        <img
          alt="laneige"
          src="https://www.laneige.com/kr/ko/assets/image/a/laneige-logo.svg"
        />
      </Logo>
      <Menu onMouseOver={handleHover}>
        <div>
          <Item to="/" id="0">
            브랜드
          </Item>
          <SubContent
            id="0"
            data={Brand}
            displayMode={index === "0" ? "flex" : "none"}
          />
        </div>
        <div>
          <Item to="/" id="1">
            베스트 & 신상품
          </Item>
          <SubContent
            data={BestNewItem}
            displayMode={index === "1" ? "flex" : "none"}
          />
        </div>
        <div>
          <Item to="/product/list" id="2">
            스킨케어
          </Item>
          <SubContentV2
            firstData={Skin.FirstType}
            secondData={Skin.SecondType}
            lastData={Skin.LastType}
            bannerData={Skin.BannerData}
            displayMode={index === "2" ? "flex" : "none"}
          />
        </div>
        <div>
          <Item to="/" id="3">
            메이크업
          </Item>
          <SubContentV2
            firstData={MakeUp.FirstType}
            secondData={MakeUp.SecondType}
            lastData={MakeUp.LastType}
            bannerData={MakeUp.BannerData}
            displayMode={index === "3" ? "flex" : "none"}
          />
        </div>
        <div>
          <Item to="/" id="4">
            옴므
          </Item>
          <SubContentV2
            firstData={Homme.FirstType}
            secondData={Homme.SecondType}
            lastData={Homme.LastType}
            bannerData={Homme.BannerData}
            displayMode={index === "4" ? "flex" : "none"}
          />
        </div>
        <div>
          <Item to="/" id="5">
            이벤트
          </Item>
        </div>
      </Menu>
      <IconList>
        <Icon to="/signin">
          <img alt="user" src={user} />
        </Icon>
        <Icon to="/">
          <img alt="map" src={pin} />
        </Icon>
        <SearchButton
          onClick={() => {
            setIsSearch(!isSearch);
            setIndex(-1);
          }}
        >
          <img alt="search" src={search} />
        </SearchButton>
        <Search
          position={"absolute"}
          clickSearch={clickResult}
          displayMode={isSearch ? "flex" : "none"}
        />
      </IconList>
    </NavBar>
  );
}

const NavBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: ${(props) => props.top}px;
  width: 100vw;
  height: 60px;
  padding: 0 50px;
  font-family: "Arita-dotum-Medium";
  background-color: #fff;
  border-bottom: 1px solid #dddd;
  transition: top 0.3s;
  z-index: 999;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 150px;
  height: 100%;
  padding-right: 10px;

  img {
    width: 130px;
    height: 21.56px;
  }
`;

const Menu = styled.ul`
  display: flex;
  justify-content: center;
  width: 613.36px;
  height: 100%;
  cursor: pointer;
`;

const Item = styled(Link)`
  display: block;
  position: relative;
  height: 100%;
  padding: 21.6px 20px 0px;
  font-size: 18px;
  font-weight: 400;
  color: #5f5f5f;
  white-space: nowrap;

  &:hover {
    font-weight: bold;
    border-bottom: 3px solid;
  }
`;

const IconList = styled.div`
  display: flex;
  height: 42px;
`;

const Icon = styled(Link)`
  height: 100%;
  padding: 10px;

  img {
    height: 100%;
  }
`;

const SearchButton = styled.button`
  height: 100%;
  padding: 10px;
  background: inherit;
  cursor: pointer;

  img {
    height: 100%;
  }
`;
