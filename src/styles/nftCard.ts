import stylesVars from "./globals/vars"

const nft__card_container = {
  bgcolor: "background.paper",
  borderRadius: "15px",
  overflow: "hidden",
  color: "text.primary",
  maxWidth: "300px",
  width: "100%",
  position: "relative",
}

const nft__card_header_container = {
  position: "relative",
}

const nft__card_header_menu_container = {
  ...stylesVars.centeredElements,
  width: "100%",
  justifyContent: "space-between",
  p: 2,
  position: "absolute",
  top: 0,
  zIndex: 10
}

const nft__card_icon_container = {
  bgcolor: "background.default",
  "&:hover": {
    bgcolor: "background.default",
  }
}

const nft__card_state = {
  borderRadius: "15px",
  px: 2,
  py: .7,
  color: "text.primary",
  bgcolor: "background.default",
  ...stylesVars.centeredElements,
}

const nft__card_footer_container = {
  ...stylesVars.centeredElements,
  width: "100%",
  justifyContent: "space-between",
}

const nft__card_tootltip = {
  tooltip: {
    sx: {
      bgcolor: "primary",
      p: 1.5,
      fontSize: 14,
      borderRadius: "10px"
    }
  }
}

const nft__card_image_container = {
  display: "inline-block",
  position: "relative"
}

const nft__card_image = {
  transition: "transform 0.5s ease",
  "&:hover": {
    transform: "scale(1.5)"
  }
}

const nft__card_button = {
  borderRadius: "15px",
  // bgcolor: "background.default",
  // "&:hover": {
  //   bgcolor: "background.default"
  // }
}

const nftCardStyles = {
  nft__card_container,
  nft__card_header_container,
  nft__card_icon_container,
  nft__card_button,
  nft__card_state,
  nft__card_header_menu_container,
  nft__card_footer_container,
  nft__card_tootltip,
  nft__card_image_container,
  nft__card_image,
}

export default nftCardStyles
