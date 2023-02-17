import { IC } from "./comment"
import { BasicUserInterface } from "./user"

export interface InteractPostInterface {
  handleLike: () => void,
  handleShare: () => void,
  handleShowComments: () => boolean,

  likes: number,
  comments: number,
  shares: number,
}
export interface ContentPostInterface extends InteractPostInterface {
  title: string,
  content: string,
  postImages: Array<string>,
  username: string
}

export interface PostHeaderMenuInterface {
  postId: string,
  authorPostId: string
}

export interface EditPostFormInterface {
  open: boolean,
  handleCloseEditForm: () => void,
  postId: string
}

/**
 * Post interface
 */
export interface IP {
  id: string
  title: string
  content: string
  views?: number
  shares: BasicUserInterface[]
  comments: string[]
  likes: string[]
  postImages: Array<string>,
  author: BasicUserInterface
  createdAt: string
  updatedAt: string
}

type headerPost = "createdAt" | "updatedAt"
/**
 * Header Post Interface
 */
export interface IHP extends Omit<BasicUserInterface, "id">, Pick<IP, headerPost> {
  postId: string,
  handleReport: () => void,
  authorPostId: string
}

type contentPost = "title" | "content" | "postImages"
/**
 * Content Post Interface
 */
export interface ICP extends Pick<BasicUserInterface, "username">, Pick<IP, contentPost> { }

type interactPost = "title" | "content" | "postImages"
/**
 * Interact Post Interface
 */
export interface IIP extends Pick<IP, interactPost>, Pick<BasicUserInterface, "username"> {
  handleLike: () => void,
  handleShare: () => void,
  fetchCommentsUpdated: () => void
  likes: number,
  shares: number,
  postId: string,
  comments: IC[],
  limit: number,
}
