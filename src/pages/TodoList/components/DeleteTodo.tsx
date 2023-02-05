import axios from "axios";
import styled from "styled-components";

interface DeleteTodoProps {
  id: number;
}

const DeleteTodo = ({ id }: DeleteTodoProps) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const deleteTodoList = async () => {
    const result = window.confirm("이 게시물을 삭제하시겠습니까?");
    if (result) {
      await axios
        .delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
          headers: headers,
        })
        .then((res) => {
          alert("삭제되었습니다.");
          window.location.reload();
        })
        .catch((err) => {
          alert(`${err}가 발생했습니다.`);
        });
    }
  };

  return (
    <DeleteBtn
      onClick={(e) => {
        e.preventDefault();
        deleteTodoList();
      }}
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
  margin-left: 0.27rem;
`;
