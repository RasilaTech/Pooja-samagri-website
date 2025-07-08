import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
}

const getInitialAuthState = (): AuthState => {
  const accessToken = localStorage.getItem("accessToken");
  return {
    accessToken: accessToken,
    isAuthenticated: !!accessToken, // Set isAuthenticated to true if accessToken exists
  };
};
const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ access_token: string }>,
    ) => {
      state.accessToken = action.payload.access_token;
      localStorage.setItem("accessToken", action.payload.access_token);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
