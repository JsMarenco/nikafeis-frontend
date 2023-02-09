import stylesVars from "../globals/vars"

const optionButton = {
  color: "text.primary",
  borderRadius: "10px",
}

const coverContainer = {
  width: "100%",
  height: { xs: "600px", sm: "500px" },
  position: "relative",
  py: 2,
  px: { xs: 1, sm: 2 },
  borderRadius: "15px",
  backgroundColor: "background.paper",
}

const cover = {
  borderRadius: "15px",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "75%",
  minHeight: "150px",
  maxHeight: "400px",
  top: 0,
  display: "block",
  overlow: "hidden"
}

const avatar = {
  width: { xs: "70px", sm: "100px", md: "150px" },
  height: { xs: "70px", sm: "100px", md: "150px" },
  mb: "0px",
  cursor: "pointer",
}

const avatarContainer = {
  bgcolor: "background.default",
  borderRadius: "100%",
  p: 1,
}

const aboutContainer = {
  position: "absolute",
  left: { xs: 0, sm: 15 },
  bottom: { xs: 15, sm: 0 },
  display: "flex",
  alignItems: "center",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: { xs: "flex-start", sm: "initial" },
  width: {
    xs: "100%",
    sm: "95%"
  },
}

const about = {
  ...stylesVars.centeredElements,
  ml: { xs: 0, sm: 5 },
  justifyContent: "space-between",
  width: "100%",
  flexDirection: { xs: "column", sm: "row" },
}

const buttonSize: "small" | "large" | "medium" = "large"

const aboutTitles = {
  textAlign: { xs: "center", sm: "left" }
}

const aboutIcon = {
  mr: 1.5
}

/**
 * Profile styles
 */
const profileStyles = {
  optionButton,
  cover,
  coverContainer,
  avatar,
  avatarContainer,
  about,
  aboutContainer,
  buttonSize,
  aboutTitles,
  aboutIcon
}

export default profileStyles
