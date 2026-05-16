import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchCurrentUser,
  forgotPasswordThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
  resetPasswordThunk,
} from "../store/authSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return useMemo(
    () => ({
      user: auth.user,
      initializing: auth.initializing,
      authLoading: auth.authLoading,
      error: auth.error,
      isAuthenticated: Boolean(auth.user),
      login: (payload) => dispatch(loginThunk(payload)).unwrap(),
      register: (payload) => dispatch(registerThunk(payload)).unwrap(),
      forgotPassword: (email) => dispatch(forgotPasswordThunk(email)).unwrap(),
      resetPassword: (payload) => dispatch(resetPasswordThunk(payload)).unwrap(),
      logout: () => dispatch(logoutThunk()).unwrap().catch(() => undefined),
      refreshUser: () => dispatch(fetchCurrentUser()).unwrap(),
    }),
    [auth, dispatch]
  );
}
