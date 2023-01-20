import React from "react"
import { Tooltip, Button } from "@mui/material"
import { CommentOptionsInterface } from "../../../interface/commet"
import { comment__card_option__button } from "../../../styles/comment"

export default function OptionButton(props: CommentOptionsInterface) {
  const { toolTipLabel, icon, textContent, customFunction } = props

  return (
    <Tooltip title={toolTipLabel} arrow>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        startIcon={icon}
        onClick={(e) => customFunction(e)}
        sx={comment__card_option__button}
      >
        {textContent}
      </Button>
    </Tooltip>
  )
}
