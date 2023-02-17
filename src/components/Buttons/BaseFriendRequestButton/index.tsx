import React from "react"

// Third-party dependencies
import { Button, IconButton, Tooltip, Typography } from "@mui/material"

// Current project dependencies
import { IBFRB } from "interface/friendRequest"
import buttonStyles from "styles/components/buttons"

export default function BaseFriendRequestButton(props: IBFRB) {
  const {
    version = "large",
    onClick = () => console.log("onClick"),
    tooltipText = "tooltipText",
    buttonText = "buttonText",
    icon = <></>
  } = props

  return (
    <>
      {/* LARGE VERSION */}
      {
        version === "large" && (
          <Button
            variant="outlined"
            color="primary"
            onClick={onClick}
            size="medium"
            fullWidth
            sx={buttonStyles.friendRequest}
            disableElevation
          >
            <Typography variant="button" color="text.primary">
              {buttonText}
            </Typography>
          </Button>
        )
      }

      {/* SMALL VERSION */}
      {
        version === "small" && (
          <Tooltip title={tooltipText} arrow>
            <IconButton
              onClick={onClick}
              size="large"
              sx={buttonStyles.friendRequest}
            >
              {icon}
            </IconButton>
          </Tooltip>
        )
      }
    </>
  )
}
