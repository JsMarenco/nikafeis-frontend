import axios from "axios"

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

enum ApiRoutes {
  login = "/users/login",
  registerUser = "/users",
  forgotPassword = "/users/forgot-password",
  resetPassword = "/%userId/reset-password",
  searchBar = "/users/%userId/search?name=%user_name",
  updateUserInfo = "/users/%userId",
  updateUserAvatar = "/users/%userId/avatar",
  updateUserCover = "/users/%userId/cover",
  deleteUser = "/users/%userId",
  getUserByUsername = "/users/%username",
  getPostByUsername = "/users/%s/posts",
  createPost = "/posts",
  likePost = "/posts/%s/likes",
  createComment = "/comments",
  getRecentPosts = "/posts/recent/%o/%l",
  updatePost = "/posts",
  rejectFriendRequest = "/users/%to/friends/requests/%requestId",
  getPostById = "/posts/%postId",
  getUserFriends = "/users/%userId/friends/%offset/%limit",
  sendFriendRequest = "/users/%from/%to/friends/requests",
  getUserFriendRequests = "/users/%s/friends/requests/%offset/%limit",
  acceptFriendRequest = "/users/%to/friends/requests/%friendRequestId/accept",
  getUserConnections = "/users/connections/%u/%o/%l",
  getFriendRequestInfo = "/users/%from/%to/friends/requests/info",
  removeFriend = "/users/%u/%f/friends"
}

export default ApiRoutes
