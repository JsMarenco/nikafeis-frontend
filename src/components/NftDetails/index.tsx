import React, { useState } from "react"

// Third-party dependencies
import { Box, Stack, Button, Typography, IconButton, Avatar, Divider } from "@mui/material"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined"

// Current project dependencies
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NoImage = require("../../assets/no_photo.jpg")
import nftDetailsTexts from "../../lang/nftDetails"
import nftStyles from "../../styles/nft/details"
import { useNavigate } from "react-router-dom"
import AppRoutes from "../../constants/app/routes"
import stylesVars from "../../styles/globals/vars"
import cardStyles from "../../styles/components/cards"

const magnifierHeight = 100
const magnifieWidth = 100
const zoomLevel = 1.5

export default function NftDetails() {
  const [showMagnifier, setShowMagnifier] = useState(false)
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])

  return (
    <>
      <Typography variant="h4" color="text.primary" fontWeight={700} my={2}>
        Item Details
      </Typography>

      <Stack
        spacing={2}
        direction={{ xs: "column", md: "row" }}
      >
        <Box sx={nftStyles.nft__details_image_container}>
          <img
            src={NoImage}
            onMouseEnter={(e) => {
              // update image size and turn-on magnifier
              const elem = e.currentTarget
              const { width, height } = elem.getBoundingClientRect()
              setSize([width, height])
              setShowMagnifier(true)
            }}
            onMouseLeave={() => {
              setShowMagnifier(false)
            }}
            onMouseMove={(e) => {
              // update cursor position
              const elem = e.currentTarget
              const { top, left } = elem.getBoundingClientRect()

              // calculate cursor position on the image
              const x = e.pageX - left - window.pageXOffset
              const y = e.pageY - top - window.pageYOffset
              setXY([x, y])
            }}
            style={{
              borderRadius: "15px"
            }}
          />
        </Box>

        <Box
          sx={{
            ...nftStyles.nft__details_image_zoom,
            display: showMagnifier ? "" : "none",
            // set size of magnifier
            height: "150px",
            width: "150px",
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth}px`,
            backgroundImage: `url('${NoImage}')`,
            backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight}px`,
            boxShadow: 8
          }}
        >

        </Box>

        <Stack flexGrow={1} spacing={2}>
          <DetailsHeader likes={230} views={397} />

          <Typography
            variant="h4"
            color="text.primary"
            fontWeight={700}
          >
            Diamond Horse Animals #47
          </Typography>

          <CreatorCard username={"user-b8272637-a"} />

          <Divider flexItem />

          <Typography variant="subtitle1" color="text.primary" fontWeight={700} >
            {nftDetailsTexts.descriptionTitle}
          </Typography>

          <Typography variant="subtitle1" color="text.primary">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque aut veniam consectetur magnam libero, natus eius numquam reprehenderit hic at, excepturi repudiandae magni optio odio doloribus?
          </Typography>
        </Stack>
      </Stack>
    </>
  )
}

interface IDetailsHeaderProps {
  likes: number,
  views: number
}

const DetailsHeader = (props: IDetailsHeaderProps) => {
  const { likes, views } = props

  return (
    <>
      <Stack spacing={1.5} direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
        <Stack spacing={3} direction="row" alignItems="center" justifyContent="center">
          <Button
            variant="contained"
            startIcon={<FavoriteBorderIcon />}
            sx={{
              borderRadius: "15px",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "background.paper",
              },
            }}
            disableElevation
            disableFocusRipple
          >
            {likes}
          </Button>

          <Typography
            variant="body1"
            color="text.primary"
            sx={{
              ...stylesVars.centeredElements,
              borderRadius: "15px",
              border: "1px solid black",
              p: .5,
              px: 1
            }}
          >
            <RemoveRedEyeOutlinedIcon sx={{ mr: 1 }} fontSize="small" />
            {nftDetailsTexts.views.replace("%views", String(views))}
          </Typography>
        </Stack>

        <IconButton
          sx={{
            bgcolor: "background.paper",
            "&:hover": {
              bgcolor: "background.paper",
            }
          }}
        >
          <MoreVertOutlinedIcon />
        </IconButton>
      </Stack>
    </>
  )
}

interface ICreatorCardProps {
  username: string
}

const CreatorCard = (props: ICreatorCardProps) => {
  const { username } = props

  const navigate = useNavigate()

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        justifyContent="initial"
      >
        <Avatar
          src=""
          alt={nftDetailsTexts.altImage.replace("%username", username)}
        >
          {username.charAt(0)}
        </Avatar>

        <Box>
          <Typography variant="subtitle1" color="text.primary">
            {nftDetailsTexts.creator}
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.primary"
            fontWeight={300}
            sx={cardStyles.userAvatar}
            onClick={() => navigate(AppRoutes.visitUserProfile.replace("%username", username))}
          >
            {nftDetailsTexts.username.replace("%username", username)}
          </Typography>
        </Box>
      </Stack>
    </>
  )
}
