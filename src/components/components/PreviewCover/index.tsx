import React from "react"
import { Box, Stack, Tooltip, Typography } from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useSelector } from "react-redux"
import { RootState } from "../../../app/store"

interface Props {
  src: string
}

export default function PreviewCover(props: Props) {
  const { src = "" } = props

  const state = useSelector((state: RootState) => state.user)

  return (
    <>
      {
        src && (
          <>
            <Typography
              variant="subtitle1"
              color="text.primary"
              align="center"
              mb={3}
            >
              Preview
            </Typography>

            <Stack
              spacing={2}
              direction="row"
              alignItems={"center"}
              justifyContent={"center"}
              mb={3}
            >

              <Tooltip title="Your old cover" arrow>
                <Box
                  sx={{
                    width: "150px",
                    height: "90px",
                    backgroundImage: `url(${state.user.coverImageUrl})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px"
                  }}
                />
              </Tooltip>

              <ArrowForwardIosIcon
                color="primary"
              />

              <Tooltip title="Your new cover" arrow>
                <Box
                  sx={{
                    width: "150px",
                    height: "90px",
                    backgroundImage: `url(${src})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "15px"
                  }}
                />
              </Tooltip>
            </Stack>
          </>
        )
      }
    </>
  )
}
