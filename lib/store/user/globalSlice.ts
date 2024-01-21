import {
  CreateCompanySpaceRequest,
  createCompanySpace,
} from "@/api/company/createCompanySpace";
import { getUserDetails } from "@/api/user";
import { IWorkspace, IUser, IUserRole } from "@/utils/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { isNull } from "lodash";

interface IGlobalState {
  user: IUser | null;
  activeCompany: IWorkspace | null;
  companyWorkspaces: IWorkspace[];
}

const initialUserState: IGlobalState = {
  user: null,
  activeCompany: null,
  companyWorkspaces: [],
};

export const globalSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setActiveCompany: (state, action: PayloadAction<IWorkspace>) => {
      state.activeCompany = action.payload;
    },
    updateCompaniesList: (state, action: PayloadAction<IWorkspace[]>) => {
      state.companyWorkspaces = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchUserDetails.rejected, (state) => {
      state.user = null;
    });

    //create company
    builder.addCase(
      createCompanyWorkspace.fulfilled,
      (state, action: PayloadAction<IUserRole>) => {
        if (isNull(state.user)) return;
        state.user.companyRoles = [...state.user.companyRoles, action.payload];
      }
    );
  },
});

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const res = await getUserDetails();
    return res.data;
  }
);

export const createCompanyWorkspace = createAsyncThunk(
  "user/createCompanyWorkspace",
  async (request: CreateCompanySpaceRequest) => {
    const res = await createCompanySpace(request);
    return res.data;
  }
);

export const { setActiveCompany, updateCompaniesList } = globalSlice.actions;
export default globalSlice.reducer;
