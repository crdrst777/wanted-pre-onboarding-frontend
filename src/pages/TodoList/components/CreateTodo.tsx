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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoLists({ todo: e.target.value });
    console.log(todoLists);
  };

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
        alert("게시글이 등록되었습니다.");
        window.location.reload(); // 새로고침
      })
      .catch((err) => {
        alert(`${err}가 발생했습니다.`);
      });
  };

  const createTodoList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postTodoLists();
  };

  return (
    <CreateTodoWrapper>
      <InputInfo>TodoList</InputInfo>
      <TodoListForm onSubmit={createTodoList}>
        <TextInput onChange={handleInput} required />
        <PostBtn>게시</PostBtn>
      </TodoListForm>
    </CreateTodoWrapper>
  );
};

export default CreateTodo;

const CreateTodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.4rem 0 0 0;
  margin-bottom: 1.6rem;
`;

const InputInfo = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const TodoListForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const PostBtn = styled.button`
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
