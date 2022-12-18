import React, { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { MdDone } from "react-icons/md";

const UpdateDeleteTodo = ({ id, todo, isCompleted, userId }) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [updateTodoList, setUpdateTodolist] = useState({
    updateId: id,
    updateTodo: todo,
    updateIsCompleted: isCompleted,
    updateUserId: userId,
  });

  const handleUpdateTodoList = (e) => {
    setUpdateTodolist({
      ...updateTodoList,
      updateTodo: e.target.value,
    });
  };

  const updateTodoLists = async () => {
    await axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: updateTodoList.updateTodo,
          isCompleted: updateTodoList.updateIsCompleted,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        alert("게시글이 업데이트되었습니다.");
        // console.log(res);
        window.location.reload();
      })
      .catch(() => {
        alert("에러가 발생했습니다.");
      });
  };

  const changeChecked = () => {
    return axios
      .put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: updateTodoList.updateTodo,
          isCompleted: !updateTodoList.updateIsCompleted,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        window.location.reload();
      });
  };

  const [isModified, setIsModified] = useState(false);

  const changeModified = () => {
    setIsModified((isModified) => !isModified);
  };

  const deleteTodoLists = async () => {
    const result = window.confirm("이 게시물을 삭제하시겠습니까?");
    if (result === true) {
      await axios
        .delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          alert("삭제되었습니다.");
          window.location.reload();
        })
        .catch(() => {
          alert("에러가 발생했습니다.");
        });
    }
  };

  // async function DeleteTodoLists() {
  //   const result = window.confirm("이 게시물을 삭제하시겠습니까?");
  //   if (result === true) {
  //     try {
  //       const response = axios.delete(
  //         `https://pre-onboarding-selection-task.shop/todos/${id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.status === 204) {
  //       alert(`삭제되었습니다.`);
  //       window.location.reload();
  //       }
  //     } catch (error) {
  //       alert("에러가 발생되었습니다.");
  //     }
  //   }
  // }

  return (
    <UpdateTodoListWrapper>
      <CheckCircle
        isCompleted={isCompleted}
        onClick={() => {
          changeChecked();
        }}
      >
        {isCompleted && <MdDone />}
      </CheckCircle>
      {/* <CheckBox
        type="checkbox"
        id={id} 
        onClick={() => {
          changeChecked();
        }}
        checked={isCompleted} // ?
      /> */}
      <ContentWrapper>
        {!isModified ? (
          <ReadContent>{todo}</ReadContent>
        ) : (
          <UpdateContent
            onChange={handleUpdateTodoList}
            defaultValue={todo}
            required
          />
        )}
      </ContentWrapper>
      <BtnsWrapper>
        {!isModified ? (
          <ModifyingButton onClick={() => changeModified()}>
            수정
          </ModifyingButton>
        ) : (
          <FinishingButton
            onClick={() => {
              changeModified();
              updateTodoLists();
            }}
          >
            완료
          </FinishingButton>
        )}
        <DeleteButton
          onClick={(e) => {
            e.preventDefault();
            deleteTodoLists();
          }}
        >
          삭제
        </DeleteButton>
      </BtnsWrapper>
    </UpdateTodoListWrapper>
  );
};

export default UpdateDeleteTodo;

const UpdateTodoListWrapper = styled.form`
  font-size: 1rem;
  ${(props) => props.theme.flex.flexBox("", "flex-start", "start")}
  width: 30rem;
`;

const CheckCircle = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.3rem;
  background-color: #ced4da;
  /* border: 0.13rem solid #ced4da; */
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props) =>
    props.isCompleted &&
    css`
      /* border: 0.13rem solid #38d9a9; */
      background-color: ${(props) => props.theme.colors.mint};
      color: ${(props) => props.theme.colors.white};
    `}
`;

// const CheckBox = styled.input`
//   margin: 0;
//   width: 1rem;
//   height: 1rem;
//   cursor: pointer;
// `;

const ContentWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  margin: 0 0.9rem 1.5rem 0.9rem;
`;

const ReadContent = styled.div`
  width: 21.5rem;
  font-size: 0.97rem;
  text-align: start;
  white-space: pre-wrap;
  line-height: 1.2rem;
`;

const UpdateContent = styled.textarea.attrs((props) => ({
  name: "updateContent",
}))`
  width: 22rem;
  border: none;
  font-size: 0.82rem;
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
