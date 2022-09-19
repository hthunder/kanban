import { useState } from "react";

export const AddTaskForm = (props: {
  onSubmit: (text: any) => Promise<unknown>;
}) => {
  const { onSubmit } = props;
  const [task, setTask] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await onSubmit(task);
        setTask("");
      }}
    >
      <label>
        +
        <input
          placeholder="Add task"
          className="ml-2 bg-transparent"
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        />
      </label>
    </form>
  );
};
