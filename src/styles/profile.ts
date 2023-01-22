import { global_flex } from "."
import { main__container_grid } from "./container"

export const profile_option__button = {
  color: "text.primary",
  borderRadius: "10px",
}

export const profile_cover_container = {
  width: "100%",
  height: { xs: "600px", sm: "500px" },
  position: "relative",
  ...main__container_grid
}

export const profile_avatar = {
  width: { xs: "70px", sm: "100px", md: "150px" },
  height: { xs: "70px", sm: "100px", md: "150px" },
  mb: "0px",
  cursor: "pointer",
}

export const profile_avatar_container = {
  bgcolor: "background.default",
  borderRadius: "100%",
  p: 1,
}

export const profile_cover = {
  borderRadius: "15px",
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "75%",
  minHeight: "150px",
  maxheight: "400px",
  top: 0,
  display: "block",
  minWidth: "100%",
}

export const profile_about_container = {
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

export const profile_about = {
  ...global_flex,
  ml: { xs: 0, sm: 5 },
  justifyContent: "space-between",
  width: "100%",
  flexDirection: { xs: "column", sm: "row" },
}

export const profile_about_titles = {
  textAlign: { xs: "center", sm: "left" }
}

export const profile_option__button_v2 = {
  borderRadius: "15px",
  width: "90%",
  mx: "auto",
  mt: .5
}

export const profile_button_size = "large"

export const profile_about_icon = {
  mr: 1.5
}

