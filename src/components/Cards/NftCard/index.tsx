import React from "react"

// Third-party dependencies
import { Box } from "@mui/material"

// Current project dependencies
import NftCardFooter from "./NftCardFooter"
import NftCardHeader from "./NftCardHeader"
import cardStyles from "../../../styles/components/cards"

export default function NftCard() {
  return (
    <>
      <Box
        sx={{
          ...cardStyles.container,
          maxWidth: "300px",
          p: 0
        }}
      >
        <NftCardHeader />

        <NftCardFooter
          bidEthValue={"45"}
          nftName={"Diamond Horse Animals #47"}
          nftId={"1234567890"}
          nftOwner={{
            id: "",
            avatarUrl: "",
            firstName: "Angel",
            lastName: "Marenco",
            username: "jsmarenco"
          }}
        />
      </Box>
    </>
  )
}
