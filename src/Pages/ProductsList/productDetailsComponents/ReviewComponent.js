import React from "react";
import styled from "styled-components";
import config from "../../../config";

function ReviewComponent(review) {
  const {
    identifier,
    rating,
    skin_type,
    date,
    comment,
    review_image,
    review_id,
  } = review.review;

  const delReview = () => {
    fetch(`http://3.128.33.10:8000/review`, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        review_id: review_id,
      }),
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <XMark alt="del button" src="./Images/xMark.png" onClick={delReview} />
      <StarScore>{"★".repeat(rating)}</StarScore>
      <InfoContainer>
        <UserInfomation>{identifier}</UserInfomation>
        <Bulkhead />
        <UserInfomation>{skin_type}</UserInfomation>
        <Bulkhead />
        <UserInfomation>{date.slice(0, 10)}</UserInfomation>
      </InfoContainer>
      <Main>{comment}</Main>
      <PhotoContainoer>
        <ReviewPhoto src={review_image} />
      </PhotoContainoer>
    </Container>
  );
}

export default ReviewComponent;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 313.3px;
  background-color: white;
  padding: 40px 30px;
  margin: 0 0 20px 12px;
`;

const XMark = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
`;

const StarScore = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const UserInfomation = styled.p`
  font-size: 16px;
  color: #5f5f5f;
`;

const Bulkhead = styled.div`
  border-left: 1px solid #dddddd;
  margin: 2px 10px;
`;

const Main = styled(UserInfomation.withComponent("div"))`
  line-height: 25px;
  color: #5f5f5f;
  margin-top: 10px;
`;

const PhotoContainoer = styled.div`
  margin-top: 14px;
`;

const ReviewPhoto = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 8px;
`;
