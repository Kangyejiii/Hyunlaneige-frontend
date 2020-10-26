import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import config from "../../config";
function SignUp() {
  const [user, setUser] = useState({
    name: "",
    birthdate: "",
    identifier: "",
    password: "",
    checkPassword: "",
    gender: "man",
    phone_number: "",
  });

  const [activeText, setActiveText] = useState([]);

  const history = useHistory();

  const [telephoneCarrier, setTelephoneCarrier] = useState("");

  const [necessaryAgree, setNecessaryAgree] = useState({
    allClose: false,
    allAgree: false,
    necessaryFirst: false,
    necessarySecond: false,
    selectFirst: false,
    selectSecond: false,
    selectThird: false,
    selectFourth: false,
  });

  const [passwordMaker, setPasswordMaker] = useState("self");

  const {
    name,
    birthdate,
    password,
    checkPassword,
    gender,
    phone_number,
    identifier,
  } = user;

  const {
    allClose,
    allAgree,
    necessaryFirst,
    necessarySecond,
    selectFirst,
    selectSecond,
    selectThird,
    selectFourth,
  } = necessaryAgree;

  const inputData = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const howToMakePW = (e) => {
    setPasswordMaker(e.target.value);
  };

  const activeCheck = (e) => {
    setActiveText([...activeText, e.target.name]);
  };

  const checkAllagree = () => {
    if (necessaryFirst === necessarySecond) {
      setNecessaryAgree({
        ...necessaryAgree,
        necessaryFirst: !necessaryFirst,
        necessarySecond: !necessarySecond,
        selectFirst: !selectFirst,
        selectSecond: !selectSecond,
        selectThird: !selectThird,
        selectFourth: !selectFourth,
        allAgree: !allAgree,
      });
    } else {
      setNecessaryAgree({
        ...necessaryAgree,
        allAgree: true,
        necessaryFirst: true,
        necessarySecond: true,
        selectFirst: true,
        selectSecond: true,
        selectThird: true,
        selectFourth: true,
      });
    }
  };

  const checkLabel = (e) => {
    let name = e.target.name;
    setNecessaryAgree({ ...necessaryAgree, [name]: !e.target.checked });
  };

  const checkAllClose = (e) => {
    let name = e.target.name;
    setNecessaryAgree({ ...necessaryAgree, [name]: !allClose });
  };

  const clickSubmit = () => {
    if (!name) {
      return alert("올바른 이름을 입력해 주세요.");
    } else if (birthdate.length < 8) {
      return alert("생년월일을 올바르게 입력해 주세요.");
    } else if (!telephoneCarrier) {
      return alert("통신사를 선택해 주세요.");
    } else if (password.length < 4) {
      return alert("비밀번호를 올바르게 입력해 주세요.");
    } else if (!necessaryFirst || !necessarySecond) {
      return alert("필수 약관에 동의해 주세요.");
    } else if (!identifier) {
      setUser({ ...user, identifier: phone_number });
    }

    if (
      identifier.length > 3 &&
      password.length > 5 &&
      name &&
      birthdate &&
      gender &&
      phone_number &&
      necessaryFirst &&
      necessarySecond
    ) {
      fetch(`${config}/user/signup`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          birthdate: birthdate,
          identifier: identifier,
          password: password,
          gender: gender,
          phone_number: phone_number,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "SUCCESS") {
            alert("회원가입이 완료되었습니다.");
            history.push({ pathname: "/signin" });
          }
        });
    }
  };
  return (
    <Containor>
      <SignUpHeader>뷰티포인트 X 라네즈 회원가입</SignUpHeader>
      <SignUpMain>
        <section>
          <h1>아모레퍼시픽 통합멤버십 회원가입을 환영합니다!</h1>
          <h3>
            아모레퍼시픽 통합멤버십(뷰티포인트)에 가입하시면 라네즈 외 모든
            브랜드 온/오프 매장에서 상품을 구매 할 때마다 현금처럼 사용할 수
            있는 포인트 적립과 사용 등 다양한 혜택을 받으실 수 있습니다.
          </h3>
        </section>
        <section>
          <Article>
            <input
              type="text"
              name="name"
              placeholder="이름(실명으로 입력해 주세요)"
              onChange={(e) => inputData(e)}
            />
          </Article>
          <ArticleBirth>
            <input
              type="text"
              name="birthdate"
              placeholder="생년월일8자리(ex.19980905)"
              onChange={(e) => inputData(e)}
            />
            <ManBox gender={gender}>
              <GenderCheck alt="check" src="./Images/check.png" />
              <input
                type="radio"
                name="gender"
                value="man"
                onClick={(e) => inputData(e)}
              />
              남자
            </ManBox>
            <WomanBox gender={gender}>
              <GenderCheck alt="check" src="./Images/check.png" />
              <input
                type="radio"
                name="gender"
                value="woman"
                onClick={(e) => inputData(e)}
              />
              여자
            </WomanBox>
          </ArticleBirth>
          <ArticlePhone>
            <select onBlur={(e) => setTelephoneCarrier(e.target.value)}>
              <option>통신사 선택</option>
              <option value="skt">SKT</option>
              <option value="ktf">KT</option>
              <option value="lgu">LG U+</option>
              <option value="skm">SKT 알뜰폰</option>
              <option value="ktm">KT 알뜰폰</option>
              <option value="lgm">LG U+ 알뜰폰</option>
            </select>
            <input
              type="number"
              name="phone_number"
              placeholder="전화번호 입력"
              onChange={(e) => inputData(e)}
            />
          </ArticlePhone>
          <p className="idAlert">
            * 아이디 미입력시 휴대폰번호로 가입되며 가입완료후 변경 불가합니다.
          </p>
          <ArticleCol>
            <IdFail activeText={activeText} identifier={identifier}>
              아이디는 4~12자 영문 대소문자 포함하여 입력해주세요.
            </IdFail>
            <IdSuccess activeText={activeText} identifier={identifier}>
              등록 가능한 아이디 입니다.
            </IdSuccess>
            <input
              type="text"
              name="identifier"
              placeholder="아이디(4~12자 영문/대ㆍ소문자)"
              onChange={(e) => inputData(e)}
              onFocus={(e) => activeCheck(e)}
            />
            <IdSuccess activeText={activeText} identifier={identifier}>
              <img alt="check" src="./Images/check.png" />
            </IdSuccess>
          </ArticleCol>
          <ArticleCol>
            <MakePassword>
              <CenterPasswordLabel>
                <input
                  type="radio"
                  name="makePassword"
                  value="self"
                  onClick={(e) => howToMakePW(e)}
                />
                <PasswordSelf passwordMaker={passwordMaker}>
                  <img alt="check" src="./Images/check.png" />
                </PasswordSelf>
                <p>비밀번호 직접입력</p>
              </CenterPasswordLabel>

              <CenterPasswordLabel>
                <input
                  type="radio"
                  name="makePassword"
                  value="auto"
                  onClick={(e) => howToMakePW(e)}
                />
                <PasswordAuto passwordMaker={passwordMaker}>
                  <img alt="check" src="./Images/check.png" />
                </PasswordAuto>
                <p>비밀번호 자동발급</p>
              </CenterPasswordLabel>
            </MakePassword>
            <PasswordContainor passwordMaker={passwordMaker}>
              <PasswordFail activeText={activeText} password={password}>
                사용 할 수 없는 비밀번호 입니다.
              </PasswordFail>
              <PasswordSuccess activeText={activeText} password={password}>
                사용 가능한 비밀번호 입니다.
              </PasswordSuccess>
              <input
                type="password"
                name="password"
                placeholder="비밀번호는 6~16자 영문 대소문자,숫자,특수문자 중 최소 2가지 이상을 입력해야 합니다."
                onChange={(e) => inputData(e)}
                onFocus={(e) => activeCheck(e)}
              />
              <PasswordSuccess activeText={activeText} password={password}>
                <img alt="check" src="./Images/check.png" />
              </PasswordSuccess>
              <PasswordMatch
                activeText={activeText}
                password={password}
                checkPassword={checkPassword}
              >
                비밀번호 확인을 입력하십시오.
              </PasswordMatch>
              <input
                type="password"
                name="checkPassword"
                placeholder="비밀번호 확인"
                onChange={(e) => inputData(e)}
                onFocus={(e) => activeCheck(e)}
              />
              <PasswordMatchSuccess
                activeText={activeText}
                password={password}
                checkPassword={checkPassword}
              >
                <img alt="check" src="./Images/check.png" />
              </PasswordMatchSuccess>
            </PasswordContainor>
          </ArticleCol>
          <ArticleCol>
            <AllAgree>
              <label>
                <input type="checkbox" onClick={() => checkAllagree()} />
                <AllAgreeCheckBox allAgree={allAgree}>
                  <img alt="check" src="./Images/check.png" />
                </AllAgreeCheckBox>
                <p>모든 약관 동의</p>
              </label>
              <AllCloseBT
                alt="button"
                name="allClose"
                src={allClose ? "./Images/down.png" : "./Images/up.png"}
                onClick={(e) => checkAllClose(e)}
              />
            </AllAgree>
            <TermsList allClose={allClose}>
              <Explanation>
                아래 모든 약관 (필수/선택 포함) 및 광고성 정보수신 동의 내용을
                확인하고 전체 동의합니다. ※ 선택 항목에 대한 동의를 거부하더라도
                회원가입에 영향을 미치지 않습니다.
              </Explanation>
              <SignUpSubtitile>
                아모레퍼시픽 통합 멤버십 뷰티포인트 회원약관
              </SignUpSubtitile>
              <label>
                <SmallRoundFrameNF necessaryFirst={necessaryFirst}>
                  <img alt="check" src="./Images/check.png" />
                </SmallRoundFrameNF>
                <input
                  type="checkbox"
                  name="necessaryFirst"
                  onClick={(e) => checkLabel(e)}
                />
                <p>[필수]뷰티포인트 서비스 이용약관</p>
              </label>
              <label>
                <SmallRoundFrameNS necessarySecond={necessarySecond}>
                  <img alt="check" src="./Images/check.png" />
                </SmallRoundFrameNS>
                <input
                  type="checkbox"
                  name="necessarySecond"
                  onClick={(e) => checkLabel(e)}
                />
                <p>[필수]개인정보 이용 및 수집에 대한 동의</p>
              </label>
              <label>
                <SmallRoundFrameSF selectFirst={selectFirst}>
                  <img alt="check" src="./Images/check.png" />
                </SmallRoundFrameSF>
                <input
                  type="checkbox"
                  name="selectFirst"
                  onClick={(e) => checkLabel(e)}
                />
                <p>[선택]개인정보 제3자 제공 동의</p>
              </label>
              <label>
                <SmallRoundFrameSS selectSecond={selectSecond}>
                  <img alt="check" src="./Images/check.png" />
                </SmallRoundFrameSS>
                <input
                  type="checkbox"
                  name="selectSecond"
                  onClick={(e) => checkLabel(e)}
                />
                <p>[선택]국외 이전 동의</p>
              </label>
              <SignUpSubtitile>
                광고성 정보 수신 동의
                <span>쇼핑 혜택, 이벤트 소식을 받아보세요</span>
              </SignUpSubtitile>
              <label>
                <SmallRoundFrameST selectThird={selectThird}>
                  <img alt="check" src="./Images/check.png" />
                </SmallRoundFrameST>
                <input
                  type="checkbox"
                  name="selectThird"
                  onClick={(e) => checkLabel(e)}
                />
                <p>[선택]뷰티포인트 문자 수신 동의</p>
              </label>
              <label>
                <SmallRoundFrameS selectFourth={selectFourth}>
                  <img alt="check" src="./Images/check.png" />
                </SmallRoundFrameS>
                <input
                  type="checkbox"
                  name="selectFourth"
                  onClick={(e) => checkLabel(e)}
                />
                <p>[선택]온라인 사이트 문자 수신 동의</p>
              </label>
              <SignUpSubtitile>개인정보 처리 위탁에 대한 안내</SignUpSubtitile>
              <Explanation>
                ※ 아모레퍼시픽은 서비스 향상 및 원활한 전산 처리 등을 위하여
                이용자의 개인정보 관리를 외부 전문업체에 위탁하고 있습니다.
                아모레퍼시픽의 업무를 위탁받는 자 및 업무의 내용은 아모레퍼시픽
                홈페이지
                https://www.beautypoint.co.kr/footer/privacy/personal.html 에서
                확인 하실 수 있습니다.
              </Explanation>
            </TermsList>
          </ArticleCol>
          <SignUpButton
            onClick={() => clickSubmit()}
            necessaryFirst={necessaryFirst}
            necessarySecond={necessarySecond}
          >
            본인인증 및 회원가입
          </SignUpButton>
        </section>
      </SignUpMain>
    </Containor>
  );
}

export default withRouter(SignUp);

const Containor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  font-family: "MalgunGothic";
`;

const SignUpHeader = styled.div`
  border: 1px solid #d2d2d2;
  width: inherit;
  height: 61px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  color: #082b5e;
  padding-top: 23px;
  background-color: #f3f3f3;
`;

const SignUpMain = styled.main`
  width: 460px;

  h1 {
    font-size: 30px;
    margin-top: 40px;
  }

  h3 {
    font-size: 15px;
    margin-top: 10px;
    font-weight: 400;
    letter-spacing: 0.8px;
  }

  p {
    margin-bottom: 15px;
  }

  .idAlert {
    font-size: 14px;
    font-weight: 700;
  }

  section {
    margin-bottom: 70px;
  }
`;

const Article = styled.article`
  display: flex;
  margin-bottom: 15px;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="text"],
  input[type="password"],
  input[type="number"],
  select {
    width: 100%;
    height: 54px;
    font-size: 16px;
    border: 1px solid #d2d2d2;
    padding-left: 10px;
    &::placeholder {
      font-size: 16px;
    }
  }

  input[type="radio"],
  input[type="checkbox"] {
    display: none;
  }
`;

const ManBox = styled.label`
  border: ${(props) =>
    props.gender === "man" ? "1px solid #082B5E" : "1px solid #d2d2d2"};
  img {
    opacity: ${(props) => (props.gender === "man" ? "1" : "0")};
  }
`;

const WomanBox = styled.label`
  border: ${(props) =>
    props.gender === "woman" ? "1px solid #082B5E" : "1px solid #d2d2d2"};
  img {
    opacity: ${(props) => (props.gender === "woman" ? "1" : "0")};
  }
`;

const GenderCheck = styled.img`
  width: 14px;
  margin-left: 5px;
  margin-right: 10px;
`;

const IdCheck = styled.div`
  position: relative;
  font-size: 13px;
  margin-bottom: 2px;
`;

const IdFail = styled(IdCheck)`
  display: ${(props) =>
    props.activeText.includes("identifier") && props.identifier.length < 4
      ? "relative"
      : "none"};
  color: #ff0000;
`;

const IdSuccess = styled(IdCheck)`
  display: ${(props) =>
    props.activeText.includes("identifier") && props.identifier.length > 3
      ? "relative"
      : "none"};
  color: #0da94a;

  img {
    position: absolute;
    top: -40px;
    right: 10px;
    width: 25px;
  }
`;

const PasswordFail = styled(IdCheck)`
  display: ${(props) =>
    props.activeText.includes("password") && props.password.length < 6
      ? "relative"
      : "none"};
  color: #ff0000;
`;

const PasswordSuccess = styled(IdCheck)`
  display: ${(props) =>
    props.activeText.includes("password") && props.password.length > 5
      ? "relative"
      : "none"};
  color: #0da94a;

  img {
    position: absolute;
    top: -55px;
    right: 10px;
    width: 25px;
  }
`;

const PasswordMatch = styled(IdCheck)`
  display: ${(props) =>
    props.activeText.includes("checkPassword") &&
    props.password !== props.checkPassword
      ? "relative"
      : "none"};
  color: #ff0000;
`;

const PasswordMatchSuccess = styled(IdCheck)`
  display: ${(props) =>
    props.activeText.includes("checkPassword") &&
    props.password === props.checkPassword &&
    props.checkPassword
      ? "relative"
      : "none"};

  img {
    position: absolute;
    top: -55px;
    right: 10px;
    width: 25px;
  }
`;

const ArticleCol = styled(Article)`
  flex-direction: column;
  margin-bottom: 15px;
`;

const ArticleBirth = styled(Article)`
  input[type="text"] {
    width: 100%;
    flex-shrink: 2;
    margin-right: 20px;
  }

  label {
    flex-shrink: 4;
    width: 100%;
    padding-top: 20px;

    input {
      position: relative;
      top: -2px;
    }
  }
`;

const ArticlePhone = styled(Article)`
  select {
    width: 100%;
    flex-shrink: 2;
    margin-right: 20px;
  }

  input {
    width: 100%;
    flex-shrink: 1;
  }
`;

const MakePassword = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoundFrame = styled.div`
  position: relative;
  width: 25px;
  height: 25px;
  border: 1px solid #8c8c8c;
  border-radius: 50%;
  overflow: hidden;
  padding: 4px;
`;

const PasswordSelf = styled(RoundFrame)`
  img {
    display: ${(props) => (props.passwordMaker === "self" ? "" : "none")};
    width: 16px;
  }
`;

const PasswordAuto = styled(RoundFrame)`
  img {
    display: ${(props) => (props.passwordMaker === "auto" ? "" : "none")};
    width: 16px;
  }
`;

const AllAgreeCheckBox = styled(RoundFrame)`
  img {
    display: ${(props) => (props.allAgree ? "" : "none")};
    width: 16px;
  }
`;

const CenterPasswordLabel = styled.label`
  position: relative;
  display: flex;

  p {
    position: relative;
    top: 6px;
    height: 25px;
    font-size: 15px;
    padding-left: 10px;
  }
`;

const PasswordContainor = styled.div`
  display: ${(props) => (props.passwordMaker === "auto" ? "none" : "")};
  input[type="password"] {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
  }
`;

const AllAgree = styled.div`
  position: relative;
  border: 1px solid #d2d2d2;
  font-size: 21px;
  color: #082b5e;
  padding: 10px;

  label {
    display: flex;

    div {
      position: relative;
      top: 5px;
    }

    p {
      position: relative;
      top: 9px;
      padding-left: 5px;
    }
  }
`;

const AllCloseBT = styled.img`
  position: absolute;
  right: 2px;
  top: 12px;
  width: 30px;
`;

const TermsList = styled.div`
  display: ${(props) => (props.allClose ? "none" : "flex")};
  flex-direction: column;
  label {
    display: flex;
    font-size: 15px;
    color: #3b3b3b;
    height: 27px;
    margin: 5px 0;

    p {
      position: relative;
      top: 2.5px;
      padding-left: 5px;
    }
  }
`;

const SmallRoundFrame = styled.div`
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid #8c8c8c;
  border-radius: 50%;
  overflow: hidden;
  padding: 2px;
`;

const SmallRoundFrameNF = styled(SmallRoundFrame)`
  img {
    display: ${(props) => (props.necessaryFirst ? "" : "none")};
    width: 14px;
  }
`;

const SmallRoundFrameNS = styled(SmallRoundFrame)`
  img {
    display: ${(props) => (props.necessarySecond ? "" : "none")};
    width: 14px;
  }
`;

const SmallRoundFrameSF = styled(SmallRoundFrame)`
  img {
    display: ${(props) => (props.selectFirst ? "" : "none")};
    width: 14px;
  }
`;

const SmallRoundFrameSS = styled(SmallRoundFrame)`
  img {
    display: ${(props) => (props.selectSecond ? "" : "none")};
    width: 14px;
  }
`;

const SmallRoundFrameST = styled(SmallRoundFrame)`
  img {
    display: ${(props) => (props.selectThird ? "" : "none")};
    width: 14px;
  }
`;

const SmallRoundFrameS = styled(SmallRoundFrame)`
  img {
    display: ${(props) => (props.selectFourth ? "" : "none")};
    width: 14px;
  }
`;

const Explanation = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #707070;
  letter-spacing: 0.8px;
  line-height: 20px;
`;

const SignUpSubtitile = styled.h2`
  font-size: 15px;
  font-weight: bold;
  color: #3b3b3b;
  margin-bottom: 10px;
  padding-top: 20px;
  span {
    font-size: 14px;
    color: #707070;
    padding-left: 3px;
  }
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 52px;
  font-size: 20px;
  color: white;
  margin-bottom: 40px;
  background-color: ${(props) =>
    props.necessaryFirst && props.necessarySecond ? "#082B5E" : "#555555"};
`;
