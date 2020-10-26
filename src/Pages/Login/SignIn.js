import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import config from "../../config";

function SignIn() {
  const [user, setUser] = useState({
    identifier: "",
    password: "",
  });

  const [inputFocus, setInputFocus] = useState([]);

  const { password, identifier } = user;

  const history = useHistory();

  const inputInfo = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const activeWarning = (e) => {
    setInputFocus([...inputFocus, e.target.name]);
  };

  const clickLogin = () => {
    if (identifier.length > 3 && password.length > 5) {
      fetch(`${config.API}/user/signin`, {
        method: "post",
        headers: {},
        body: JSON.stringify({
          identifier: identifier,
          password: password,
        }),
      })
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            alert("로그인에 성공했습니다.");
          } else {
            return alert("로그인에 실패했습니다.");
          }
          return res.json();
        })
        .then((res) => {
          if (res.token) {
            localStorage.setItem("token", res.token);
            history.push({ pathname: "/" });
          }
        });
    }
  };

  return (
    <Container>
      <LoginContainer>
        <Header>
          <TitleContainer>
            <H1>로그인</H1>
            <Span>라네즈는 아모레퍼시픽 통합멤버십(뷰티포인트)</Span>
            <Span>회원 계정으로 함께 이용이 가능합니다.</Span>
          </TitleContainer>
          <SignSeries>
            <PageMove href="/signup">회원 가입하기</PageMove>
            <Slit />
            <PageMove>아이디 찾기</PageMove>
            <Slit />
            <PageMove>비밀번호 찾기</PageMove>
          </SignSeries>
        </Header>
        <Main>
          <InputForm>
            <InputContainer>
              <InputInfo
                type="text"
                name="identifier"
                onChange={(e) => inputInfo(e)}
                onFocus={(e) => activeWarning(e)}
              />
              <IdEmpty identifier={identifier} inputFocus={inputFocus}>
                <ExclamationMark
                  alt="warning"
                  src="./Images/ExclamationMark.png"
                />
                아이디를 입력해 주세요.
              </IdEmpty>
              <IdWarning identifier={identifier} inputFocus={inputFocus}>
                <ExclamationMark
                  alt="warning"
                  src="./Images/ExclamationMark.png"
                />
                올바른 아이디를 입력해 주세요.
              </IdWarning>
            </InputContainer>
            <InputContainer>
              <InputInfo
                type="password"
                name="password"
                onChange={(e) => inputInfo(e)}
                onFocus={(e) => activeWarning(e)}
              />
              <PasswordEmpty password={password} inputFocus={inputFocus}>
                <ExclamationMark
                  alt="warning"
                  src="./Images/ExclamationMark.png"
                />
                비밀번호를 입력해 주세요.
              </PasswordEmpty>
              <PasswordWarning password={password} inputFocus={inputFocus}>
                <ExclamationMark
                  alt="warning"
                  src="./Images/ExclamationMark.png"
                />
                올바른 비밀번호를 입력해 주세요.
              </PasswordWarning>
            </InputContainer>
          </InputForm>
          <LoginButton onClick={() => clickLogin()}>로그인 하기</LoginButton>
          <KaKaoBtn href="http://192.168.219.102:8000/user/signin/kakao">
            카카오 로그인
          </KaKaoBtn>
        </Main>
      </LoginContainer>
    </Container>
  );
}

export default SignIn;

const Container = styled.div`
  width: 100vw;
  height: 687px;
  font-family: Arita-dotum-Medium;
  padding-top: 60px;
  padding-bottom: 120px;
  margin-top: 60px;
  background-image: url("https://www.laneige.com/kr/ko/assets/image/login/login-bg-lg.jpg");
  background-size: cover;
`;

const KaKaoBtn = styled.a`
  width: 380px;
  height: 45px;
  line-height: 44px;
  color: black;
  background-color: #ffeb00;
  border: 1px solid transparent;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
  padding: 0;
  margin-top: 20px;
`;

const LoginContainer = styled.div`
  display: flex;
  width: 1180px;
  height: 360.78px;
  margin: auto;
`;

const Header = styled.header`
  width: 600px;
  height: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 301.98px;
  margin-left: 30px;
  margin-bottom: 100px;
`;

const H1 = styled.h1`
  width: 301.98px;
  font-size: 40px;
  margin-bottom: 50px;
`;

const Span = styled.span`
  width: 301.98px;
  font-size: 16px;
  font-weight: 300;
  color: #5f5f5f;
  line-height: 23px;
  letter-spacing: -1px;
`;

const SignSeries = styled.div`
  display: flex;
  align-content: center;
  margin-left: 30px;
`;

const PageMove = styled.a`
  font-size: 16px;
  font-weight: 300;
  :hover {
    border-bottom: 1px solid black;
  }
`;

const Slit = styled.div`
  height: 14px;
  border-left: 1px solid black;
  margin: 0 5px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 580px;
  height: 100%;
  background-color: white;
`;

const InputInfo = styled.input`
  width: 380px;
  height: 43px;
  border-bottom: 1px solid black;
`;

const InputForm = styled.div`
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  width: 380px;
  height: 79px;
`;

const ExclamationMark = styled.img`
  position: relative;
  top: 1px;
  width: 13px;
  height: 13px;
`;

const Warning = styled.div`
  font-size: 14px;
  color: #b61f1c;
  margin-top: 3px;
`;

const IdEmpty = styled(Warning)`
  display: ${(props) =>
    !props.identifier && props.inputFocus.join().includes("identifier")
      ? ""
      : "none"};
`;

const IdWarning = styled(Warning)`
  display: ${(props) =>
    props.identifier.length < 4 &&
    props.inputFocus.join().includes("identifier") &&
    props.identifier
      ? ""
      : "none"};
`;

const PasswordEmpty = styled(Warning)`
  display: ${(props) =>
    !props.password && props.inputFocus.join().includes("password")
      ? ""
      : "none"}; ;
`;

const PasswordWarning = styled(Warning)`
  display: ${(props) =>
    props.password.length < 6 &&
    props.inputFocus.join().includes("password") &&
    props.password
      ? ""
      : "none"}; ;
`;

const LoginButton = styled.button`
  width: 380px;
  height: 42px;
  font-size: 18px;
  font-weight: 300;
  color: white;
  background-color: #2b2b2b;
`;
