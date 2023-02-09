import React from "react"

// Third-party dependencies
import { Box, IconButton, Typography } from "@mui/material"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import MoreVertIcon from "@mui/icons-material/MoreVert"

// Current project dependencies
import nftCardTexts from "../../../lang/nftCard"
import cardStyles from "../../../styles/components/cards"
import nftCardStyles from "../../../styles/nftCard"
import stylesVars from "styles/globals/vars"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NoImage = require("../../../assets/no_photo.jpg")

export default function NftCardHeader() {
  return (
    <Box sx={{
      ...cardStyles.container,
      position: "relative",
      overflow: "hidden",
      p: 0
    }}>
      <Box sx={{
        ...cardStyles.headerContainer,
        position: "absolute",
        width: "100%",
        zIndex: 9,
        p: 2,
      }}>
        <Box
          sx={{
            borderRadius: "15px",
            p: 1,
            bgcolor: "background.paper",
            ...stylesVars.centeredElements,
            px: 2
          }}
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="small" />

          <Typography
            variant="body1"
            color="text.primary"
            fontSize={14}
            fontWeight={400}
          >
            New
          </Typography>
        </Box>

        <IconButton sx={nftCardStyles.nft__card_icon_container} size="small" >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box sx={nftCardStyles.nft__card_image_container} >
        <img
          src={NoImage}
          alt={nftCardTexts.image_alt.replace("%ownerName", "Test test")}
          style={nftCardStyles.nft__card_image}
        />
      </Box>
    </Box>
  )
}
