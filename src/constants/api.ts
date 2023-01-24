import axios from "axios"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

// API ROUTES
// <============= Registration =============>
export const LOGIN_API_ROUTE = "/users/login"

// <============= Authentication =============>
export const REGISTER_USER_ROUTE = "/users"
export const FORGOT_PASSWORD_ROUTE = "/users/forgot-password"
export const RESET_PASSWORD_ROUTE = "/%userId/reset-password"
export const SEARCH_BAR_ROUTE = "/users/%userId/search?name=%user_name"

// <============= Data Management =============>
export const UPDATE_USER_INFO = "/users/%userId"
export const UPDATE_USER_AVATAR = "/users/%userId/avatar"
export const UPDATE_USER_COVER = "/users/%userId/cover"
export const DELETE_USER_ROUTE = "/users/%userId"
export const GET_USER_BY_USERNAME_ROUTE = "/users/%username"
export const GET_POST_BY_USERNAME_ROUTE = "/users/%s/posts"
export const CREATE_POST_ROUTE = "/posts"
export const LIKE_POST_ROUTE = "/posts/%s/likes"
export const CREATE_COMMENT_ROUTE = "/comments"
export const GET_RECENT_POSTS = "/posts/recent/%o/%l"
export const UPDATE_POST_ROUTE = "/posts"
export const REJECT_FRIEND_REQUEST_ROUTE = "/users/%to/friends/requests/%requestId"
export const GET_POST_BY_ID_ROUTE = "/posts/%postId"
export const GET_USER_FRIENDS = "/users/%userId/friends/%offset/%limit"

// <============= Friendship Management =============>
export const SEND_FRIEND_REQUEST_ROUTE = "/users/%from/%to/friends/requests"
export const GET_USER_FRIEND_REQUESTS_ROUTE = "/users/%s/friends/requests/%offset/%limit"
export const ACCEPT_FRIEND_REQUEST_ROUTE = "/users/%to/friends/requests/%friendRequestId/accept"
export const GET_USER_CONNECTIONS = "/users/connections/%u/%o/%l"
export const GET_FRIEND_REQUEST_INFO_ROUTE = "/users/%from/%to/friends/requests/info"
export const REMOVE_FRIEND_ROUTE = "/users/%u/%f/friends"
