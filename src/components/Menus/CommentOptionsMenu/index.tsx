import React, { useState } from "react"

// Third-party dependencies
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { ListItemIcon, Menu, MenuItem } from "@mui/material"
import { Flag } from "@mui/icons-material"
import { useSelector } from "react-redux"
import EditIcon from "@mui/icons-material/Edit"

// Current project dependencies
import { CommentOptionMenuInterface } from "../../../interface/commet"
import OptionButton from "../../components/OptionButton"
import { RootState } from "../../../app/store"
import menuStyles from "../../../styles/components/menu"

export default function CommentOptionsMenu(props: CommentOptionMenuInterface) {
  const { authorCommentId } = props

  const state = useSelector((state: RootState) => state.user)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <OptionButton
        toolTipLabel="More options"
        customFunction={handleClick}
        textContent="More"
        icon={open ? <MoreHorizIcon /> : <MoreVertIcon />}
      />

      <Menu
        PaperProps={menuStyles.paperProps}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
          <ListItemIcon><Flag /></ListItemIcon>
          Report
        </MenuItem>

        {
          state.user.id === authorCommentId && (
            <MenuItem>
              <ListItemIcon><EditIcon /></ListItemIcon>
              Edit comment
            </MenuItem>
          )
        }
      </Menu>
    </>
  )
}
