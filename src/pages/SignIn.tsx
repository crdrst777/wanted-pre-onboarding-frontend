import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignInType from "../compiler/types";

const SignIn = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userInputs;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const isInputValid = email.includes("@") && password.length >= 8;

  const handleSignIn = async () => {
    await axios
      .post("https://pre-onboarding-selection-task.shop/auth/signin", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        alert("성공적으로 로그인 했습니다");
        window.location.reload();
      })
      .catch((err) => {
        alert("ID 또는 비밀번호가 틀립니다.");
      });
  };

  const goToSignIn = () => {
    handleSignIn();
    navigate("/todo");
  };

  const goToSignUp = () => {
    navigate("/signup");
  };

  return (
    <SignInWrapper>
      <SignInPageInfo>로그인</SignInPageInfo>
      <SignInForm onSubmit={goToSignIn}>
        <Label>이메일</Label>
        <EmailInput onChange={handleInput} data-testid="email-input" required />

        <Label>비밀번호</Label>
        <PasswordInput
          onChange={handleInput}
          data-testid="password-input"
          required
        />

        <SignInBtn data-testid="signin-button" disabled={!isInputValid}>
          로그인
        </SignInBtn>
      </SignInForm>
      <SignUpBtn onClick={goToSignUp}>회원가입</SignUpBtn>
    </SignInWrapper>
  );
};

export default SignIn;

const SignInWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

const SignInPageInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3.8rem;
  padding: 1.5rem 1.5rem 0 1.5rem;
  font-size: 1.5rem;
`;

const Label = styled.label`
  font-size: 1.1rem;
  font-weight: 400;
  margin-top: 1.2rem;
`;

const EmailInput = styled.input.attrs<SignInType>({
  type: "email",
  name: "email",
  placeholder: "이메일",
})`
  width: 20rem;
  height: 3rem;
  margin: 0.5rem;
  padding: 0.7rem;
  font-size: 1rem;
`;

const PasswordInput = styled(EmailInput).attrs<SignInType>({
  type: "password",
  name: "password",
  placeholder: "비밀번호",
})`
  margin-bottom: 2rem;
`;

const SignInBtn = styled.button`
  margin: 1rem 0;
  width: 10rem;
  height: 3rem;
  font-size: 1.1rem;
  background-color: ${(props) => props.theme.colors.mint};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.3rem;
  &:disabled {
    background-color: ${(props) => props.theme.colors.disabled};
    color: ${(props) => props.theme.colors.gray};
  }
`;

const SignUpBtn = styled.button`
  width: 10rem;
  height: 3rem;
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  background-color: ${(props) => props.theme.colors.mint};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.3rem;
`;
