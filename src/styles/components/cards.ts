import stylesVars from "../globals/vars"

const container = {
  bgcolor: "background.paper",
  p: 2,
  borderRadius: "15px"
}

const title = {
  color: "text.primary",
  fontWeight: 400,
}

const text = {
  color: "text.primary",
}

const userAvatar = {
  mr: 1,
  cursor: "pointer",
  flexShrink: 0,
  width: 45,
  height: 45,
}

const profileLink = {
  color: "text.primary",
  width: "auto",
  cursor: "pointer",
  "&:hover": {
    color: "text.secondary",
  },
  textAling: "center"
}

const headerContainer = {
  ...stylesVars.centeredElements,
  justifyContent: "space-between",
  mb: 2,
}

const interactContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}

const interactButton = {
  borderRadius: "15px",
  "&:hover": {
    transition: "all 0.5s ease-in-out",
    boxShadow: 2,
  }
}

const tooltip = {
  tooltip: {
    sx: {
      bgcolor: "primary",
      p: 1,
      fontSize: 14,
      borderRadius: "10px",
    }
  }
}

const userAvatarCenter = {
  width: { xs: "90px", sm: "130px" },
  height: { xs: "90px", sm: "130px" },
  margin: "auto",
  boxShadow: 5,
}

const link = {
  ...profileLink,
}

/**
 * Styles for all the cards
 */
const cardStyles = {
  container,
  title,
  text,
  userAvatar,
  headerContainer,
  profileLink,
  interactContainer,
  interactButton,
  tooltip,
  userAvatarCenter,
  link
}

export default cardStyles
