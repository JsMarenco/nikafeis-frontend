import React from "react"

// Third-party dependencies
import { Box, Stack, Typography, IconButton, Button, Avatar, Tooltip, Fade } from "@mui/material"
import StraightIcon from "@mui/icons-material/Straight"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import TimelineIcon from "@mui/icons-material/Timeline"
import { useNavigate } from "react-router-dom"

// Current project dependencies
import nftCardStyles from "../../../styles/nftCard"
import { shortenText } from "../../../utils/basic"
import nftCardTexts from "../../../lang/nftCard"
import AppRoutes from "../../../constants/app/routes"
import stylesVars from "../../../styles/globals/vars"
import cardStyles from "../../../styles/components/cards"

interface BasicUserInterface {
  avatarUrl: string;
  firstName: string;
  id: string;
  lastName: string;
  username: string
}

interface Props {
  bidEthValue: string
  nftName: string
  nftId: string
  nftOwner: BasicUserInterface
}

/**
 * This NFT card footer, includes the user info, somes bottons
 */
export default function NftCardFooter(props: Props) {
  const navigate = useNavigate()

  const { bidEthValue, nftName, nftId } = props
  const { avatarUrl, firstName, lastName, username } = props.nftOwner

  return (
    <Stack spacing={1} flexGrow={1} p={2}>
      <Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
        <Box sx={{ ...stylesVars.centeredElements, justifyContent: "initial" }} >
          <StraightIcon fontSize="small" />

          <Typography variant="subtitle1" color="text.primary" fontWeight={200} fontSize={14}>
            {nftCardTexts.HightestDid.replace("%ethValue", bidEthValue)}
          </Typography>
        </Box>

        <IconButton>
          <FavoriteBorderIcon fontSize="small" />
        </IconButton>
      </Stack>

      <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
        <Stack spacing={1} direction="row" justifyContent="initial" alignItems="center">
          <Avatar
            src={avatarUrl}
            alt={nftCardTexts.userAvatar.replace("%userAvatar", `${firstName} ${lastName}`)}
            sx={{ mr: .5 }}
          />

          <Box flexGrow={1}>
            <Tooltip
              title={nftName}
              placement="top"
              componentsProps={nftCardStyles.nft__card_tootltip}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Typography
                fontWeight={300}
                color="text.primary"
                sx={cardStyles.tooltip}
                onClick={() => navigate(AppRoutes.viewNft.replace("%id", nftId))}
              >
                {shortenText(nftName)}
              </Typography>
            </Tooltip>

            <Typography variant="h6" color="text.primary" fontWeight={200} fontSize={13}>
              {`@${username}`}
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Typography variant="h6" color="text.primary" fontSize={13} fontWeight={200} align="center">
            {nftCardTexts.currentBid}
          </Typography>

          <Typography variant="h6" color="text.primary" fontSize={15} fontWeight={500} align="center">
            {nftCardTexts.bidValue.replace("%ethValue", bidEthValue)}
          </Typography>
        </Box>
      </Stack>

      <Box sx={nftCardStyles.nft__card_footer_container}>
        <Button
          variant="contained"
          sx={nftCardStyles.nft__card_button}
          disableElevation
        >
          New
        </Button>

        <Button
          variant="text"
          sx={nftCardStyles.nft__card_button}
          startIcon={<TimelineIcon />}
          disableElevation
        >
          {nftCardTexts.activityButton}
        </Button>
      </Box>
    </Stack >
  )
}
