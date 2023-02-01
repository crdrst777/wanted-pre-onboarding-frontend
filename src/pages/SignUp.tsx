import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignUpType from "../compiler/types";

const SignUp = () => {
  const navigate = useNavigate();

  const haveToken = localStorage.getItem("token");
  if (haveToken) {
    navigate("/todo");
  }

  const [userInputs, setUserInputs] = useState({
    email: "",
    password: "",
    checkPassword: "",
  });

  const { email, password, checkPassword } = userInputs;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(userInputs);
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const isInputValid =
    email.includes("@") && password.length >= 8 && password === checkPassword;

  const handleSignUp = async () => {
    await axios
      .post("https://pre-onboarding-selection-task.shop/auth/signup", {
        email: email,
        password: password,
      })
      .then((res) => {
        alert("계정이 성공적으로 생성되었습니다");
        console.log(res);
      })
      .catch((err) => {
        alert(`${err}가 발생했습니다.`);
      });
  };

  const goToSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userInputs);
    handleSignUp();
    navigate("/signin");
  };

  return (
    <SignUpWrapper>
      <SignUpPageInfo>회원가입</SignUpPageInfo>
      <SignUpForm onSubmit={goToSignUp}>
        <Label>이메일</Label>
        <EmailInput onChange={handleInput} data-testid="email-input" required />
        {!email.includes("@") ? (
          <Text>이메일에는 '@' 가 포함되어야 합니다.</Text>
        ) : null}

        <Label>비밀번호</Label>
        <PasswordInput
          onChange={handleInput}
          data-testid="password-input"
          required
        />
        {password.length < 8 ? (
          <Text>비밀번호는 8자리 이상이어야 합니다.</Text>
        ) : null}

        <Label>비밀번호 확인</Label>
        <PasswordCheckInput onChange={handleInput} required />
        {password !== checkPassword ? (
          <Text>비밀번호가 일치하지 않습니다.</Text>
        ) : null}

        <SignUpBtn data-testid="signup-button" disabled={!isInputValid}>
          회원가입 완료
        </SignUpBtn>
      </SignUpForm>
    </SignUpWrapper>
  );
};

export default SignUp;

const SignUpWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  /* justify-content: center; */
  /* text-align: center; */
  /* margin-top: 6rem; */
  /* width: 30rem; */
  /* border-radius: 0.7rem; */
`;

const SignUpPageInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const SignUpForm = styled.form`
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

const Text = styled.div`
  padding: 0.2rem;
  color: red;
  font-size: 0.85rem;
  padding: 0 0 1.5rem 0;
`;

// attrs((props) => ({...}))
// attrs({...}) 위와 아래는 같음.
const EmailInput = styled.input.attrs<SignUpType>({
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

const PasswordInput = styled(EmailInput).attrs<SignUpType>({
  type: "password",
  name: "password",
  placeholder: "비밀번호",
})``;

const PasswordCheckInput = styled(PasswordInput).attrs({
  type: "password",
  name: "checkPassword",
  placeholder: "비밀번호 확인",
})``;

// const EmailInput = styled.input`
//   width: 20rem;
//   height: 3rem;
//   margin: 0.5rem;
//   padding: 0.7rem;
//   font-size: 1rem;
// `;

// const PasswordInput = styled(EmailInput)``;

// const PasswordCheckInput = styled(PasswordInput)``;

const SignUpBtn = styled.button`
  margin: 2rem 0;
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
