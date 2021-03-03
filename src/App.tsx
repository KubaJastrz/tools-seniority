import { ToolCategory, useToolsReducer } from "./useTools";
import { OnClickHandler, OnDropHandler, TargetArea } from "./DragAndDrop";
import { FormEventHandler, useCallback, useEffect, useState } from "react";

export function App() {
  const { state, lists, actions } = useToolsReducer();

  const handleDrop: OnDropHandler = (item, category) => {
    actions.changeCategory({
      label: item.id,
      newCategory: category,
    });
  };

  const handleNewTool: FormEventHandler<AddToolFormElement> = (event) => {
    event.preventDefault();
    const newToolElement = event.currentTarget.elements["new-tool"];
    const name = newToolElement.value;
    if (name.trim().length === 0) {
      return;
    }
    if (state.tools.find((tool) => tool.label === name)) {
      window.alert(`Tool "${name}" already exists!`);
      return;
    }
    actions.addTool(name);
    newToolElement.value = "";
  };

  const { isDeleteMode, setIsDeleteMode, handleDeleteClick } = useDeleteMode(actions.removeTool);

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      <p>
        Drag tools from the list on the left and drop them to one of the categories on the right.
      </p>
      <div className="grid grid-cols-2 gap-8">
        <section className="space-y-3">
          <header>
            <h2 className="section-title">Tools</h2>
          </header>
          <TargetArea
            placeholder={state.tools.length > 0 ? "you did it 🎉" : "add something 👇"}
            category={ToolCategory.Uncategorized}
            onDrop={handleDrop}
            onClick={handleDeleteClick}
            isDeleteMode={isDeleteMode}
            tools={lists.uncategorized}
          />
          <AddToolForm onSubmit={handleNewTool} />
          <label className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <input
              type="checkbox"
              checked={isDeleteMode}
              onChange={(event) => setIsDeleteMode(event.currentTarget.checked)}
            />
            <span className="text-red-600 text-sm">Enable delete mode</span>
          </label>
        </section>
        <div className="space-y-5">
          <header className="space-y-1">
            <h2 className="section-title">Beginner</h2>
            <p className="text-sm">
              Heard or used once or twice. Requires a mentor to use effectively.
            </p>
            <TargetArea
              placeholder="nothing there yet"
              category={ToolCategory.Beginner}
              onDrop={handleDrop}
              onClick={handleDeleteClick}
              isDeleteMode={isDeleteMode}
              tools={lists.beginner}
            />
          </header>
          <header className="space-y-1">
            <h2 className="section-title">Self-sufficient</h2>
            <p className="text-sm">
              Used multiple times. Had some paint points in the past and starts to understand best
              practices.
            </p>
            <TargetArea
              placeholder="pick something from the list"
              category={ToolCategory.SelfSufficient}
              onDrop={handleDrop}
              onClick={handleDeleteClick}
              isDeleteMode={isDeleteMode}
              tools={lists.selfSufficient}
            />
          </header>
          <header className="space-y-1">
            <h2 className="section-title">Advanced</h2>
            <p className="text-sm">
              Knows best practices for the tool and can extend it for their use case. Can mentor
              less experienced team members.
            </p>
            <TargetArea
              placeholder="c’mon, you can do it!"
              category={ToolCategory.Advanced}
              onDrop={handleDrop}
              onClick={handleDeleteClick}
              isDeleteMode={isDeleteMode}
              tools={lists.advanced}
            />
          </header>
          <header className="space-y-1">
            <h2 className="section-title">Mastery</h2>
            <p className="text-sm">
              Can list risks associated with the tool. Knows when to and when not to use it over the
              alternatives. Can easily pin point use cases to the documentation and explain the
              complexity to beginners.
            </p>
            <TargetArea
              placeholder="wow, such empty"
              category={ToolCategory.Mastery}
              onDrop={handleDrop}
              onClick={handleDeleteClick}
              isDeleteMode={isDeleteMode}
              tools={lists.mastery}
            />
          </header>
        </div>
      </div>
    </div>
  );
}

interface AddToolFormElements extends HTMLFormControlsCollection {
  "new-tool": HTMLInputElement;
}

interface AddToolFormElement extends HTMLFormElement {
  elements: AddToolFormElements;
}

function AddToolForm({ onSubmit }: { onSubmit: FormEventHandler }) {
  return (
    <form onSubmit={onSubmit}>
      <label className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
        <span className="flex-shrink-0">Add new tool</span>
        <input
          type="text"
          name="new-tool"
          placeholder="eg. bash"
          className="border border-gray px-2 py-1 rounded shadow-sm min-w-0"
          autoComplete="off"
        />
        <button type="submit" className="h-6 w-6 flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </label>
    </form>
  );
}

function useDeleteMode(onDelete: (id: string) => void) {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const handleDeleteClick: OnClickHandler = (item) => {
    if (
      isDeleteMode &&
      window.confirm(`Are you sure you want to remove "${item.id}"? This cannot be undone.`)
    ) {
      onDelete(item.id);
    }
  };

  const handleCtrlKeyDown = useCallback((event) => {
    if (event.ctrlKey) {
      setIsDeleteMode(true);
    }
  }, []);
  const handleCtrlKeyUp = useCallback((event) => {
    if (!event.ctrlKey) {
      setIsDeleteMode(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleCtrlKeyDown);
    document.addEventListener("keyup", handleCtrlKeyUp);
    return () => {
      document.removeEventListener("keydown", handleCtrlKeyDown);
      document.removeEventListener("keyup", handleCtrlKeyUp);
    };
  }, []);

  return {
    isDeleteMode,
    setIsDeleteMode,
    handleDeleteClick,
  };
}
