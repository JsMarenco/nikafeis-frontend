import React, { useContext } from "react"
import { IconButton, Tooltip, Button } from "@mui/material"
import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
import removeFriendService from "../../../services/api/removeFriendService"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import { setMainUserFriends } from "../../../features/users/userSlice"
import { RemoveFriendInterface } from "../../../interface/functionsButtons"
import { REMOVE_FRIEND } from "../../../constants/buttons"

export default function RemoveFriendButton(props: RemoveFriendInterface) {
  const { friendId, customStyles, v2 = false, size = "large" } = props
  const state = useSelector((state: RootState) => state.user)
  const { handleMessage } = useContext(messageContext)
  const dispatch = useDispatch()

  const handleRemoveFriend = async () => {
    const { data, message, success } = await removeFriendService(state.user.id, friendId, state.token)

    if (success) {
      dispatch(setMainUserFriends(data.friends))
    }

    handleMessage(message)
  }

  return (
    <>
      {
        v2 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleRemoveFriend}
            sx={customStyles}
            fullWidth
          >
            {REMOVE_FRIEND}
          </Button>
        ) : (
          <Tooltip title={REMOVE_FRIEND} arrow>
            <IconButton
              onClick={handleRemoveFriend}
              sx={customStyles}
              size={size}
            >
              <PersonRemoveIcon />
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
}
