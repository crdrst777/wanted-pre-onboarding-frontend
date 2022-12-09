import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    id: "",
    pw: "",
  });

  const { id, pw } = userInputs;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserInputs({
      ...userInputs,
      [name]: value,
    });
  };

  const isInputValid = id.includes("@") && id.includes(".") && pw.length >= 8;

  const UseLogin = async (email, password) => {
    await axios
      .post(
        "https://pre-onboarding-selection-task.shop/auth/signin",
        {
          email: email,
          password: password,
        }
        // {
        //   headers: {
        //     Authorization: "token",
        //   },
        // }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        alert("성공적으로 로그인 했습니다");
        console.log(res);
      })
      .catch((error) => {
        alert("ID 또는 비밀번호가 틀립니다.");
      });
  };

  const goToTodoList = () => {
    UseLogin(id, pw);
    navigate("/todolist");
    // window.location.reload();
  };

  return (
    <LoginFormWrapper>
      <Label>이메일</Label>
      <IdInput onChange={handleInput} required />
      <Label>비밀번호</Label> <PasswordInput onChange={handleInput} required />
      <LoginButton onClick={() => goToTodoList()} disabled={!isInputValid}>
        로그인
      </LoginButton>
    </LoginFormWrapper>
  );
};

const LoginFormWrapper = styled.form`
  ${(props) => props.theme.flex.flexBox("column")};
  padding: 1.5rem 1.5rem 0 1.5rem;
  font-size: 1.5rem;
`;

const Label = styled.label`
  padding: 0 0 0 0.625rem;
  font-size: 1.2rem;
  font-weight: 500;
`;

const IdInput = styled.input.attrs((props) => ({
  type: "email",
  name: "id",
  placeholder: "이메일",
}))`
  width: 20rem;
  height: 3rem;
  margin: 0.5rem;
  margin-bottom: 2rem;
  padding: 0.7rem;
  font-size: 1.2rem;
`;

const PasswordInput = styled(IdInput).attrs((props) => ({
  type: "password",
  name: "pw",
  placeholder: "비밀번호",
}))``;

const LoginButton = styled.button`
  border: none;
  margin: 1rem 0;
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

export default LoginForm;
