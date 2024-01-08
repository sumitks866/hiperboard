import { getUserDetails } from "@/api/user";
import { IUser } from "@/utils/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IUserState {
  user: IUser | null;
}

const initialUserState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchUserDetails.rejected, (state) => {
      state.user = null;
    });
  },
});

export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async () => {
    const res = await getUserDetails();
    return res.data;
  }
);

export default userSlice.reducer;
