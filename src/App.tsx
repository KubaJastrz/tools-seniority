import { useEffect } from "react";
import { ToolCategory, useToolsReducer } from "./useTools";
import { OnDropHandler, TargetArea } from "./DragAndDrop";

export function App() {
  const { lists, actions } = useToolsReducer();

  const onDrop: OnDropHandler = (item, category) => {
    actions.changeCategory({
      id: item.id,
      newCategory: category,
    });
  };

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
            placeholder="you did it 🎉"
            category={ToolCategory.Uncategorized}
            onDrop={onDrop}
            tools={lists.uncategorized}
          />
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
              onDrop={onDrop}
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
              onDrop={onDrop}
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
              onDrop={onDrop}
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
              onDrop={onDrop}
              tools={lists.mastery}
            />
          </header>
        </div>
      </div>
    </div>
  );
}
