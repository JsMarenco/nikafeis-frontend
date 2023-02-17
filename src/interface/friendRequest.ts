import { ReactNode } from "react"

type version = "large" | "small"
/**
 * Base Friend Request Button interface
 */
export interface IBFRB {
  tooltipText: string,
  buttonText: string,
  onClick: () => void,
  icon: ReactNode,
  version: version,
}

/**
 * Friend Request Button Interface
 */
export interface IFRB {
  friendRequestId: string,
  version: version,
}

/**
 * Send Friend Request Interface
 */
export interface ISFR {
  username: string,
  version: version,
}

/**
 * Canceled Friend Request Interface
 */
export type ICFR = ISFR

/**
 * Remove Friend
 */
export interface IRF {
  friendId: string,
  version: version,
}
