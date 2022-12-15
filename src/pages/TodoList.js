import React from "react";
import styled from "styled-components";
import CreateTodo from "../components/CreateTodo";
import ReadTodo from "../components/ReadTodo";

const TodoList = () => {
  return (
    <TodoListWrapper>
      <CreateTodo />
      <ReadTodo />
    </TodoListWrapper>
  );
};

const TodoListWrapper = styled.div`
  ${(props) => props.theme.flex.flexBox("column")};
  text-align: center;
`;

export default TodoList;
