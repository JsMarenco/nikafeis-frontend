export interface FunctionsButtonsBaseInterface {
  friendRequestId: string,
  customStyles?: object
  variant?: "outlined" | "text" | "contained"
  v2?: true | false,
  size?: "small" | "large" | "medium"
}

export interface RemoveFriendInterface extends Omit<FunctionsButtonsBaseInterface, "friendRequestId"> {
  friendId: string
}

export interface CancelFriendRequestInterface extends Omit<FunctionsButtonsBaseInterface, "friendRequestId"> {
  username: string
}

export interface SendFriendRequestInterface extends Omit<FunctionsButtonsBaseInterface, "friendRequestId"> {
  username: string,
}
