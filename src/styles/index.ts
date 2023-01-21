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
  bgcolor: "background.default",
  p: 2,
  py: 0,
  pb: 2,
  overflowY: "auto",
  borderStartStartRadius: "15px",
  borderStartEndRadius: {
    xs: "15px",
    sm: 0
  }
}

