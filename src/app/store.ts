import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../features/users/userSlice"
import visitedUserReducer from "../features/users/visitedUserSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    visitedUser: visitedUserReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
