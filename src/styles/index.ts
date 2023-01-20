export const avatarStyles = {
  display: "block",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  marginRight: "10px",
  flexShrink: "0",
}

export const contentStyles = {
  display: "block",
  width: "95%",
  maxWidth: "700px",
  margin: "0 auto",
  mb: 2,
  p: 2,
  borderradius: "5px",
}

export const commentStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
}

export const user__fullName_link = {
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    color: "text.secondary",
  },
  width: "auto",
  textAling: "center"
}

export const user__avatar = {
  width: 45,
  height: 45,
  cursor: "pointer",
  mr: 1.5,
  flexShrink: 0,
}

export const global_flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}

// there are only two animations type 'pulse' | 'wave'
export const skeleton__animation = "wave"

export const floatButton = {
  position: "fixed",
  bottom: 15,
  right: 15,
  boxshadow: 7,
  display: {
    xs: "flex",
    sm: "none"
  }
}

export const section_scroll = {
  position: "relative",
  bgcolor: "background.default",
  p: 4,
  pb: 8,
  borderRadius: "15px",
  height: "100vh",
  overflowY: "scroll",
}
