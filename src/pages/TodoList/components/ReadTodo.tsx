import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import TodoListType from "../../../compiler/types";
import UpdateTodo from "../components/UpdateTodo";

const ReadTodo = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [todoLists, setTodoLists] = useState<TodoListType[]>([]);

  const getTodoLists = async () => {
    await axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: headers,
      })
      .then((res) => {
        setTodoLists(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        alert(`${err}가 발생했습니다.`);
      });
  };

  useEffect(() => {
    getTodoLists();
  }, []);

  return (
    <ReadTodoWrapper>
      {todoLists.map((todoList: TodoListType) => (
        <UpdateTodo
          key={todoList.id}
          id={todoList.id}
          todo={todoList.todo}
          isCompleted={todoList.isCompleted}
          userId={todoList.userId}
        />
      ))}
    </ReadTodoWrapper>
  );
};

export default ReadTodo;

const ReadTodoWrapper = styled.div`
  width: 30rem;
  border-top: 1px solid black;
  margin: 0.8rem 0 4rem 0;
  padding: 1rem 0 0 0;
`;
