import { ReactNode } from "react"

/**
 * Friend request card variants interface,
 *
 */
export interface FRBaseProps {
  fullName: string,
  avatarUrl: string,
  username: string,
  children: ReactNode,

  timeAgo?: string | "",
  friendRequestId?: string | "",
}

export interface FriedRequestCardInterface extends FRBaseProps {
  variant: "small" | "large"
  children: ReactNode,
}
