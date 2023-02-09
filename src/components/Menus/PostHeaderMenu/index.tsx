import React, { useContext, useState } from "react"

// Third-party dependencies
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import FlagIcon from "@mui/icons-material/Flag"
import { useSelector } from "react-redux"
import EditIcon from "@mui/icons-material/Edit"

// Current project dependencies
import { PostHeaderMenuInterface } from "../../../interface/post"
import { RootState } from "../../../app/store"
import { messageContext } from "../../../context/MessageContext"
import EditPostForm from "../../components/EditPostForm"
import menuStyles from "../../../styles/components/menu"

export default function PostHeaderMenu(props: PostHeaderMenuInterface) {
  const { handleMessage } = useContext(messageContext)
  const { authorPostId, postId } = props
  const state = useSelector((state: RootState) => state.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [openEditForm, setOpenEditForm] = useState(false)

  const handleCloseEditForm = () => { setOpenEditForm(false) }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleReport = () => {
    handleMessage("Post reorted")
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        {!open ? (<MoreVertIcon />) : (<MoreHorizIcon />)}
      </IconButton>

      <Menu
        PaperProps={menuStyles.paperProps}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {
          state.user.id === authorPostId && (
            <MenuItem onClick={() => setOpenEditForm(true)}>
              <ListItemIcon><EditIcon /></ListItemIcon>
              Edit post
            </MenuItem>
          )
        }

        {
          authorPostId !== state.user.id && (
            <MenuItem onClick={handleReport} >
              <ListItemIcon><FlagIcon /></ListItemIcon>
              Report
            </MenuItem>
          )
        }

        <EditPostForm
          open={openEditForm}
          handleCloseEditForm={handleCloseEditForm}
          postId={postId}
        />
      </Menu>
    </>
  )
}
