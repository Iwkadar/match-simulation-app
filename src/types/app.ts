// export type RootState = ReturnType<typeof import('../store').store.getState>;
// export type AppDispatch = typeof import('../store').store.dispatch;
export type RootState = ReturnType<typeof import('../store').rootReducer>;
export type AppStore = ReturnType<typeof import('../store').setupStore>;
export type AppDispatch = AppStore['dispatch'];
