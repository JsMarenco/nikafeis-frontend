import { settings_container } from "./settings"

export const account__settings_form__container = {
  mx: "auto",
  height: "100%"
}

export const account__settings_password__button = {
  display: "block",
  mx: "auto",
  borderRadius: "15px",
}

export const account__settings_container = {
  display: "flex",
  flexDirrection: "column",
  justifyContent: "center",
  alignItems: "center",
  ...settings_container,
}
