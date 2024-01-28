// import React from "react";
// import { useDrop } from "react-dnd";

// interface IProps {
//   id: string;
//   accept: string;
//   children: React.ReactNode;
//   onDrop: Function;
//   className?: string;
// }

// export default function Droppable({
//   id,
//   children,
//   accept,
//   onDrop,
//   className,
// }: IProps) {
//   const [collectedProps, drop] = useDrop(() => ({
//     accept,
//     drop: (item) => onDrop(id, item),
//     collect: (monitor) => ({
//       isOver: !!monitor.isOver(),
//     }),
//   }));

//   return (
//     <div
//       ref={drop}
//       className={`${className} relative ${collectedProps.isOver ? "" : ""}`}
//     >
//       {collectedProps.isOver && (
//         <div className="bg-gray-200 bg-opacity-50 rounded-md h-full w-full top-0 right-0 absolute flex flex-col">
//           <div></div>
//         </div>
//       )}
//       <span>{children}</span>
//     </div>
//   );
// }
