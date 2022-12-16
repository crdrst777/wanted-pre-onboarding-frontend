import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import { RiDeleteBin6Line } from "react-icons/ri";

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
      </ContentWrapper>
      <BtnsWrapper>
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
            완료
          </FinishingButton>
        )}
        <DeleteButton
          onClick={() => {
            DeleteTodoLists();
          }}
        >
          삭제
          {/* <RiDeleteBin6Line /> */}
        </DeleteButton>
      </BtnsWrapper>
    </UpdateTodoListWrapper>
  );
};

export default UpdateDeleteTodo;

const UpdateTodoListWrapper = styled.form`
  font-size: 1rem;
  /* ${(props) => props.theme.flex.flexBox("row")}; */
  ${(props) => props.theme.flex.flexBox("", "flex-start", "start")}
  width: 30rem;
`;

const ContentWrapper = styled.div`
  background-color: #f8f9fa;
  margin-right: 1rem;
  margin-bottom: 1.5rem;
`;

const ReadContent = styled.div`
  width: 23.8rem;
  font-size: 1rem;
  text-align: start;
  white-space: pre-wrap;
`;

const UpdateContent = styled.textarea.attrs((props) => ({
  name: "updateContent",
}))`
  width: 23.8rem;
  border: none;
`;

const BtnsWrapper = styled.div``;

const ModifyingButton = styled.button`
  border: none;
  width: 2.5rem;
  height: 1.5rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.mint};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.3rem;
  cursor: pointer;
`;

const FinishingButton = styled(ModifyingButton)``;

const DeleteButton = styled(ModifyingButton)`
  margin-left: 0.2rem;
`;
