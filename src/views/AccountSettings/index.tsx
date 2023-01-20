import React, { useEffect, } from "react"
import { Divider, } from "@mui/material"
import { changeTitle } from "../../utils/basic"
import EditAvatarOrCover from "../../components/EditAvatarOrCover"
import EditAccountInfo from "../../components/EditAccountInfo"
import { ACCOUNT_SETTINGS } from "../../constants/titles"

export default function AccountSettings() {
  useEffect(() => { changeTitle(ACCOUNT_SETTINGS) }, [])

  return (
    <>
      <EditAvatarOrCover title="avatar" />

      <Divider sx={{ m: 3 }} />

      <EditAvatarOrCover
        title="cover"
      />

      <Divider sx={{ m: 3 }} />

      <EditAccountInfo />

      <Divider sx={{ m: 3 }} />

      {/* <DeleteAccount /> */}
    </>
  )
}
