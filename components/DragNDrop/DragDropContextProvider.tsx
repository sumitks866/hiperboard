import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import React from "react";

const DragDropContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => <DndProvider backend={HTML5Backend}>{children}</DndProvider>;

export default DragDropContextProvider;
