import styled from "styled-components";
import CreateTodo from "./components/CreateTodo";
import ReadTodo from "./components/ReadTodo";

const TodoList = () => {
  return (
    <TodoListWrapper>
      <CreateTodo />
      <ReadTodo />
    </TodoListWrapper>
  );
};

export default TodoList;

const TodoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
