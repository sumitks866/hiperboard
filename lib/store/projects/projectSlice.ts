import { mockProjects } from "@/utils/mock";
import { IProject } from "@/utils/types";
import { createSlice } from "@reduxjs/toolkit";

interface ProjectState {
  activeProject: IProject | undefined;
}

const initialProjectState: ProjectState = {
  activeProject: mockProjects[0],
};

export const projectSlice = createSlice({
  name: "project",
  initialState: initialProjectState,
  reducers: {},
});

export default projectSlice.reducer;
