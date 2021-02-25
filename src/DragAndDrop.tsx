import { ReactNode } from "react";
import clsx from "clsx";
import { Tool, ToolCategory } from "./useTools";
import { useDrag, useDrop } from "react-dnd";

const DRAG_TYPE = "tool";

interface DragItem {
  id: string;
  type: string;
  category: ToolCategory;
}

interface DraggableItemProps {
  tool: Tool;
}

function DraggableItem({ tool }: DraggableItemProps) {
  const [, drag] = useDrag(() => ({
    item: {
      id: tool.id,
      type: DRAG_TYPE,
      category: tool.category,
    } as DragItem,
  }));

  return (
    <li
      ref={drag}
      className={clsx(
        "inline-block px-1 text-sm rounded-sm border select-none m-0.75 cursor-move",
        "border-green-200 text-green-700 bg-green-100",
      )}
    >
      {tool.label}
    </li>
  );
}

export type OnDropHandler = (item: DragItem, category: ToolCategory) => void;

interface TargetAreaProps {
  tools: Tool[];
  category: ToolCategory;
  onDrop: OnDropHandler;
  placeholder?: ReactNode;
}

export function TargetArea({ tools, category, onDrop, placeholder = "" }: TargetAreaProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: DRAG_TYPE,
    drop(item) {
      onDrop(item as DragItem, category);
    },
    canDrop(item) {
      return (item as DragItem).category !== category;
    },
    collect(monitor) {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));

  return (
    <div
      ref={drop}
      className={clsx(
        "border-2 border-dashed p-2",
        canDrop && !isOver && "border-red-400 bg-yellow-50",
        canDrop && isOver && "border-blue-500 bg-blue-50",
      )}
    >
      {tools.length > 0 ? (
        <ul className="flex flex-wrap -m-0.75">
          {tools.map((tool) => {
            return <DraggableItem key={tool.id} tool={tool} />;
          })}
        </ul>
      ) : (
        <div className="text-sm text-gray-500 select-none leading-22px">{placeholder}</div>
      )}
    </div>
  );
}
