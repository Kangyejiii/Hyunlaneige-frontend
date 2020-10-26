import React from "react";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import {
  FIRST_BANNER_ITEM,
  SECOND_BANNER_ITEM,
  LAST_BANNER_ITEM,
} from "./maindata";
import { useScrollFadeIn } from "./ useScrollFadeIn";

export default function Banner(props) {
  const firstAnimatedItemList = [
    useScrollFadeIn(),
    useScrollFadeIn(-20),
    useScrollFadeIn(),
  ];

  const secondAnimatedItemList = [
    useScrollFadeIn(-10, 0, 4),
    useScrollFadeIn(0, 0.5, 2),
  ];
  const lastAnimatedItemList = [useScrollFadeIn(), useScrollFadeIn()];

  return (
    <>
      <BannerWrapper padding>
        <BannerList>
          {FIRST_BANNER_ITEM.map((el, idx) => {
            return (
              <BannerItem
                data={el}
                key={el.name}
                animdata={firstAnimatedItemList[idx]}
              />
            );
          })}
        </BannerList>
      </BannerWrapper>
      <BannerWrapper margin>
        <BannerList>
          {SECOND_BANNER_ITEM.map((el, idx) => (
            <BannerItem
              data={el}
              key={el.name}
              animdata={secondAnimatedItemList[idx]}
            />
          ))}
        </BannerList>
      </BannerWrapper>
      <BannerWrapper>
        <OtherBannerList>
          {LAST_BANNER_ITEM.map((el, idx) => (
            <BannerItem
              data={el}
              key={el.name}
              animdata={lastAnimatedItemList[idx]}
            />
          ))}
        </OtherBannerList>
      </BannerWrapper>
    </>
  );
}

const BannerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: ${(props) => (props.padding ? "200px" : "")};
  margin-top: ${(props) => (props.margin ? "120px" : "")};
`;

const BannerList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1180px;
`;

const OtherBannerList = styled(BannerList)`
  align-items: flex-end;
`;
