import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    checkpassword: "",
  });

  const { email, password, checkpassword } = userInputs;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const isInputValid =
    email.includes("@") &&
    email.includes(".") &&
    password.length >= 8 &&
    password === checkpassword;

  const UseSignUp = async (email, password) => {
    await axios
      .post("https://pre-onboarding-selection-task.shop/auth/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        alert("계정이 성공적으로 생성되었습니다");
        console.log(res);
      })
      .catch((error) => {
        alert(`${error}가 발생했습니다.`);
      });
  };

  const goToLogin = (e) => {
    e.preventDefault();
    UseSignUp(email, password);
    navigate("/login");
  };

  return (
    <SignUpWrapper>
      <SignUpWindow>
        <SignUpPageInfo>회원가입</SignUpPageInfo>
        <SignUpForm onSubmit={goToLogin}>
          <Label>이메일</Label>
          <EmailInput onChange={handleInput} required />
          {!(email.includes("@") && email.includes(".")) ? (
            <Text>이메일에는 '@' 와 '.'이 포함되어야 합니다.</Text>
          ) : null}

          <Label>비밀번호</Label>
          <PasswordInput onChange={handleInput} required />
          {password.length < 8 ? (
            <Text>비밀번호는 8자리 이상이어야 합니다.</Text>
          ) : null}

          <Label>비밀번호 확인</Label>
          <PasswordCheckInput onChange={handleInput} required />
          {password !== checkpassword ? (
            <Text>비밀번호가 일치하지 않습니다.</Text>
          ) : null}

          <SignUpButton disabled={!isInputValid}>회원가입 완료</SignUpButton>
        </SignUpForm>
      </SignUpWindow>
    </SignUpWrapper>
  );
};

export default SignUp;

const SignUpWrapper = styled.section`
  ${(props) => props.theme.flex.flexBox("column")};
  text-align: center;
  height: 100vh;
`;

const SignUpWindow = styled.div`
  width: 40rem;
  padding: 2rem;
  border: 1px solid black;
`;

const SignUpPageInfo = styled.div`
  margin: 2rem 0 5rem 0;
  font-size: ${(props) => props.theme.fontSizes.titleSize};
  color: ${(props) => props.theme.colors.blue};
`;

const SignUpForm = styled.form`
  ${(props) => props.theme.flex.flexBox("column")};
  font-size: 1.5rem;
`;

const Label = styled.label`
  padding: 0 0 0 0.625rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Text = styled.div`
  padding: 0.2rem;
  color: red;
  font-size: 0.9rem;
  padding: 0 0 1.5rem 0;
`;

const EmailInput = styled.input.attrs((props) => ({
  type: "email",
  name: "email",
  placeholder: "이메일",
}))`
  width: 20rem;
  height: 3rem;
  margin: 0.5rem;
  padding: 0.7rem;
  font-size: 1.2rem;
`;

const PasswordInput = styled(EmailInput).attrs((props) => ({
  type: "password",
  name: "password",
  placeholder: "비밀번호",
}))``;

const PasswordCheckInput = styled(PasswordInput).attrs((props) => ({
  name: "checkpassword",
  placeholder: "비밀번호 확인",
}))``;

const SignUpButton = styled.button`
  border: none;
  margin: 2rem 0;
  width: 10rem;
  height: 3rem;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  &:disabled {
    background-color: ${(props) => props.theme.colors.disabled};
    color: ${(props) => props.theme.colors.gray};
  }
`;
