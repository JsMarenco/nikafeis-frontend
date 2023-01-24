export const menu__container_paper__props = {
  elevation: 0,
  sx: {
    borderRadius: "10px",
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    bgcolor: "background.default",
    "&:before": {
      content: "\"\"",
      display: "block",
      position: "absolute",
      top: 0,
      right: 20,
      width: 10,
      height: 10,
      bgcolor: "background.default",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
}

export const menu_link = {
  p: 2,
  borderRadius: "15px",
  color: "text.primary",
  my: 1,
}

const menu_container_base_styles = {
  backgroundColor: "background.paper",
  zIndex: 9,
}

export const menu_container_desktop = {
  ...menu_container_base_styles,
  position: {
    xs: "fixed",
    sm: "relative",
  },
  top: 0,
  height: "100%",
  width: {
    xs: "250px",
    sm: "100%"
  },
  overflowY: "auto",
  boxShadow: {
    xs: 6,
    sm: 0
  },
  pt: { xs: 2, sm: 0 },
  px: 2
}
