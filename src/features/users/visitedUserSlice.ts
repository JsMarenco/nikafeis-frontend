import { createSlice } from "@reduxjs/toolkit"
import { VisitedUserPayloadInterface, VisitedUserStateInterface } from "../../interface/user"

const initialVisitedUser: VisitedUserStateInterface = {
  user: {
    avatarUrl: "",
    coverImageUrl: "",
    createdAt: "",
    description: "",
    firstName: "",
    id: "",
    lastName: "",
    username: "",
    website: "",
    facebook_link: "",
    github_link: "",
    linkedin_link: "",
    twitter_link: "",
    instagram_link: "",
  },
  fullName: "",
  friends: [],
  friendRequests: [],
  friendRequestsSent: [],
  posts: []
}

interface ActionsInterface {
  type?: string,
  payload: VisitedUserPayloadInterface
}

const visitedUserSlice = createSlice({
  name: "visitedUser",
  initialState: initialVisitedUser,
  reducers: {
    setVisitedUser(state, action: ActionsInterface) {
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
