import { createSlice } from "@reduxjs/toolkit"
import { IUserState } from "../../interface/users"
import { saveInLocalStorage } from "../../utils/basic"

const initialUser: IUserState = {
  user: {
    avatarUrl: "",
    coverImageUrl: "",
    createdAt: "",
    description: "",
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    token: "",
    username: "",
    website: "",
    facebookLink: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
    instagramLink: "",
  },
  token: "",
  isLogin: false,
  fullName: "",
  friends: [],
  friendRequests: [],
  friendRequestsSent: [],
  posts: [],
}

const userSlice = createSlice({
  name: "user",
  initialState: initialUser,
  reducers: {
    setMainUser(state, action) {
      state.user = action.payload
      console.log("🚀 ~ file: userSlice.ts:39 ~ setMainUser ~ action.payload", action.payload)
      state.token = action.payload.token
      state.friendRequests = action.payload.friendRequests
      state.friends = action.payload.friends
      state.friendRequestsSent = action.payload.friendRequestsSent
      state.posts = action.payload.posts
      state.isLogin = true
      state.fullName = `${action.payload.firstName} ${action.payload.lastName}`

      saveInLocalStorage("MAIN_USER", action.payload)
      saveInLocalStorage("USER_TOKEN", action.payload.token)
    },
    logout(state) {
      // Reset the state to the initial state
      Object.assign(state, initialUser)

      // Remove the user and token from local storage
      localStorage.removeItem("MAIN_USER")
      localStorage.removeItem("USER_TOKEN")
    },
    setMainUserPosts(state, action) {
      state.posts = action.payload.posts
    },
    setMainUserFriends(state, action) {
      state.friends = action.payload
    },
    setMainUserFriendRequestsSent(state, action) {
      state.friendRequestsSent = action.payload
    },
    setMainUserFriendRequests(state, action) {
      state.friendRequests = action.payload
    },
  }
})

export const {
  setMainUser,
  logout,
  setMainUserPosts,
  setMainUserFriends,
  setMainUserFriendRequests,
  setMainUserFriendRequestsSent,
} = userSlice.actions

export default userSlice.reducer
