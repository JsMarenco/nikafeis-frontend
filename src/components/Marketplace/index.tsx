import { Box, Typography } from "@mui/material"
import React from "react"
import NftCard from "../Cards/NftCard"

// Third-party dependencies

// Current project dependencies

export default function Marketplace() {
  return (
    <>
      <Box sx={{
        p: 2
      }} >
        <Typography variant="body1" color="text.primary">
          Top NFTs
        </Typography>

        <NftCard />
      </Box>
    </>
  )
}
