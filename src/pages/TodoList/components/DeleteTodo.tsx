import styled from "styled-components";

const DeleteTodo = () => {
  const deleteTodoList = () => {};

  // const 함수 = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   deleteTodoList();
  // };

  return (
    <DeleteBtn
      onClick={(e) => {
        e.preventDefault();
        deleteTodoList();
      }}
      // onClick={함수}
    >
      삭제
    </DeleteBtn>
  );
};

export default DeleteTodo;

const DeleteBtn = styled.button`
  width: 2.5rem;
  height: 1.5rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.mint};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.3rem;
  margin-left: 0.2rem;
`;
