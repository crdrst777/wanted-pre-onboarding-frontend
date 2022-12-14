import React from "react";

import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const Nav = () => {
  const navigate = useNavigate();

  const signOut = () => {
    const isSignIn = localStorage.getItem("token");
    if (isSignIn) {
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  return (
    <NavWrapper>
      {localStorage.getItem("token") ? (
        <TodoListButton onClick={() => navigate("/todo")}>
          TodoList 페이지
        </TodoListButton>
      ) : (
        <TodoListButton
          onClick={() => {
            alert("로그인 후 이용 가능합니다.");
            navigate("/");
          }}
        >
          TodoList 페이지
        </TodoListButton>
      )}

      {localStorage.getItem("token") ? (
        <LogoutButton onClick={() => signOut()}>로그아웃</LogoutButton>
      ) : (
        <LoginButton
          onClick={() => {
            navigate("/");
          }}
        >
          로그인
        </LoginButton>
      )}
    </NavWrapper>
  );
};

const NavWrapper = styled.div`
  ${(props) => props.theme.flex.flexBox()};
  margin: auto;
  width: 30rem;
  margin-bottom: 2rem;
`;

const LogoutButton = styled.button`
  border: none;
  width: 10rem;
  height: 3rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mint};
  font-weight: ${(props) => props.theme.fontWeights.semiBold};

  cursor: pointer;
`;

const TodoListButton = styled(LogoutButton)``;

const LoginButton = styled(LogoutButton)``;

export default Nav;
