import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getBoardData = createAsyncThunk<
  {
    id: string;
    name: string;
    sections: string[];
  },
  string
>("board/getBoardData", async (boardId) => {
  const response = await axios.get(`/v1/boards/${boardId}`);
  return response.data;
});

export const createNewSection = createAsyncThunk<
  {
    data: { id: string; heading: string; tasks: [] };
    boardId: string;
  },
  {
    boardId: string;
    sectionHeading: string;
  }
>("board/createNewSection", async ({ boardId, sectionHeading }) => {
  const response = await axios.post(`/v1/boards/${boardId}/sections`, {
    heading: sectionHeading,
  });
  return { data: response.data, boardId };
});

export const createNewTask = createAsyncThunk<
  {
    data: {
      id: string;
      text: string;
      completed: boolean;
    };
    sectionId: string;
  },
  { text: string; sectionId: string }
>("board/createNewTask", async ({ text, sectionId }) => {
  const response = await axios.post(`/v1/sections/${sectionId}/tasks`, {
    text,
  });
  return { data: response.data, sectionId };
});

export const toggleCompleted = createAsyncThunk<string, string>(
  "board/toggleTask",
  async (taskId) => {
    await axios.patch(`/v1/tasks/${taskId}`);
    return taskId;
  }
);

export const deleteTask = createAsyncThunk<
  {
    sectionId: string;
    taskId: string;
  },
  {
    sectionId: string;
    taskId: string;
  }
>("board/deleteTask", async ({ sectionId, taskId }) => {
  await axios.delete(`/v1/sections/${sectionId}/tasks/${taskId}`);
  return {
    sectionId,
    taskId,
  };
});
