import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword as forgotPasswordRequest,
  getCurrentUser,
  login as loginRequest,
  logout as logoutRequest,
  register as registerRequest,
  resetPassword as resetPasswordRequest,
} from "../services/auth.service";
import { getErrorMessage, toErrorPayload } from "../helpers/errors";

export const fetchCurrentUser = createAsyncThunk("auth/fetchCurrentUser", async (_, { rejectWithValue }) => {
  try {
    return await getCurrentUser();
  } catch (error) {
    return rejectWithValue(toErrorPayload(error, "No se pudo recuperar la sesion actual."));
  }
});

export const loginThunk = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    return await loginRequest(payload);
  } catch (error) {
    return rejectWithValue(toErrorPayload(error, "No se pudo iniciar sesion."));
  }
});

export const registerThunk = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    return await registerRequest(payload);
  } catch (error) {
    return rejectWithValue(toErrorPayload(error, "No se pudo completar el registro."));
  }
});

export const logoutThunk = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logoutRequest();
    return true;
  } catch (error) {
    return rejectWithValue(toErrorPayload(error, "No se pudo cerrar sesion."));
  }
});

export const forgotPasswordThunk = createAsyncThunk("auth/forgotPassword", async (email, { rejectWithValue }) => {
  try {
    return await forgotPasswordRequest(email);
  } catch (error) {
    return rejectWithValue(toErrorPayload(error, "No se pudo procesar la solicitud."));
  }
});

export const resetPasswordThunk = createAsyncThunk("auth/resetPassword", async (payload, { rejectWithValue }) => {
  try {
    return await resetPasswordRequest(payload);
  } catch (error) {
    return rejectWithValue(toErrorPayload(error, "No se pudo restablecer la contrasena."));
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    initializing: true,
    authLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.initializing = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.initializing = false;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.initializing = false;
      })
      .addCase(loginThunk.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authLoading = false;
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.error = getErrorMessage(action.payload || action.error, "No se pudo iniciar sesion.");
      })
      .addCase(registerThunk.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authLoading = false;
        state.error = null;
      })
      .addCase(registerThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.error = getErrorMessage(action.payload || action.error, "No se pudo completar el registro.");
      })
      .addCase(logoutThunk.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = null;
        state.authLoading = false;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.user = null;
        state.authLoading = false;
      })
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(forgotPasswordThunk.fulfilled, (state) => {
        state.authLoading = false;
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.error = getErrorMessage(action.payload || action.error, "No se pudo procesar la solicitud.");
      })
      .addCase(resetPasswordThunk.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state) => {
        state.authLoading = false;
      })
      .addCase(resetPasswordThunk.rejected, (state, action) => {
        state.authLoading = false;
        state.error = getErrorMessage(action.payload || action.error, "No se pudo restablecer la contrasena.");
      });
  },
});

export default authSlice.reducer;
