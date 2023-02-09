import { ReactNode } from "react"
import { IBasicUser } from "../users"

/**
 * Friend request interface
 */
export interface IFriendRequest {
  id: string
  from: IBasicUser,
  to: IBasicUser,
  date: string,
}

/**
 * Friend request card, will be use when the main user receive and friend request or wanna send it
 */
export interface IFriendRequestCard {
  id?: string | "",
  username: string,
  fullName: string,
  avatarUrl: string,
  timeAgo?: string | "",

  children: ReactNode,
}
