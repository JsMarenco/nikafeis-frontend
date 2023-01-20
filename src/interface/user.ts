export default interface UserInterface {
  avatarUrl: string;
  coverImageUrl: string;
  createdAt: string;
  description: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  token: string;
  username: string;
  website: "",
}

export interface UserPayloadInterface extends UserInterface {
  friends: string[],
  friendRequests: string[],
  friendRequestsSent: string[],
  followers: string[]
  posts: string[]
}

export interface BasicUserInterface {
  avatarUrl: string;
  firstName: string;
  id: string;
  lastName: string;
  username: string
}

export interface UserStateInterface {
  user: UserInterface
  token: string,
  isLogin: boolean,
  friends: string[],
  friendRequestsSent: string[],
  friendRequests: string[],
  posts: string[],
  appTheme: string
}

export interface ProfileHeaderInterface {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  coverImageUrl: string;
}

export interface AboutUserInterface {
  firstName: string
  lastName: string
  username: string
  description: string
}

export type VisitedUserInterface = Omit<UserInterface, "email" | "token">

export type VisitedUserStateInterface = Omit<UserStateInterface, "user" | "isLogin" | "token" | "appTheme"> & {
  user: VisitedUserInterface
}

export interface VisitedUserPayloadInterface extends Omit<UserPayloadInterface, "email" | "token"> {
  user: VisitedUserInterface
  friends: string[],
  friendRequests: string[],
  friendRequestsSent: string[],
  followers: string[],
  posts: string[]
}

export interface friendRequestsInterface {
  from: BasicUserInterface,
  to: BasicUserInterface,
  date: string,
  id: string
}

export interface FriendRequestCardInterface {
  fullName: string,
  timeAgo?: string | "",
  avatarUrl: string,
  username: string,
  friendRequestId?: string | ""
}
