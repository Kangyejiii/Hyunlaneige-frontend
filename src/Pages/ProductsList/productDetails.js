import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import ReviewComponent from "./productDetailsComponents/ReviewComponent";
import ReviewModal from "./productDetailsComponents/Reviewmodal";

function ProductDetails() {
  const [state, setState] = useState({
    product: {
      sub_category: "",
      type_category: "",
      korean_name: "",
      tag: [],
      description: "",
      size: "",
      price: "",
      image: [],
      detail: "",
      precaution: "",
      ingredient: "",
    },
  });
  const [review, setReview] = useState([]);

  const history = useHistory();

  const match = useRouteMatch();

  const Y_indexDetail = useRef({ current: { offsetTop: 0 } });

  const Y_indexReview = useRef({ current: { offsetTop: 0 } });

  const Y_indexPrecaution = useRef({ current: { offsetTop: 0 } });

  const Y_indexwindow = useRef({ current: { offsetHeight: 0 } });

  const [top, setTop] = useState(0);

  const [hide, setHide] = useState("true");

  const modalHide = () => {
    setHide(!hide);
  };

  const [quantity, setQuantity] = useState();

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    function onScroll() {
      let currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        setTop(60);
      } else {
        setTop(0);
      }
      prevScrollpos = currentScrollPos;
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://3.128.33.10:8000/product/list/${match.params.id}${history.location.search}`
      );
      console.log(res);
      setState({ product: res.data.data[0] });
    };

    getData();
  }, [history.location.search, match.params.id]);

  useEffect(() => {
    fetch(`http://3.128.33.10:8000/review?product=${match.params.id}`)
      .then((res) => res.json())
      .then((res) => {
        setReview(res.Review_list);
      });
  }, [match.params.id]);

  useEffect(() => {
    state.product.image.splice(0, 2);
    setPhotoChange(state.product.image[0]);
  }, [state, state.product.image]);

  const addProductHandler = () => {
    fetch(`http://3.128.33.10:8000/order/cart`, {
      method: "post",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        product: state.product.product_id,
        quantity: quantity,
      }),
    }).then((res) => console.log(res));
  };

  const [photoChange, setPhotoChange] = useState(state.product.image[0]);

  const [bold, setBold] = useState("all");

  const [border, setBorder] = useState({ skinType: "", textType: "" });

  const [rotate, setRotate] = useState({ precaution: "", ingredient: "" });

  const [clickSkin, setClickSkin] = useState("피부타입");

  const [clickText, setClickText] = useState("작성일순");

  const { product } = state;

  const { skinType, textType } = border;

  const { precaution, ingredient } = rotate;

  const photoChanger = (e) => {
    setPhotoChange(e.target.src);
  };

  const weightChanger = (e) => {
    setBold(e.target.name);
  };

  const precautionRotationHandler = (e) => {
    const { name } = e.target;
    if (rotate.precaution !== "precaution") {
      setRotate({ ...rotate, [name]: name });
    } else {
      setRotate({ ...rotate, [name]: "" });
    }
  };

  const ingredientRotationHandler = (e) => {
    const { name } = e.target;
    if (rotate.ingredient !== "ingredient") {
      setRotate({ ...rotate, [name]: name });
    } else {
      setRotate({ ...rotate, [name]: "" });
    }
  };

  const skinTypeChanger = (e) => {
    const { name } = e.target;
    if (skinType !== name) {
      setTimeout(() => setBorder({ ...border, skinType: name }), 200);
    } else {
      setTimeout(() => setBorder({ ...border, [name]: "" }), 200);
    }
  };

  const countQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const textTypeChanger = (e) => {
    const { name } = e.target;
    if (textType !== name) {
      setTimeout(() => setBorder({ ...border, textType: name }), 200);
    } else {
      setTimeout(() => setBorder({ ...border, [name]: "" }), 200);
    }
  };

  const skinTypeHandler = (e) => {
    setClickSkin(e.target.value);
  };

  const textTypeHandler = (e) => {
    setClickText(e.target.value);
  };

  let scoreSum = 0;
  return (
    <Container ref={Y_indexwindow}>
      <Section>
        <BreadCrumb>
          <span>스킨케어</span>
          {">"}
          <span>{product.main_category}</span>
          {">"}
          <span>{product.sub_category}</span>
        </BreadCrumb>
        <DetailContainer>
          <ArticlePhoto>
            <PhotoList>
              {product.image.map((photo, idx) => (
                <LittlePhoto
                  alt="littlePhoto"
                  key={idx}
                  src={photo}
                  photoChange={photoChange}
                  onClick={photoChanger}
                />
              ))}
            </PhotoList>
            <LargePhoto alt="product photo" src={photoChange} />
          </ArticlePhoto>
          <ArticleText>
            <TextContainer>
              <HashTagContainer>
                {product.tag.map((tag) => (
                  <HashTag># {tag}</HashTag>
                ))}
              </HashTagContainer>
              <H1>{product.korean_name}</H1>
              <Quotes alt="Quotes" src="./Images/Quotes.png" />
              <Explain>{product.description}</Explain>
              <Infomation>
                <span>{product.size}</span>
                <span>₩ {product.price}</span>
              </Infomation>
              <QuantityContainer>
                <button>수량:</button>
                <InpurQuantity type="number" onChange={countQuantity} />
              </QuantityContainer>
              <PurchaseButton onClick={addProductHandler}>
                장바구니에 넣기
              </PurchaseButton>
              <PurchaseButton
                true="true"
                onClick={() => history.push({ pathname: "/order/cart" })}
              >
                장바구니로 이동
              </PurchaseButton>
              <ShareContainer>
                <Share alt="share" src="./Images/share.png" />
              </ShareContainer>
            </TextContainer>
          </ArticleText>
        </DetailContainer>
      </Section>
      <SectionCol>
        <Header top={top}>
          <SubNav
            marked={[
              0,
              Y_indexReview.current.offsetTop - Y_indexDetail.current.offsetTop,
            ]}
            onClick={() =>
              window.scroll({
                top: Y_indexDetail.current.offsetTop,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            상품 특징
          </SubNav>
          <SubNav
            marked={[
              Y_indexReview.current.offsetTop - Y_indexDetail.current.offsetTop,
              Y_indexPrecaution.current.offsetTop -
                Y_indexDetail.current.offsetTop,
            ]}
            onClick={() =>
              window.scroll({
                top: Y_indexReview.current.offsetTop,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            사용 리뷰({review.length})
          </SubNav>
          <SubNav
            marked={[
              Y_indexPrecaution.current.offsetTop -
                Y_indexDetail.current.offsetTop,
              Y_indexwindow.current.offsetHeight,
            ]}
            onClick={() =>
              window.scroll({
                top: Y_indexPrecaution.current.offsetTop,
                left: 0,
                behavior: "smooth",
              })
            }
          >
            전성분/주의사항
          </SubNav>
        </Header>
        <HTML ref={Y_indexDetail}>
          <Frame src="./Images/1.png" />
          <Frame src="./Images/2.png" />
          <Frame src="./Images/2.5.png" />
          <Frame src="./Images/3.png" />
          <Frame src="./Images/4.png" />
          <Frame src="./Images/5.png" />
          <Frame src="./Images/6.png" />
          <Frame src="./Images/7.png" />
        </HTML>
        <ReviewContainer ref={Y_indexReview}>
          <SubTitle>ARITAUM REVIEWS</SubTitle>
          <ReviewTitle>{review.length}개의 소중한 상품 리뷰</ReviewTitle>
          <StarScore>
            {
              (review.map((props) => {
                scoreSum = scoreSum + Number(props.rating);
                return scoreSum;
              }),
              "★".repeat(Math.round(scoreSum / review.length)))
            }
            &nbsp;&nbsp;&nbsp;
            {(scoreSum / review.length).toFixed(1)}
            /5.0
          </StarScore>
          <ReviewMain>
            <ReviewHeader>
              <ButtonFilter>
                <RewiewFilter name="all" bold={bold} onClick={weightChanger}>
                  전체
                </RewiewFilter>
                <Bulkhead />
                <RewiewFilter
                  name="photoReview"
                  bold={bold}
                  onClick={weightChanger}
                >
                  포토리뷰
                </RewiewFilter>
              </ButtonFilter>
              <ButtonFilter>
                <SelectContainer
                  onFocus={skinTypeChanger}
                  onBlur={skinTypeChanger}
                  name="skinType"
                >
                  <SelectSkin name="skinType" border={border}>
                    {clickSkin}
                  </SelectSkin>
                  <SelectOptionContainerSkin
                    onClick={skinTypeHandler}
                    border={border}
                  >
                    <SelectOption value="피부타입">피부타입</SelectOption>
                    <SelectOption value="민감성">민감성</SelectOption>
                    <SelectOption value="건성">건성</SelectOption>
                    <SelectOption value="지성">지성</SelectOption>
                    <SelectOption value="중성">중성</SelectOption>
                    <SelectOption value="복합성">복합성</SelectOption>
                    <SelectOption value="약건성">약건성</SelectOption>
                    <SelectOption value="트러블성">트러블성</SelectOption>
                  </SelectOptionContainerSkin>
                </SelectContainer>
                <Bulkhead />
                <SelectContainer
                  onFocus={textTypeChanger}
                  onBlur={textTypeChanger}
                  name="textType"
                >
                  <SelectText name="textType" border={border}>
                    {clickText}
                  </SelectText>
                  <SelectOptionContainerText
                    onClick={textTypeHandler}
                    border={border}
                  >
                    <SelectOption value="작성일순">작성일순</SelectOption>
                    <SelectOption value="베스트순">베스트순</SelectOption>
                    <SelectOption value="높은평점순">높은평점순</SelectOption>
                    <SelectOption value="낮은평점순">낮은평점순</SelectOption>
                  </SelectOptionContainerText>
                </SelectContainer>
              </ButtonFilter>
            </ReviewHeader>
          </ReviewMain>
          <ReviewComponentContainer>
            {review.map((review, idx) => (
              <ReviewComponent key={idx} review={review} />
            ))}
          </ReviewComponentContainer>
          <AddReview onClick={() => modalHide()}>리뷰 하기</AddReview>
          <ModalContainer hide={hide}>
            <ReviewModal />
          </ModalContainer>
        </ReviewContainer>
      </SectionCol>
      <SectionCol ref={Y_indexPrecaution}>
        <TMI name="precaution" onClick={precautionRotationHandler}>
          주의사항
          {precaution === "precaution" ? (
            <RotateMinus src="./Images/minus.png" />
          ) : (
            <RotateReversMinus src="./Images/minus.png" />
          )}
          <Minus src="./Images/minus.png" />
        </TMI>
        <Precaution name="precaution" precaution={precaution}>
          {product.precaution}
        </Precaution>
        <TMI
          name="ingredient"
          ingredient={ingredient}
          onClick={ingredientRotationHandler}
        >
          전성분
          {ingredient === "ingredient" ? (
            <RotateMinus src="./Images/minus.png" />
          ) : (
            <RotateReversMinus src="./Images/minus.png" />
          )}
          <Minus src="./Images/minus.png" />
        </TMI>
        <Ingredient name="ingredient" ingredient={ingredient}>
          {product.ingredient}
        </Ingredient>
      </SectionCol>
    </Container>
  );
}

export default ProductDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  font-family: "Arita-dotum-Medium";
  margin-top: 60px;
`;
const Frame = styled.img`
  width: 100%;
`;

const BreadCrumb = styled.div`
  position: absolute;
  top: 80px;
  left: 50px;
  display: inherit;
  font-size: 14px;
  color: #5f5f5f;

  span {
    margin: 0 5px;
    cursor: pointer;

    &:last-child {
      font-weight: 800;
    }

    &:hover {
      border-bottom: 1px solid black;
    }
  }
`;
const HTML = styled.div`
  width: 100%;
`;
const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  display: ${(props) => (props.hide ? "none" : "")};
  width: 100%;
`;

const Section = styled.section`
  display: inherit;
  justify-content: center;
  width: 100%;
`;

const DetailContainer = styled.div`
  display: inherit;
  width: 1180px;
  height: 700px;
  background-color: white;
`;

const Article = styled.article`
  display: flex;
  width: 100%;
`;

const ArticlePhoto = styled(Article)`
  align-items: center;
`;

const PhotoList = styled.div`
  width: 50px;
  margin: 0 45px;
`;

const LittlePhoto = styled.img`
  width: 50px;
  height: 50px;
  border: ${(props) =>
    props.photochange === props.src ? "2px solid black" : "1px solid #dddddd"};
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    border-color: black;
  }
`;

const LargePhoto = styled.img`
  width: 450px;
  height: 540px;
  background-color: black;
`;

const ArticleText = styled(Article)`
  flex-direction: column;
  align-items: flex-end;
  padding-top: 80px;
`;

const TextContainer = styled.div`
  width: 380px;
`;

const HashTagContainer = styled.div`
  position: relative;
  left: -20px;
  display: flex;
`;

const HashTag = styled.p`
  font-size: 16px;
  margin-left: 20px;
  background: linear-gradient(to top, #d1e1fc 50%, transparent 50%);
`;

const H1 = styled.h1`
  font-size: 29px;
  margin: 12px 0;
`;

const Quotes = styled.img`
  width: 20px;
  height: 25px;
  opacity: 0.2;
  margin-top: 60px;
`;

const Explain = styled.div`
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.1px;
  line-height: 25px;
  color: #5f5f5f;
`;

const Infomation = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #dddddd;
  padding: 20px 0;
  margin-top: 30px;

  span {
    font-size: 16px;
    font-weight: 200;
    color: #2b2b2b;
  }
`;

const PurchaseButton = styled.button`
  width: 100%;
  height: 49px;
  font-size: 17px;
  color: white;
  margin-top: ${(props) => (props.true ? "10px" : "60px")};
  transition: background-color 0.3s;
  background-color: #2b2b2b;
  &:hover {
    background-color: #4478be;
  }
`;
const ShareContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Share = styled.img`
  width: 25px;
  opacity: 0.4;
  margin-top: 30px;
  margin-right: 15px;
`;

const SectionCol = styled(Section)`
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Header = styled.header`
  position: sticky;
  top: ${(props) => {
    return props.top;
  }}px;
  z-index: 20;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 55px;
  border: 1px solid #dddddd;
  background-color: white;
`;

const SubNav = styled.button`
  width: 159px;
  font-size: 17px;
  font-weight: ${(props) =>
    props.marked[0] < window.pageYOffset && window.pageYOffset < props.marked[1]
      ? 700
      : 200};
  border-bottom: ${(props) =>
    props.marked[0] < window.pageYOffset && window.pageYOffset < props.marked[1]
      ? "2px solid black"
      : ""};
  &:hover {
    border-bottom: 2px solid black;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f7f7f7;
`;

const SubTitle = styled.h3`
  font-family: "JSDongkang-Bold";
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 1px;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 200px;
`;

const ReviewTitle = styled.h2`
  font-size: 29px;
  text-align: center;
  margin-bottom: 50px;
`;

const StarScore = styled.div`
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
`;

const ReviewMain = styled.div`
  align-items: center;
  width: 980px;
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 49px;
  border-bottom: 1px solid #949494;
  margin-bottom: 40px;
`;

const ButtonFilter = styled.div`
  display: flex;
`;

const RewiewFilter = styled.button`
  height: 100%;
  font-weight: ${(props) => (props.name === props.bold ? "800" : "400")};
  margin: 0 12px;
  cursor: pointer;
`;

const Bulkhead = styled.div`
  border-left: 1px solid #dddddd;
  margin: 17px -1px;
`;

const SelectContainer = styled.div`
  position: relative;
  z-index: 8;
  width: 160px;
`;

const Select = styled.button`
  width: 160px;
  height: 100%;
  font-size: 15px;
  text-align: left;
  padding: 10px 15px;

  &:hover {
    border: 1px solid #767676;
    border-bottom: none;
  }
`;

const SelectSkin = styled(Select)`
  border: ${(props) =>
    props.border.skinType === props.name ? "1px solid #767676" : ""};
  border-bottom: none;
`;

const SelectText = styled(Select)`
  border: ${(props) =>
    props.border.textType === props.name ? "1px solid #767676" : ""};
  border-bottom: none;
`;

const SelectOptionContainerSkin = styled.div`
  position: absolute;
  left: 0;
  bottom: -314px;
  display: ${(props) =>
    props.border.skinType === "skinType" ? "flex" : "none"};
  flex-direction: column;
  width: 160px;
  border: 1px solid #767676;
  background-color: white;
`;

const SelectOptionContainerText = styled(SelectOptionContainerSkin)`
  display: ${(props) =>
    props.border.textType === "textType" ? "flex" : "none"};
  bottom: -158px;
`;

const SelectOption = styled(Select)`
  width: 158px;
  border: none;
  &:hover {
    border: none;
    background-color: #f7f7f7;
  }
`;

const ReviewComponentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 980px;
  margin-bottom: 50px;
`;

const AddReview = styled.button`
  width: 300px;
  height: 40px;
  font-size: 18px;
  color: #5a5a5a;
  border-radius: 10px;
  margin-bottom: 50px;
  background-color: white;
`;

const TMI = styled.button`
  position: relative;
  width: 820px;
  height: 49px;
  border-top: 1px solid #eaeaea;
  border-bottom: ${(props) =>
    props.ingredient === props.name ? "1px solid #eaeaea" : ""};
  font-size: 19px;
  text-align: left;
  color: #5f5f5f;
  padding-left: 20px;
`;

const rotation = keyframes`
  from
  {
    transform: rotate(0deg)
  }
  to
  {
    transform: rotate(450deg)
  }`;

const rotationRevers = keyframes`
from
{
  transform: rotate(450deg)
}
to
{
  transform: rotate(0deg)
}`;

const Minus = styled.img`
  position: absolute;
  right: 10px;
  width: 30px;
  height: 20px;
  opacity: 0.7;
`;

const RotateMinus = styled(Minus)`
  animation: ${rotation} 0.3s linear forwards;
`;

const RotateReversMinus = styled(Minus)`
  animation: ${rotationRevers} 0.3s linear forwards;
`;

const Footer = styled.footer`
  width: 820px;
  font-size: 14px;
  color: #5f5f5f;
  padding: 10px 20px 20px;
`;

const Precaution = styled(Footer)`
  display: ${(props) => (props.precaution === props.name ? "" : "none")};
`;

const Ingredient = styled(Footer)`
  display: ${(props) => (props.ingredient === props.name ? "" : "none")};
  border-bottom: 1px solid #eaeaea;
`;

const QuantityContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  button {
    font-size: 16px;
  }
`;

const InpurQuantity = styled.input`
  width: 50px;
  height: 30px;
  border: 1px solid #dddddd;
  text-align: center;
`;
