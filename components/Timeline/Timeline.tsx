import { IEvent } from "@/utils/types";
import React from "react";

interface IProps {
  events: IEvent[];
}

const Timeline = ({ events }: IProps) => {
  return (
    <div className="mx-auto w-full">
      <div className="overflow-hidden h-full">
        {events.map((event, index) => (
          <div key={event.id} className="relative flex w-full left-timeline">
            {index !== events.length - 1 && (
              <div
                className="absolute border-opacity-80 border-l border-black h-full"
                style={{ left: "2.4%" }}
              />
            )}
            <div className="z-20 flex items-center bg-gray-800 h-fit rounded-full">
              {event.eventIcon}
            </div>
            <div className=" bg-white rounded-lg border w-full px-4 py-3 ml-8 mb-8">
              {event.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
