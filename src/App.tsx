import { ReactNode, useEffect } from "react";
import clsx from "clsx";
import { Tool, useToolsReducer } from "./useTools";

interface TargetAreaProps {
  tools: Tool[];
  placeholder?: ReactNode;
}

function TargetArea({ tools, placeholder = "" }: TargetAreaProps) {
  return (
    <div className="border-2 border-dashed p-2">
      {tools.length > 0 ? (
        <ul className="flex flex-wrap -m-0.75">
          {tools.map((tool) => {
            return (
              <li
                key={tool.id}
                className={clsx(
                  "inline-block px-1 text-sm rounded-sm border select-none m-0.75 cursor-grab",
                  "border-green-200 text-green-700 bg-green-100",
                )}
              >
                {tool.label}
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-sm text-gray-500">{placeholder}</div>
      )}
    </div>
  );
}

export function App() {
  const { lists, actions } = useToolsReducer();

  useEffect(() => {
    setTimeout(() => {
      if (lists.uncategorized.length) {
        actions.moveToBeginner("test");
      }
    }, 1000);
  }, [actions]);

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
          <TargetArea placeholder="you did it 🎉" tools={lists.uncategorized} />
        </section>
        <div className="space-y-5">
          <header className="space-y-1">
            <h2 className="section-title">Beginner</h2>
            <p className="text-sm">
              Heard or used once or twice. Requires a mentor to use effectively.
            </p>
            <TargetArea placeholder="nothing there yet" tools={lists.beginner} />
          </header>
          <header className="space-y-1">
            <h2 className="section-title">Self-sufficient</h2>
            <p className="text-sm">
              Used multiple times. Had some paint points in the past and starts to understand best
              practices.
            </p>
            <TargetArea placeholder="pick something from the list" tools={lists.selfSufficient} />
          </header>
          <header className="space-y-1">
            <h2 className="section-title">Advanced</h2>
            <p className="text-sm">
              Knows best practices for the tool and can extend it for their use case. Can mentor
              less experienced team members.
            </p>
            <TargetArea placeholder="c’mon, you can do it!" tools={lists.advanced} />
          </header>
          <header className="space-y-1">
            <h2 className="section-title">Mastery</h2>
            <p className="text-sm">
              Can list risks associated with the tool. Knows when to and when not to use it over the
              alternatives. Can easily pin point use cases to the documentation and explain the
              complexity to beginners.
            </p>
            <TargetArea placeholder="wow, such empty" tools={lists.mastery} />
          </header>
        </div>
      </div>
    </div>
  );
}
