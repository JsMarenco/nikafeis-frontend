import cardStyles from "styles/components/cards"
import stylesVars from "styles/globals/vars"

export const account__settings_form__container = {
  mx: "auto",
  height: "100%"
}

const container = {
  ...stylesVars.centeredElements,
  flexDirrection: "column",
  ...cardStyles.container,
}

const link = {
  ...stylesVars.centeredElements,
  color: "text.primary",
  borderRadius: "30px",
  justifyContent: "space-between",
  bgcolor: "background.default",
  "&:hover": {
    boxShadow: 4
  },
  width: "100%"
}

const socialInputContainer = {
  ...cardStyles.container,
  ...stylesVars.centeredElements,
  justiyContent: "initial"
}

const settingsStyles = {
  container,
  socialInputContainer,
  link,
}

export default settingsStyles
