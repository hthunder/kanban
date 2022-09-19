import { createSlice } from "@reduxjs/toolkit";
import {
  getBoardData,
  createNewSection,
  createNewTask,
  toggleCompleted,
  deleteTask,
} from "./thunks";
import { selectBoard, selectBoardSections, selectTasks } from "./selectors";

export type BoardI = {
  boards: {
    byId: {
      [key: string]: {
        id: string;
        name: string;
        sections: string[];
      };
    };
    allIds: string[];
  };
  sections: {
    byId: {
      [key: string]: {
        id: string;
        heading: string;
        tasks: string[];
      };
    };
    allIds: string[];
  };
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
};

const initialState = {
  boards: {
    byId: {},
    allIds: [],
  },
  sections: {
    byId: {},
    allIds: [],
  },
  tasks: {
    byId: {},
    allIds: [],
  },
} as BoardI;

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getBoardData.fulfilled, (state, action) => {
        const { boards } = state;
        const { id } = action.payload;

        boards.byId[id] = {
          ...action.payload,
        };
        boards.allIds.push(id);
      })
      .addCase(createNewSection.fulfilled, (state, action) => {
        const { sections, boards } = state;
        const { data, boardId } = action.payload;

        sections.byId[data.id] = data;
        sections.allIds.push(data.id);
        boards.byId[boardId].sections.push(data.id);
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        const { tasks, sections } = state;
        const { data, sectionId } = action.payload;

        tasks.byId[data.id] = data;
        tasks.allIds.push(data.id);
        sections.byId[sectionId].tasks.push(data.id);
      })
      .addCase(toggleCompleted.fulfilled, (state, action) => {
        const { tasks } = state;
        const taskId = action.payload;

        tasks.byId[taskId].completed = !tasks.byId[taskId].completed;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { sections, tasks } = state;
        const { sectionId, taskId } = action.payload;

        delete tasks.byId[taskId];
        tasks.allIds = tasks.allIds.filter((id) => id !== taskId);
        sections.byId[sectionId].tasks = sections.byId[sectionId].tasks.filter(
          (id) => id !== taskId
        );
      });
  },
});

export {
  getBoardData,
  createNewSection,
  createNewTask,
  toggleCompleted,
  deleteTask,
};
export { selectBoard, selectBoardSections, selectTasks };
export default boardSlice.reducer;
