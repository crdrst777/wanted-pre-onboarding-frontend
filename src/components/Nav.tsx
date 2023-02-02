import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const navigate = useNavigate();

  const signOut = () => {
    const isSignIn = localStorage.getItem("token");
    if (isSignIn) {
      localStorage.removeItem("token");
      alert("로그아웃 되었습니다.");
      window.location.reload();
      navigate("/signin");
    }
  };

  return (
    <NavWrapper>
      {localStorage.getItem("token") ? (
        <TodoListBtn onClick={() => navigate("/todo")}>
          TodoList 페이지
        </TodoListBtn>
      ) : (
        <TodoListBtn
          onClick={() => {
            alert("로그인 후 이용 가능합니다.");
            navigate("/signin");
          }}
        >
          TodoList 페이지
        </TodoListBtn>
      )}

      {localStorage.getItem("token") ? (
        <SignOutBtn onClick={() => signOut()}>로그아웃</SignOutBtn>
      ) : (
        <SignInBtn onClick={() => navigate("/signin")}>로그인</SignInBtn>
      )}
    </NavWrapper>
  );
};

export default Nav;

const NavWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 30rem;
  margin-bottom: 2rem;
`;

const TodoListBtn = styled.button`
  width: 10rem;
  height: 3rem;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.mint};
  font-weight: 600;
`;

const SignOutBtn = styled(TodoListBtn)``;
const SignInBtn = styled(TodoListBtn)``;
