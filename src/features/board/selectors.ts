import { RootState } from "../../app/store";

export const selectBoard = (state: RootState, boardId: string) => {
  return state.board.boards.byId[boardId];
};

export const selectBoardSections = (state: RootState, boardId: string) => {
  if (state.board.boards.byId[boardId]) {
    const sectionIds = state.board.boards.byId[boardId].sections;
    return sectionIds
      .map((sectionId) => {
        return state.board.sections.byId[sectionId];
      })
      .filter((section) => section);
  }
};

export const selectTasks = (state: RootState) => {
  return state.board.tasks;
};
