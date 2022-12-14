import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CreateTodo = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [todoLists, setTodoLists] = useState({
    todo: "",
  });

  // async () 여기에 파라미터 넣으면 안됨.
  const postTodoLists = async () => {
    await axios
      .post(
        "https://pre-onboarding-selection-task.shop/todos",
        {
          todo: todoLists.todo,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        // alert("게시글이 등록되었습니다.");
        window.location.reload(); // 새로고침
      })
      .catch((error) => {
        alert(`${error}가 발생했습니다.`);
      });
  };

  // const c = (e) => {
  //   e.preventDefault();
  //   postTodoLists();
  //   // e.currentTarget.reset();
  // };

  const createTodoList = (e) => {
    setTodoLists({ todo: e });
  };

  return (
    <CreateTodoWrapper>
      <InputInfo>TodoList</InputInfo>
      <TodoListForm>
        <TextInput
          onChange={(e) => {
            createTodoList(e.target.value);
          }}
          required
        />
        <PostButton
          onClick={(e) => {
            // form 태그로 감싼 input과 button으로 엔터키를 누르거나 버튼을 누르면
            // 사용자가 입력한 값은 자동으로 submit되며 브라우저는 새로고침된다. -> 이 새로고침을 막아주는게 e.preventDefault()
            e.preventDefault();
            postTodoLists();
          }}
        >
          게시
        </PostButton>
      </TodoListForm>
    </CreateTodoWrapper>
  );
};

export default CreateTodo;

const CreateTodoWrapper = styled.div`
  ${(props) => props.theme.flex.flexBox("column")};
  text-align: center;
  padding: 0.4rem 0 0 0;
  margin-bottom: 1.6rem;
`;

const InputInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  /* color: ${(props) => props.theme.colors.gray}; */
`;

const TodoListForm = styled.form`
  ${(props) => props.theme.flex.flexBox("column")};
  text-align: center;
  margin-top: 2.7rem;
`;

const TextInput = styled.input.attrs((props) => ({
  placeholder: "내용을 입력해주세요.",
  name: "content",
}))`
  width: 30rem;
  height: 2rem;
  margin: 0.5rem;
  font-size: 1rem;
`;

const PostButton = styled.button`
  border: none;
  margin: 0.1rem 0;
  width: 5rem;
  height: 2rem;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.mint};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.45rem;
  cursor: pointer;
`;
