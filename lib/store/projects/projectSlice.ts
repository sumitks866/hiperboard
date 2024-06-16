 import { IProject, IProjectSummary } from "@/utils/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ProjectState {
  activeProject: IProjectSummary | null;
  projectList: IProject[];
}

const initialProjectState: ProjectState = {
  activeProject: null,
  projectList: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: {
    updateProjectList: (state, action: PayloadAction<IProject[]>) => {
      state.projectList = action.payload;
    },
    setActiveProject: (state, action: PayloadAction<IProjectSummary>) => {
      state.activeProject = action.payload;
    },
  },
});

export const { updateProjectList, setActiveProject } = projectSlice.actions;

export default projectSlice.reducer;
