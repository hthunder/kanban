import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListView } from "./ListView";
import { BoardView } from "./BoardView";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBoard,
  selectBoardSections,
  selectTasks,
  toggleCompleted,
  deleteTask,
  getBoardData,
  createNewSection,
  createNewTask,
} from "../../features/board/boardSlice";

enum View {
  Board = "BOARD",
  List = "LIST",
}

const views = [View.Board, View.List];

export const Board = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const [currentView, setCurrentView] = useState<View>(View.Board);
  const dispatch = useAppDispatch();
  const board = useAppSelector((state) => {
    if (boardId) return selectBoard(state, boardId);
  });
  const sections = useAppSelector((state) => {
    if (boardId) return selectBoardSections(state, boardId);
  });
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardData(boardId));
    }
  }, [boardId, dispatch]);

  const onCreateNewSection = (sectionHeading: string) => {
    if (board?.id) {
      return dispatch(createNewSection({ boardId: board?.id, sectionHeading }));
    }
  };

  const onCreateTask = (text: string, sectionId: string) => {
    return dispatch(createNewTask({ text, sectionId }));
  };

  const onToggleCompleted = (taskId: string) => {
    return dispatch(toggleCompleted(taskId));
  };

  const onTaskDelete = (sectionId: string, taskId: string) => {
    return dispatch(deleteTask({ sectionId, taskId }));
  };

  return (
    <div>
      <h1 className="mb-2 px-6 pt-4 text-2xl font-semibold">{board?.name}</h1>
      <div className="mt-2 border-b px-6">
        {views.map((view) => {
          return (
            <span
              className={`mr-4 pb-2 inline-block cursor-pointer ${
                currentView === view ? "border-b-2 border-stone-900" : ""
              }`}
              onClick={() => {
                setCurrentView((prevView) => {
                  return prevView === View.Board ? View.List : View.Board;
                });
              }}
            >
              {view.toLowerCase()}
            </span>
          );
        })}
      </div>

      {board && currentView === View.List && (
        <ListView
          board={board}
          sections={sections}
          tasks={tasks}
          onCreateNewSection={onCreateNewSection}
          onCreateTask={onCreateTask}
          onToggleCompleted={onToggleCompleted}
          onTaskDelete={onTaskDelete}
        />
      )}
      {board && currentView === View.Board && (
        <BoardView
          board={board}
          sections={sections}
          tasks={tasks}
          onCreateNewSection={onCreateNewSection}
          onCreateTask={onCreateTask}
          onToggleCompleted={onToggleCompleted}
          onTaskDelete={onTaskDelete}
        />
      )}
    </div>
  );
};
