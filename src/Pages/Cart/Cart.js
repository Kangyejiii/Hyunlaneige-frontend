import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import config from "../../config";
import check from "./foursquare-.svg";

function Cart() {
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [ischecked, setIschecked] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("token"),
    };

    fetch(`http://3.128.33.10:8000/order/cart`, { headers })
      .then((response) => response.json())
      .then((res) => {
        setData(res.product_list);
        priceCalculation(res.product_list);
      });
  }, []);

  const priceCalculation = (data) => {
    const total = data.reduce((acc, cur) => {
      return acc + cur.price * cur.quantity;
    }, 0);

    const shippingFee = total > 20000 || total === 0 ? 0 : 2000;

    setProductPrice(total);
    setTotalPrice(total + shippingFee);
    setShipping(shippingFee);
  };

  useEffect(() => {
    priceCalculation(data);
  }, [data]);

  const handleDelete = (targetId) => {
    fetch(`http://3.128.33.10:8000/order/cart`, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        order_id: targetId,
      }),
    });

    let newData = data.filter((el) => el.order_id !== targetId);
    setData(newData);
  };

  const handleQuantity = (id, quantity) => {
    const result = data.map((el, idx) => {
      if (el.order_id === id) {
        el.quantity = quantity;
      }
      return el;
    });

    setData(result);

    fetch(`${config.API}/order/cart`, {
      method: "put",
      headers: {
        Authorization: config.token,
      },
      body: JSON.stringify({
        order_id: id,
        quantity: quantity,
      }),
    });
  };

  return (
    <Wrapper>
      <CartContainer>
        <Top> 바로구매</Top>
        <CartPanel>
          <CartTable>
            <thead>
              <tr>
                <th>
                  <CustomCheckBox isAble={ischecked}>
                    <input
                      type="checkbox"
                      onClick={(e) => {
                        console.log(e.target.checked);
                        setIschecked(e.target.checked);
                      }}
                    />
                    <span>
                      <img src={check} alt="" />
                    </span>
                  </CustomCheckBox>
                </th>
                <th>상품명/옵션명/상품가격</th>
                <th>수량</th>
                <th>할인금액</th>
                <th>판매가격</th>
                <th>마일리지</th>
                <th>주문</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el, idx) => (
                <CartItem
                  key={el.order_id}
                  deleteClick={handleDelete}
                  item={el}
                  quantityClick={handleQuantity}
                />
              ))}
            </tbody>
          </CartTable>
          <OrderTotal>
            <div>
              *배송비: 20,000원 이상 구매시 무료배송(마일리지 사용 금액 제외)
            </div>
            <div>
              보유 마일리지 <Bold>0M</Bold>
            </div>
            <InfoPrice>
              <Info>
                총 상품금액 <Bold>{productPrice.toLocaleString()}</Bold>원
              </Info>
              <Info>
                - 총 할인금액 <Bold>0</Bold>원
              </Info>
              <Info>
                - 총 사용 마일리지 <Bold>0</Bold>M
              </Info>
              <Info>
                + 배송비 <Bold>{shipping}</Bold>원
              </Info>
            </InfoPrice>
            <TotalPrice>
              결제 예상금액 <span>{totalPrice.toLocaleString()}</span>원
            </TotalPrice>
          </OrderTotal>
        </CartPanel>
        <OrderBox>
          <OrderChooseBtn>선택상품 주문하기</OrderChooseBtn>
          <OrderAllBtn>전체주문</OrderAllBtn>
        </OrderBox>
      </CartContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${({ theme }) => theme.center}
  width: 100%;
  padding: 100px 0;
  word-break: keep-all;
`;

const CartContainer = styled.main`
  width: 1100px;
  padding: 80px 0 140px;
`;

const Top = styled.div`
  width: 50%;
  padding: 15px 0;
  border: 1px solid #999999;
  border-bottom: none;
  text-align: center;
  font-size: 14px;
`;

const CartPanel = styled.div`
  padding-top: 40px;
`;

const CartTable = styled.table`
  width: 100%;
  border-top: 2px solid #222;

  thead {
    background-color: #f9f9f9;
    font-size: 13px;
  }

  th {
    padding: 10px 0;
    vertical-align: middle;
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

const OrderTotal = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-top: 1px solid #e8e8e8;
  font-size: 14px;
  text-align: right;

  div {
    margin-bottom: 10px;
  }
`;

const InfoPrice = styled.div`
  padding-top: 10px;
`;

const Info = styled.span`
  padding-left: 10px;
  color: #666;
`;

const Bold = styled.span`
  color: black;
  font-weight: bold;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 10px;
  font-weight: bold;

  span {
    padding-left: 10px;
    font-size: 32px;
    color: ${({ theme }) => theme.fontBlue};
  }
`;

const OrderBox = styled.div`
  ${({ theme }) => theme.center};
  height: 58px;
  margin-top: 48px;

  button {
    height: 100%;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
`;

const OrderChooseBtn = styled.button`
  width: 120px;
  height: 100%;
  margin-right: 5px;
  border: 1px solid #333333;
  background-color: #333333;

  &:hover {
    background-color: white;
    color: black;
  }
`;

const OrderAllBtn = styled.button`
  width: 120px;

  border: 1px solid ${({ theme }) => theme.fontBlue};
  background-color: ${({ theme }) => theme.fontBlue};

  &:hover {
    background-color: white;
    color: ${({ theme }) => theme.fontBlue};
  }
`;

const mockdata = [
  {
    order_id: 1,
    product_id: "1",
    name: "wecode",
    price: "4000",
    quantity: "2",
  },
  {
    order_id: 2,
    product_id: "2",
    name: "wecode",
    price: "2000",
    quantity: "1",
  },
];

export default Cart;
