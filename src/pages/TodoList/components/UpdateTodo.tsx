import { useState } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import { MdDone } from "react-icons/md";
import TodoListType from "../../../compiler/types";
import DeleteTodo from "../components/DeleteTodo";

interface styledProps {
  isCompleted: boolean;
}

const UpdateTodo = ({ id, todo, isCompleted, userId }: TodoListType) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [updateTodoList, setUpdateTodolist] = useState({
    updateId: id,
    updateTodo: todo,
    updateIsCompleted: isCompleted,
    updateUserId: userId,
  });

  const handleUpdateTodoList = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        window.location.reload();
      })
      .catch((err) => {
        alert(`${err}가 발생했습니다.`);
      });
  };

  const changeChecked = async () => {
    await axios
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

  return (
    <UpdateTodoWrapper>
      <CheckCircle isCompleted={isCompleted} onClick={changeChecked}>
        {isCompleted && <MdDone />}
      </CheckCircle>

      <ContentWrapper>
        {!isModified ? (
          <ReadContent>{todo}</ReadContent>
        ) : (
          <UpdateContent
            onChange={handleUpdateTodoList}
            defaultValue={todo}
            name="updateContent"
            required
          />
        )}
      </ContentWrapper>

      <BtnsWrapper>
        {/* isModified가 true면? */}
        {!isModified ? (
          <ModifyingBtn onClick={changeModified}>수정</ModifyingBtn>
        ) : (
          <FinishingBtn
            onClick={() => {
              updateTodoLists();
              changeModified();
            }}
          >
            제출
          </FinishingBtn>
        )}

        <DeleteTodo id={id} />
      </BtnsWrapper>
    </UpdateTodoWrapper>
  );
};

export default UpdateTodo;

const UpdateTodoWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  width: 30rem;
  font-size: 1rem;
`;

const CheckCircle = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 0.3rem;
  background-color: #ced4da;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${(props: styledProps) =>
    props.isCompleted &&
    css`
      // isCompleted가 되면 아래와같은 변화가 생긴다.
      background-color: ${(props) => props.theme.colors.mint};
      color: ${(props) => props.theme.colors.white};
    `}
`;

const ContentWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.lightGray};
  margin: 0 0.9rem 1.5rem 0.9rem;
`;

const ReadContent = styled.div`
  width: 21.5rem;
  font-size: 0.97rem;
  text-align: start;
  line-height: 1.2rem;
  word-break: break-all;
  white-space: pre-wrap;
`;

const UpdateContent = styled.textarea`
  width: 21.5rem;
  border: none;
  font-size: 0.82rem;
  resize: none;
`;

const BtnsWrapper = styled.div``;

const ModifyingBtn = styled.button`
  width: 2.5rem;
  height: 1.5rem;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.mint};
  color: ${(props) => props.theme.colors.white};
  border-radius: 0.3rem;
`;

const FinishingBtn = styled(ModifyingBtn)``;
