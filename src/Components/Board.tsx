import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import Modal from "react-modal";
import { useState } from "react";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  /* background-color: ${(props) => props.theme.boardColor}; */
  background-color: rgba(190, 190, 190, 0.5);
  border-radius: 5px;
  min-height: 230px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  color: white;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  width: 90%;
  border-radius: 5px;
  border: 1px solid white;
  height: 30px;
  display: flex;
  margin: 0 auto;
  padding: 5px;
  background: transparent;
  color: white;
`;

const Area = styled.div<IAreaProps>`
  background: ${(props) =>
    props.$isDraggingOver
      ? "linear-gradient(rgba(255, 184, 184, 0), rgba(43, 255, 50, 0.3))"
      : props.$draggingFromThis
      ? "linear-gradient(rgba(255, 184, 184, 0), rgba(255, 52, 52, 0.3))"
      : "transparent"};
  flex-grow: 1;
  transition: all 0.3s ease;
  padding: 20px;
`;

const Form = styled.form``;

interface IAreaProps {
  $isDraggingOver: boolean;
  $draggingFromThis: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

function Board({ toDos, boardId }: IBoardProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setTodos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newTodo = {
      id: Date.now(),
      text: toDo,
    };
    setTodos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodo],
      };
    });
    setValue("toDo", "");
  };

  return (
    <>
      <Wrapper>
        <Title>{boardId}</Title>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input {...register("toDo", { required: true })} type="text" />
        </Form>
        <Droppable droppableId={boardId}>
          {(magic, info) => (
            <Area
              $isDraggingOver={info.isDraggingOver}
              $draggingFromThis={Boolean(info.draggingFromThisWith)}
              ref={magic.innerRef}
              {...magic.droppableProps}
            >
              {toDos.map((toDo, index) => (
                <DragabbleCard
                  key={toDo.id}
                  index={index}
                  toDoId={toDo.id}
                  toDoText={toDo.text}
                />
              ))}
              {magic.placeholder}
            </Area>
          )}
        </Droppable>
      </Wrapper>
    </>
  );
}

export default Board;
