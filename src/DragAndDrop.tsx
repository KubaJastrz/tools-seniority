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
  onClick: OnClickHandler;
  isDeleteMode: boolean;
}

function DraggableItem({ tool, onClick, isDeleteMode }: DraggableItemProps) {
  const dragItem: DragItem = {
    id: tool.label,
    type: DRAG_TYPE,
    category: tool.category,
  };
  const [, drag] = useDrag(
    () => ({
      canDrag() {
        return !isDeleteMode;
      },
      item: dragItem,
    }),
    [isDeleteMode],
  );

  return (
    <li>
      <button
        ref={drag}
        onClick={() => onClick(dragItem)}
        className={clsx(
          "inline-block px-1 text-sm rounded-sm border select-none m-0.75",
          isDeleteMode
            ? "border-red-300 text-red-700 bg-red-100 cursor-pointer"
            : "border-green-200 text-green-700 bg-green-100 cursor-move",
        )}
      >
        {tool.label}
      </button>
    </li>
  );
}

export type OnDropHandler = (item: DragItem, category: ToolCategory) => void;
export type OnClickHandler = (item: DragItem) => void;

interface TargetAreaProps {
  tools: Tool[];
  category: ToolCategory;
  onDrop: OnDropHandler;
  onClick: OnClickHandler;
  isDeleteMode: boolean;
  placeholder?: ReactNode;
}

export function TargetArea({
  tools,
  category,
  onDrop,
  onClick,
  isDeleteMode,
  placeholder = "",
}: TargetAreaProps) {
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
            return (
              <DraggableItem
                key={tool.label}
                tool={tool}
                onClick={onClick}
                isDeleteMode={isDeleteMode}
              />
            );
          })}
        </ul>
      ) : (
        <div className="text-sm text-gray-500 select-none leading-22px">
          {canDrop && isOver ? "drop here" : placeholder}
        </div>
      )}
    </div>
  );
}
