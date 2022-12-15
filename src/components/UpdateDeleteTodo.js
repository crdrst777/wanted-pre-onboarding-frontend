import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const UpdateDeleteTodo = ({ todoList }) => {
  const { id, todo, isCompleted, userId } = todoList;

  const [updateTodoLists, setUpdateTodolists] = useState({
    updateId: id,
    updateTodo: todo,
    updateIsCompleted: isCompleted,
    updateUserId: userId,
  });
  // const { updateId, updateTodo, updateIsCompleted, updateUserId } =
  //   updateTodoLists;

  const handleUpdateTodoList = (e) => {
    setUpdateTodolists({
      ...updateTodoLists,
      updateTodo: e.target.value,
    });
  };

  const UpdateTodoLists = async () => {
    await axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          // id: updateTodoLists.updateId,
          todo: updateTodoLists.updateTodo,
          isCompleted: updateTodoLists.updateIsCompleted,
          // userId: updateTodoLists.updateUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        alert("게시글이 업데이트되었습니다.");
        console.log(res);
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
      });
  };

  const [isModified, setIsModified] = useState(false);

  const changeModifiedField = () => {
    setIsModified((isModified) => !isModified);
  };

  const DeleteTodoLists = async () => {
    await axios
      .delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("삭제되었습니다.");
        // console.log(res);
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
      });
  };

  return (
    <UpdateTodoListWrapper>
      <ContentWrapper>
        {!isModified ? (
          <ReadContent>{todo}</ReadContent>
        ) : (
          <UpdateContent
            onChange={handleUpdateTodoList} // 위 코드랑 이거랑 같은 기능을 함.
            defaultValue={todo}
            required
          />
        )}
        {!isModified ? (
          <ModifyingButton onClick={() => changeModifiedField()}>
            수정
          </ModifyingButton>
        ) : (
          <FinishingButton
            onClick={() => {
              changeModifiedField();
              UpdateTodoLists();
            }}
          >
            수정완료
          </FinishingButton>
        )}
      </ContentWrapper>

      <DeleteTodoListsWrapper
        onClick={() => {
          DeleteTodoLists();
        }}
      >
        <RiDeleteBin6Line />
      </DeleteTodoListsWrapper>
    </UpdateTodoListWrapper>
  );
};

export default UpdateDeleteTodo;

const UpdateTodoListWrapper = styled.form`
  font-size: 1rem;
`;

const ContentWrapper = styled.div`
  background-color: #84fffa;
`;

const ReadContent = styled.div`
  ${(props) => props.theme.flex.flexBox("", "center", "start")};
  width: 30rem;
  font-size: 1rem;
  text-align: start;
  white-space: pre-wrap;
`;

const UpdateContent = styled.textarea.attrs((props) => ({
  name: "updateContent",
}))`
  ${(props) => props.theme.flex.flexBox("", "", "start")};
  width: 30rem;
  border: none;
  background-color: #84fffa;
`;

const ModifyingButton = styled.button`
  border: none;
  margin: 0.3rem 0;
  width: 4rem;
  height: 1.5rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
`;

const FinishingButton = styled(ModifyingButton)``;

const DeleteTodoListsWrapper = styled.div`
  cursor: pointer;
`;
