import { useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import trashIcon from "../../assets/trash.svg";
import { BoardTask } from "./BoardTask";
import { NewSectionForm } from "./NewSectionForm";

export const BoardView = (props: {
  board?: { id: string; name: string; sections: string[] };
  sections?: {
    id: string;
    heading: string;
    tasks: string[];
  }[];
  tasks: {
    byId: {
      [key: string]: {
        id: string;
        text: string;
        completed: boolean;
      };
    };
    allIds: string[];
  };
  onCreateNewSection: (sectionHeading: any) => Promise<unknown> | undefined;
  onCreateTask: (text: string, sectionId: string) => Promise<unknown>;
  onToggleCompleted: (taskId: string) => Promise<unknown>;
  onTaskDelete: (sectionId: string, taskId: string) => Promise<unknown>;
}) => {
  const {
    sections,
    tasks,
    board,
    onCreateNewSection,
    onCreateTask,
    onToggleCompleted,
    onTaskDelete,
  } = props;
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen max-w-full overflow-scroll bg-neutral-100 px-4">
      {sections?.map((section) => (
        <section key={section.id} className="w-80">
          <h2 className="py-2 px-2 text-left text-lg font-medium">
            {section.heading}
          </h2>
          <div className="px-2">
            <ul className="mb-2">
              {section.tasks.map((taskId) => (
                <BoardTask
                  task={tasks.byId[taskId]}
                  onMouseEnter={() => {
                    setHoveredTask(taskId);
                  }}
                  onMouseLeave={() => {
                    setHoveredTask(null);
                  }}
                  onChange={() => {
                    onToggleCompleted(taskId);
                  }}
                  isOptionsButtonShown={hoveredTask === taskId}
                  dropdownItems={[
                    {
                      onClickHandler: () => onTaskDelete(section.id, taskId),
                      img: trashIcon,
                      text: "Удалить задачу",
                    },
                  ]}
                />
              ))}
            </ul>
            <AddTaskForm onSubmit={(text) => onCreateTask(text, section.id)} />
          </div>
        </section>
      ))}
      <NewSectionForm onSubmit={onCreateNewSection} />
    </div>
  );
};
