import { createSlice } from "@reduxjs/toolkit"
import { IVisitedUserState } from "../../interface/users"

const initialVisitedUser: IVisitedUserState = {
  user: {
    avatarUrl: "",
    coverImageUrl: "",
    createdAt: "",
    description: "",
    email: "",
    firstName: "",
    id: "",
    lastName: "",
    username: "",
    website: "",
    facebookLink: "",
    githubLink: "",
    linkedinLink: "",
    twitterLink: "",
    instagramLink: "",
  },
  fullName: "",
  friends: [],
  friendRequests: [],
  friendRequestsSent: [],
  posts: []
}

const visitedUserSlice = createSlice({
  name: "visitedUser",
  initialState: initialVisitedUser,
  reducers: {
    setVisitedUser(state, action) {
      state.user = action.payload
      state.friendRequests = action.payload.friendRequestsSent
      state.friends = action.payload.friends
      state.friendRequestsSent = action.payload.friendRequestsSent
      state.posts = action.payload.posts
      state.fullName = `${action.payload.firstName} ${action.payload.lastName}`
    },
    setVisitedUserReset(state) {
      // Reset the state to the initial state
      Object.assign(state, initialVisitedUser)
    }
  }
})

export const { setVisitedUser, setVisitedUserReset } = visitedUserSlice.actions
export default visitedUserSlice.reducer
