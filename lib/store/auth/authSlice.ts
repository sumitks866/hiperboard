import { LoginRequest, userLogin } from "@/api/login";
import { SignupRequest, userSignup } from "@/api/signup";
import { verifyToken } from "@/api/verifytoken";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface UserState {
  name: string;
  username: string;
  email: string;
}

interface IAuthState {
  activeUser: UserState | null;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  isSigningUp: boolean;
}

const initialAuthState: IAuthState = {
  activeUser: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isSigningUp: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logOut: () => {
      return initialAuthState;
    },
    updateAuth: (_, action: PayloadAction<IAuthState>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    //login
    builder.addCase(login.pending, (state) => {
      state.isLoggingIn = true;
      state.isLoggedIn = false;
      state.activeUser = null;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        state.isLoggingIn = false;
        state.isLoggedIn = true;
        state.activeUser = action.payload;
      }
    );
    builder.addCase(login.rejected, (state) => {
      state.isLoggedIn = false;
      state.activeUser = null;
      state.isLoggingIn = false;
    });

    //signup
    builder.addCase(signup.pending, (state) => {
      state.isSigningUp = true;
      state.isLoggedIn = false;
      state.activeUser = null;
    });
    builder.addCase(
      signup.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        state.isSigningUp = false;
        state.isLoggedIn = true;
        state.activeUser = action.payload;
      }
    );
    builder.addCase(signup.rejected, (state) => {
      state.isLoggedIn = false;
      state.activeUser = null;
      state.isSigningUp = false;
    });

    //verfying
    builder.addCase(verifyUser.pending, (state) => {
      state.isLoggingIn = true;
    });
    builder.addCase(
      verifyUser.fulfilled,
      (state, action: PayloadAction<UserState>) => {
        state.isLoggingIn = false;
        state.isLoggedIn = true;
        state.activeUser = action.payload;
      }
    );
    builder.addCase(verifyUser.rejected, (state) => {
      state.isLoggingIn = false;
      state.isLoggedIn = false;
      state.activeUser = null;
    });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (request: LoginRequest) => {
    const res = await userLogin(request);
    return res.data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (request: SignupRequest) => {
    const res = await userSignup(request);
    return res.data;
  }
);

export const verifyUser = createAsyncThunk("auth/verifyUser", async () => {
  const response = await verifyToken(Cookies.get("jwt") || "");
  if (response.status !== 200) {
    throw new Error("Token verification failed");
  }
  const data = await response.json();
  return data;
});

export const { logOut, updateAuth } = authSlice.actions;
export default authSlice.reducer;
