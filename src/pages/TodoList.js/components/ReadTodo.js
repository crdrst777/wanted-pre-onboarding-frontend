import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import UpdateDeleteTodo from "./UpdateDeleteTodo";

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
      {todoLists.map((todoList) => (
        <UpdateDeleteTodo todoList={todoList} key={todoList.id} />
      ))}
    </ReadTodoWrapper>
  );
};

const ReadTodoWrapper = styled.div`
  width: 30rem;
  border-top: 1px solid black;
  margin: 0.8rem 0 4rem 0;
  padding: 1rem 0 0 0;
`;

export default ReadTodo;
