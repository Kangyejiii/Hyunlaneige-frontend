import React, { useState } from "react";
import styled from "styled-components";
import check from "./foursquare-.svg";

function CartItem(props) {
  const { name, price, image_url, quantity, order_id } = props.item;
  const [itemQuantity, setItemQuantitiy] = useState();
  const [isChecked, setIsChecked] = useState(true);

  const handleQuantity = (e) => {
    setItemQuantitiy(e.target.value);
    props.quantityClick(order_id, e.target.value);
  };

  const totalPrice = itemQuantity ? price * itemQuantity : price * quantity;
  return (
    <Item>
      <td>
        <CustomCheckBox isAble={isChecked}>
          <input
            type="checkbox"
            onClick={(e) => {
              setIsChecked(e.target.checked);
            }}
            defaultChecked={isChecked}
          />
          <span>
            <img src={check} alt="" />
          </span>
        </CustomCheckBox>
      </td>
      <ItemInfo>
        <ImgBox>
          <img alt="" src={image_url} />
        </ImgBox>
        <Content>
          <Name>{name}</Name>
          <div>₩ {price.toLocaleString()}</div>
        </Content>
      </ItemInfo>
      <td>
        <select name="quantity" onChange={handleQuantity} disabled={!isChecked}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el) => {
            const condition = el === +itemQuantity;
            return (
              <option key={el} value={el} defaultValue={condition}>
                {el}
              </option>
            );
          })}
        </select>
      </td>
      <td>0원</td>
      <Price>
        <span>{totalPrice.toLocaleString()}</span>
        <span>원</span>
      </Price>
      <td>
        <Mileage>마일리지 적용</Mileage>
      </td>
      <td>
        <div>
          <DeleteBtn onClick={() => props.deleteClick(order_id)}>
            x <span>삭제</span>
          </DeleteBtn>
        </div>
      </td>
    </Item>
  );
}

const Item = styled.tr`
  td {
    padding: 10px 0;
    text-align: center;
    vertical-align: middle;
    font-weight: bold;
  }
`;

const CustomCheckBox = styled.label`
  display: flex;
  justify-content: center;
  cursor: pointer;

  input {
    display: none;
  }

  span {
    width: 24px;
    height: 24px;

    img {
      width: 100%;
      height: 100%;
      opacity: ${(props) => (props.isAble === true ? 1 : 0.3)};
    }
  }
`;
const ItemInfo = styled.td`
  display: flex;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  font-size: 13px;
  font-weight: 400;
`;

const Name = styled.div`
  margin-bottom: 5px;
`;

const ImgBox = styled.div`
  width: 100px;
  height: 100px;

  img {
    width: 100%;
  }
`;

const Price = styled.td`
  width: 110px;
`;

const Mileage = styled.button`
  height: 34px;
  background-color: inherit;
  border: 1px solid;
  font-size: 13px;
`;

const DeleteBtn = styled.button`
  background-color: inherit;
  font-weight: bold;
  cursor: pointer;
`;

export default CartItem;
