import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UpdateTodoList from "./UpdateTodoList";

const ReadTodo = () => {
  const [todoLists, setTodoLists] = useState([]);

  const GetTodoLists = async () => {
    await axios
      .get("https://pre-onboarding-selection-task.shop/todos", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTodoLists(res.data);
        console.log(res.data);
      });
  };
  useEffect(() => {
    GetTodoLists();
  }, []);

  return (
    <ReadTodoWrapper>
      <TodoListInfo>TodoList</TodoListInfo>
      {todoLists.map((todoList, index) => (
        <UpdateTodoList todoList={todoList} key={index} />
      ))}
    </ReadTodoWrapper>
  );
};

const ReadTodoWrapper = styled.div`
  width: 30rem;
  border-top: 1px solid black;
  margin: 0.8rem 0 0 0;
  padding: 1.5rem 0 0 0;
`;

const TodoListInfo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default ReadTodo;
