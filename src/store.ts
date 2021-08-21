import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers";

const middleware = [...getDefaultMiddleware({ thunk: true })];

export const store = configureStore({
  middleware,
  reducer: rootReducer,
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
