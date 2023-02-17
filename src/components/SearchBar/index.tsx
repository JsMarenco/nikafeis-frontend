import React, { useEffect, useState } from "react"

// Third-party dependencies
import { useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { Box, Icon, InputBase } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import SearchIcon from "@mui/icons-material/Search"

// Current project dependencies
import { SearchBarForm } from "../../constants/enums/searchBar"
import { RootState } from "../../app/store"
import searchBarService from "../../services/api/searchBarService"
import { BasicUserInterface } from "../../interface/user"
import UserCard from "../Cards/BaseUserCard"
import inputStyles from "../../styles/components/input"

export default function SearchBar() {
  const state = useSelector((state: RootState) => state.user)
  const [userFounds, setUsersFounds] = useState<BasicUserInterface[]>([])
  const [searchValue, setSearchValue] = useState({ [SearchBarForm.search_bar_input_name]: "" })
  const location = useLocation()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value, })

    const { data } = await searchBarService(e.target.value, state.user.id, state.token)

    setUsersFounds(data)
  }

  useEffect(() => {
    setSearchValue({ [SearchBarForm.search_bar_input_name]: "" })
    setUsersFounds([])

  }, [location])

  return (
    <>
      <Box sx={{ maxWidth: "250px", width: "100%" }} component="form" id={SearchBarForm.id}>
        <InputBase
          id={SearchBarForm.search_bar_input_id}
          role={SearchBarForm.search_bar_input_role}
          name={SearchBarForm.search_bar_input_name}
          type={SearchBarForm.search_bar_input_type}
          value={searchValue[SearchBarForm.search_bar_input_name]}
          placeholder={SearchBarForm.search_bar_input_placeholder}
          autoComplete={SearchBarForm.autocomplete_inputs}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(e)}
          size={SearchBarForm.input_size}
          sx={{ ...inputStyles.input, py: 1, px: 3, }}
          startAdornment={<Icon sx={{ mr: 2 }}><SearchIcon /></Icon>}
          endAdornment={
            searchValue[SearchBarForm.search_bar_input_name] && (
              <Icon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  setSearchValue({ [SearchBarForm.search_bar_input_name]: "" })
                  setUsersFounds([])
                }}
              >
                <CloseIcon />
              </Icon>
            )
          }
        />

        {
          userFounds.length !== 0 && (
            <Box
              sx={{
                bgcolor: "background.default",
                borderRadius: "15px",
                p: 1,
                position: "absolute",
                top: 65,
                zIndex: 10,
                width: "100%",
                maxWidth: "450px",
                left: { xs: 0, sm: "auto" },
                boxShadow: 7,
                maxHeight: "250px",
                overflowY: "auto"
              }}
            >
              {
                userFounds.map((user) => (
                  <Box key={user.id} sx={{ my: 0.5 }} >
                    <UserCard
                      id={user.id}
                      avatarUrl={user.avatarUrl}
                      firstName={user.firstName}
                      lastName={user.lastName}
                      username={user.username}
                    />
                  </Box>
                ))
              }
            </Box>

          )
        }
      </Box>
    </>
  )
}
