import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DeleteTodo from "./DeleteTodo";

const UpdateTodo = ({ todoList }) => {
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
    // console.log(value);
    console.log(updateTodoLists);
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
      .catch((error) => {
        alert("에러가 발생했습니다.");
      });
  };

  // const [isToggled, setIsToggled] = useState(false);

  // const toggleMenu = () => {
  //   setIsToggled((isToggled) => !isToggled);
  // };

  const [isModified, setIsModified] = useState(false);

  const changeModifiedField = () => {
    setIsModified((isModified) => !isModified);
  };

  return (
    <UpdateTodoListWrapper>
      <DeleteTodo id={id} />
      {/* {!isToggled ? null : ( */}
      <ContentWrapper>
        {!isModified ? (
          <ReadContent>{todo}</ReadContent>
        ) : (
          <UpdateContent
            // onChange={(e) => {
            //   handleUpdateTodoList(e);
            // }}
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
      {/* )} */}
    </UpdateTodoListWrapper>
  );
};

export default UpdateTodo;

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
