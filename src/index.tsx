import React from "react"
import { createRoot } from "react-dom/client"
import { Route, Routes } from "react-router-dom"

// Imports from the current project
import "./styles/index.css"
import { ACCOUNT_SETTINGS_ROUTE, FRIENDS_SECTION_ROUTE, HOME_ROUTE, INBOX_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE, NEW_CONNECTIONS_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE, RESET_PASSWORD, USER_NOT_FOUND_ROUTE } from "./constants/routes"
import { MessageProvider } from "./context/MessageContext"
import Login from "./views/Login"
import Register from "./views/Register"
import Home from "./views/Home"
import Profile from "./views/Profile"
import Logout from "./views/Logout"
import UserNotFound from "./components/UserNotFound"
import ErrorPage from "./views/ErrorPage"
import AccountSettings from "./views/AccountSettings"
import GlobalComponent from "./context/GlobalComponent"
import Connections from "./views/Connections"
import HomeSection from "./components/Sections/HomeSection"
import FriendsSection from "./components/FriendsSection"
import ResetPassword from "./views/ResetPassword"
import Inbox from "./views/Inbox"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
  <MessageProvider>
    <GlobalComponent>
      <Routes>
        <Route path={LOGIN_ROUTE} element={<Login />} />
        <Route path={REGISTER_ROUTE} element={<Register />} />
        <Route path={RESET_PASSWORD} element={<ResetPassword />} />

        <Route path={HOME_ROUTE} element={<Home />} >
          <Route path={""} element={<HomeSection />} />
          <Route path={`${PROFILE_ROUTE}/:the_username`} element={<Profile />} />
          <Route path={FRIENDS_SECTION_ROUTE} element={<FriendsSection />} />
          <Route path={NEW_CONNECTIONS_ROUTE} element={<Connections />} />
          <Route path={ACCOUNT_SETTINGS_ROUTE} element={<AccountSettings />} />
        </Route>

        <Route path={INBOX_ROUTE} element={<Inbox />} />

        <Route path={LOGOUT_ROUTE} element={<Logout />} />
        <Route path={USER_NOT_FOUND_ROUTE} element={<UserNotFound />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </GlobalComponent>
  </MessageProvider >
)
