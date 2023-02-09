/**
 * All the app routes
 */
enum AppRoutes {
  login = "/login",
  register = "/register",
  logout = "/logout",
  resetPassword = "/reset-password",
  home = "/home",
  videos = "/watch",
  friends = "/friends",
  profile = "/profile",
  inbox = "/inbox",
  userNotFound = "/profile/user/not-found",
  newConnections = "/networking",
  friendsRequests = "/friends/requests",
  mainUserProfile = "/profile/me",
  visitUserProfile = "/profile/%username",
  userUsernameApp = "me",
  editPost = "/edit/posts",
  newChat = "/inbox/%chatId",
  viewNft = "/nfts/%id",
  marketplace = "/marketplace",
  popularNftCollections = "/collections/popular",
  myCollections = "/collections/my",
  createCollection = "/collections/create",
  topSellers = "/sellers/top",
  topNfts = "/nfts/top",
  buyNft = "/nft/:id/buy",
  settings = "/settings",
  accountSettings = "/settings/account",
  socialAccountsSettings = "/settings/account/social",
  profileSettings = "/settings/account/profile",
}

export default AppRoutes
