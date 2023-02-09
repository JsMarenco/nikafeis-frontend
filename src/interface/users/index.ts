/**
 * Basic user interface
 */
export interface IBasicUser {
  id: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  username: string
}

/**
 * Main user interface
 */
export default interface IUser extends IBasicUser {
  coverImageUrl: string;
  description: string;
  email: string;

  token: string;

  facebookLink: string,
  githubLink: string,
  linkedinLink: string,
  twitterLink: string,
  instagramLink: string,
  website: string,

  createdAt: string;
}

/**
 * Main user state for redux toolkit
 */
export interface IUserState {
  user: IUser
  token: string,
  isLogin: boolean,
  fullName: string,
  friends: string[],
  friendRequestsSent: string[],
  friendRequests: string[],
  posts: string[],
}

/**
 * Visited user interface, will be when the main user vistit another profile
 */
export type IVisitedUser = Omit<IUser, "token">

/**
 * Visied user interface fro redux toolkit
 */
export interface IVisitedUserState extends Omit<IUserState, "user" | "isLogin" | "token" | "appTheme"> {
  user: IVisitedUser
}
