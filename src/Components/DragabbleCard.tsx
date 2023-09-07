import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<IDraggingProps>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  border: 1px solid "#4b9ff";
  background-color: ${(props) => props.theme.cardColor};
  box-shadow: ${(props) =>
    props.$isDragging ? "0px 2px 5px rgba(0,0,0, 0.5)" : "none"};
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 400;
`;

const Icon = styled.img`
  src: ${(p) => p.src};
  width: 15px;
`;

interface IDraggingProps {
  $isDragging: boolean;
}

interface IDraggabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ index, toDoId, toDoText }: IDraggabbleCardProps) {
  return (
    <>
      <Draggable key={toDoId} draggableId={String(toDoId)} index={index}>
        {(magic, snapshot) => (
          <Card
            $isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {toDoText}
            <Icon src="./icons/trash.png" />
          </Card>
        )}
      </Draggable>
    </>
  );
}

export default React.memo(DragabbleCard);
