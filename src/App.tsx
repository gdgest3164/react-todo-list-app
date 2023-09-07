import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Components/Board";

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

const CoponentAddButton = styled.div`
  position: fixed;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, white 1%, rgba(255, 255, 255, 0) 90%);
  border-radius: 50px;
  top: 5%;
  right: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    transform: rotate(0.5turn);
    background-color: #a9fff8;
  }
`;

const Icon = styled.img`
  src: ${(p) => p.src};
  width: ${(p) => p.width};
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((oldToDos) => {
        const boardCopy = [...oldToDos[source.droppableId]];
        const taskObj = boardCopy[source.index];

        boardCopy.splice(source?.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...oldToDos,
          [source.droppableId]: boardCopy,
        };
      });
    } else {
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const targetBoard = [...allBoard[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        targetBoard.splice(destination.index, 0, taskObj);

        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <CoponentAddButton>
          <Icon src="./icons/add.png" width="20px" />
        </CoponentAddButton>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((k) => (
              <Board key={k} toDos={toDos[k]} boardId={k} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
