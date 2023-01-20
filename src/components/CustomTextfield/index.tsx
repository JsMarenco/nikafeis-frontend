// Imports from the standard library
import React from "react"

// Imports from third-party libraries
import { Icon, TextField } from "@mui/material"

interface Props {
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
  onIconClick?: () => void; // added this prop
  disabled?: boolean
  variant?: "outlined" | "standard" | "filled",
  value?: string,
  onFieldChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CustomTextfield(props: Props) {
  const { name, label, placeholder, type, icon, onIconClick, disabled, variant, value, onFieldChange } = props

  return (
    <TextField
      name={name}
      label={label}
      placeholder={placeholder}
      variant={!variant ? "outlined" : variant}
      fullWidth
      autoComplete="off"
      required
      type={!type ? "text" : type}
      InputProps={{
        startAdornment: icon ? (
          <Icon sx={{ mr: 2, cursor: "pointer" }} onClick={onIconClick}>
            {icon}
          </Icon>
        ) : null
      }}
      value={value}
      onChange={onFieldChange}
      disabled={disabled}
    />
  )
}
