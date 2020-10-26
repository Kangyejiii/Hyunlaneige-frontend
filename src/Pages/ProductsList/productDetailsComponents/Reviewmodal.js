import React, { useState } from "react";
import styled from "styled-components";
import config from "../../../config";

function ReviewModal() {
  const [value, setValue] = useState({
    skin_type: "",
    rating: 0,
    comment: "",
    review_image: "",
  });

  const { skin_type, rating, comment, review_image } = value;

  const updateInfo = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const sendBack = () => {
    fetch(`http://3.128.33.10:8000/review`, {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        product_id: "1",
        skin_type: skin_type,
        rating: rating,
        comment: comment,
        review_image: review_image,
      }),
    }).then((res) => console.log(res));
  };

  return (
    <Container>
      <H2>리뷰하기 입력창</H2>
      <Input
        type="text"
        name="review_image"
        placeholder="url을 입력해 주세요"
        onchange={updateInfo}
      />
      <Select name="skin_type" onBlur={updateInfo}>
        <option>피부선택</option>
        <option>민감성</option>
        <option>건성</option>
        <option>지성</option>
        <option>중성</option>
        <option>복합성</option>
        <option>약건성</option>
        <option>트러블성</option>
      </Select>
      <Select name="rating" onBlur={updateInfo}>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </Select>
      <TextArea
        name="comment"
        onChange={updateInfo}
        placeholder="여기에 내용"
      ></TextArea>
      <Button onClick={(e) => sendBack(e)}>입력하기</Button>
    </Container>
  );
}

export default ReviewModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: 20px 0 40px 0;
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const Select = styled.select`
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: white;
`;
