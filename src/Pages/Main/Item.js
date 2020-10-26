import React from "react";
import styled from "styled-components";

export default function Item(props) {
  const { enName, name, review, reviewId, img } = props.data;

  return (
    <BestItem>
      <ImgBox>
        <ItemImg alt={enName} src={img} />
        <PickMeWrapper>
          <PickMe
            alt={"pick me"}
            src="https://www.laneige.com/kr/ko/assets/image/index/pickme.png"
          />
        </PickMeWrapper>
      </ImgBox>
      <Title>{enName}</Title>
      <SubTitle>{name}</SubTitle>
      <Comment>
        {review}
        <ReviewId>{reviewId}</ReviewId>
      </Comment>
    </BestItem>
  );
}

const BestItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 393.33px;
  height: 685px;
  padding: 20px;
`;

const PickMeWrapper = styled.div`
  position: absolute;
  right: 3%;
  bottom: 15%;
  width: 94px;
  height: 53px;
`;

const PickMe = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0;
`;

const ImgBox = styled.div`
  width: 320px;
  height: 384px;
  position: relative;
  cursor: pointer;

  :hover {
    ${PickMe} {
      opacity: 1;
    }
  }
`;

const ItemImg = styled.img`
  width: 100%;
`;

const Title = styled.div`
  margin-top: 30px;
  color: #4477be;
`;

const SubTitle = styled.div`
  margin: 9.5px 0 45.5px;
  font-size: 19px;
  color: #2b2b2b;
`;

const Comment = styled.div`
  width: 235px;
  font-size: 16px;
  color: #5f5f5f;
  line-height: 25.6px;
  word-break: keep-all;
`;

const ReviewId = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;
