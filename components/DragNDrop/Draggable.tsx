// import React from "react";
// import { DragSourceMonitor, useDrag } from "react-dnd";

// interface IProps {
//   id: string;
//   content?: any;
//   type: string;
//   children: React.ReactNode;
// }

// export default function Draggable({ children, id, content, type }: IProps) {
//   const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
//     type,
//     item: { content },
//     options: { dropEffect: "move" },
//     collect: (monitor: DragSourceMonitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   }));

//   return (
//     <div
//       ref={drag}
//       className={`${isDragging ? "opacity-0 z-20 absolute" : ""}`}
//       style={
//         {
//           // position: isDragging ? "absolute" : "inherit",
//           // zIndex: isDragging ? 10 : 0,
//         }
//       }
//     >
//       {children}
//     </div>
//   );
// }
