import { createModel } from '@rematch/core';

interface AuthenticationState {
  isLoggedIn: boolean;
  waitingForLogin: boolean;
}

export const authentication = createModel<AuthenticationState>({
  state: {
    isLoggedIn: false,
    waitingForLogin: false,
  },
  reducers: {
    setLoggedInStatus: (state: AuthenticationState, isLoggedIn: boolean) => ({
      ...state,
      isLoggedIn,
    }),

    setWaitingStatus: (state: AuthenticationState, status: boolean) => ({
      ...state,
      waitingForLogin: status,
    }),
  },
});
