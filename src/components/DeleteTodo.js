import React from "react";
import styled from "styled-components";
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteTodo = (id) => {
  // const DeleteTodoLists = async () => {
  //   await axios
  //     .delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     })
  //     .then((res) => {
  //       alert("삭제되었습니다.");
  //       // console.log(res);
  //     })
  //     .catch((error) => {
  //       alert("에러가 발생했습니다.");
  //     });
  // };

  const DeleteTodoLists = async (id) => {
    try {
      const response = await axios.delete(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("삭제되었습니다.");
      if (response.status === 200) {
        alert("삭제되었습니다.");
      }
    } catch (error) {
      alert("에러가 발생했습니다.");
    }
  };

  return (
    <DeleteTodoListsWrapper
      onClick={() => {
        DeleteTodoLists();
      }}
    >
      <RiDeleteBin6Line />
    </DeleteTodoListsWrapper>
  );
};

export default DeleteTodo;

const DeleteTodoListsWrapper = styled.div`
  cursor: pointer;
`;
