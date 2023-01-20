import React from "react"
import { IconButton, Stack } from "@mui/material"
import ClearIcon from "@mui/icons-material/Clear"

interface IImage {
  imagesUrls: string[],
  clearImage: (index: number) => void,
}

export default function PriviewImage(props: IImage) {
  const { imagesUrls = [], clearImage, } = props

  return (
    <>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          width: "100%"
        }}
      >
        {
          imagesUrls.length !== 0 && (
            imagesUrls.map((imageUrl, index) => {
              return (
                <Stack
                  spacing={1}
                  key={`${imageUrl}-${index}`}
                >
                  <IconButton
                    aria-label="delete"
                    onClick={() => clearImage(index)}
                    sx={{
                      position: "absolute",
                      ml: -2,
                      mt: -1,
                    }}
                  >
                    <ClearIcon />
                  </IconButton>

                  <img
                    src={imageUrl}
                    alt="preview"
                    style={{
                      width: "65px",
                      height: "65px",
                      borderRadius: "15px",
                    }}
                  />
                </Stack>
              )
            })
          )
        }
      </Stack>
    </>
  )
}
