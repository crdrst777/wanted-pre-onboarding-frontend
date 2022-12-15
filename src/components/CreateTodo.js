import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CreateTodo = () => {
  const [todoLists, setTodoLists] = useState({
    todo: "",
  });

  // async () 여기에 파라미터 넣으면 안됨.
  const PostTodoLists = async () => {
    await axios
      .post(
        "https://pre-onboarding-selection-task.shop/todos",
        {
          todo: todoLists.todo,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("게시글이 등록되었습니다.");
        console.log(res);
      })
      .catch((error) => {
        alert(`${error}가 발생했습니다.`);
      });
  };

  // const createTodoList = (e) => {
  //   e.preventDefault();
  //   UsePostTodoLists(todo);
  //   e.currentTarget.reset();
  // };

  const createTodoList = (e) => {
    setTodoLists({ todo: e });
  };

  return (
    <CreateTodoWrapper>
      <InputInfo>내용을 입력해주세요.</InputInfo>
      <TodoListForm>
        <TextInput
          onChange={(e) => {
            createTodoList(e.target.value);
          }}
          required
        />
        <PostButton onClick={PostTodoLists}>게시</PostButton>
      </TodoListForm>
    </CreateTodoWrapper>
  );
};

export default CreateTodo;

const CreateTodoWrapper = styled.div`
  ${(props) => props.theme.flex.flexBox("column")};
  text-align: center;
`;

const InputInfo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TodoListForm = styled.form`
  ${(props) => props.theme.flex.flexBox("column")};
  text-align: center;
`;

const TextInput = styled.input.attrs((props) => ({
  placeholder: "내용을 입력해주세요.",
  name: "content",
}))`
  width: 30rem;
  margin: 0.5rem;
  font-size: 1rem;
`;

const PostButton = styled.button`
  border: none;
  margin: 1rem 0;
  width: 5rem;
  height: 2rem;
  font-size: 0.9rem;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;
