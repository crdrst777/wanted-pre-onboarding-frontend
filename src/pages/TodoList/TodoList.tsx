import styled from "styled-components";
import CreateTodo from "./components/CreateTodo";

const TodoList = () => {
  return (
    <TodoListWrapper>
      <CreateTodo />
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
