import { useState } from "react";
import { AddTaskForm } from "./AddTaskForm";
import trashIcon from "../../assets/trash.svg";

export const ListView = (props: {
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
  // createTask: (text: any, sectionId: any) => Promise<void>;
  onCreateTask: (text: string, sectionId: string) => Promise<unknown>;
  onToggleCompleted: (taskId: string) => Promise<unknown>;
  onTaskDelete: (sectionId: string, taskId: string) => Promise<unknown>
}) => {
  const {
    board,
    sections,
    tasks,
    onCreateNewSection,
    onCreateTask,
    onToggleCompleted,
    onTaskDelete,
  } = props;
  const [sectionInput, setSectionInput] = useState("");

  return (
    <div className="px-4">
      {sections?.map((section) => {
        return (
          <section key={section.id}>
            <h2 className="text-xl">{section.heading}</h2>
            <ul>
              {section.tasks.map((taskId) => {
                const task = tasks?.byId[taskId];
                return (
                  <li key={taskId} className="flex align-middle">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={task.completed}
                      onChange={() => {
                        onToggleCompleted(taskId);
                      }}
                    />
                    <span>{task.text}</span>
                    <button
                      className="px-2"
                      onClick={() => onTaskDelete(section.id, taskId)}
                    >
                      <img src={trashIcon} alt="Иконка корзины" />
                    </button>
                  </li>
                );
              })}
            </ul>
            <AddTaskForm
              onSubmit={(text: string) => onCreateTask(text, section.id)}
            />
          </section>
        );
      })}
      <form
        className="mt-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await onCreateNewSection(sectionInput);
          setSectionInput("");
        }}
      >
        +
        <input
          className="ml-2"
          value={sectionInput}
          placeholder="Add section"
          onChange={(e) => {
            setSectionInput(e.target.value);
          }}
        />
      </form>
    </div>
  );
};
