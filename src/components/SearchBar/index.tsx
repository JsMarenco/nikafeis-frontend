import { Box, Icon, InputBase } from "@mui/material"
import React, { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import UserCard from "../Cards/BaseUserCard"
import { BasicUserInterface } from "../../interface/user"
import { input } from "../../styles/inputs"

export default function SearchBar() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<BasicUserInterface[]>([])
  const [searchValue, setSearchValue] = useState("")

  const handleSubmit = () => {
    setLoading(true)

    // setUsers([{
    //   id: "ljd",
    //   firstName: "pablo",
    //   lastName: "MMm",
    //   avatarUrl: "",
    //   username: "jksdnhjd"
    // }])

    setSearchValue("")
    setLoading(false)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  return (
    <>
      <Box sx={{ maxWidth: "250px" }}>
        <InputBase
          startAdornment={
            <Icon sx={{ mr: 2, cursor: "pointer" }} onClick={handleSubmit}>
              <SearchIcon />
            </Icon>
          }
          size="medium"
          placeholder="Search in Nikafeis"
          sx={{ ...input, py: 1, px: 3, }}
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
          disabled={loading}
        />
      </Box>

      {
        users.map((user) => (
          <Box key={user.id}>
            <UserCard
              firstName={user.firstName}
              lastName={user.lastName}
              avatarUrl={user.avatarUrl}
              id={user.id}
              username={user.username}
            />
          </Box>
        ))
      }
    </>
  )
}
