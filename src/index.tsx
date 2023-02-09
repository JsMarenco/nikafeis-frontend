import React from "react"

// Third-party dependencies
import { createRoot } from "react-dom/client"
import { Route, Routes, Navigate } from "react-router-dom"

// Imports from the current project
import "./styles/index.css"
import { MessageProvider } from "./context/MessageContext"
import Login from "./views/Login"
import Register from "./views/Register"
import Home from "./views/Home"
import Profile from "./views/Profile"
import Logout from "./views/Logout"
import UserNotFound from "./components/UserNotFound"
import ErrorPage from "./views/ErrorPage"
import Settings from "./views/Settings"
import GlobalComponent from "./context/GlobalComponent"
import Connections from "./views/Connections"
import FriendsSection from "./components/FriendsSection"
import ResetPassword from "./views/ResetPassword"
import Inbox from "./views/Inbox"
import AccountSettings from "./components/SettingsSections/AccountSettings"
import ProfileSettings from "./components/SettingsSections/ProfileSettings"
import FriendRequestReceive from "./components/FriendRequestReceive"
import SocialSettings from "./components/SettingsSections/Social"
import AppRoutes from "./constants/app/routes"
import Marketplace from "./components/Marketplace"
import NftDetails from "./components/NftDetails"
import Header from "components/Header"
import Container from "@mui/material/Container"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

const Main = () => {
  return (
    <MessageProvider>
      <GlobalComponent>
        <Header />

        <Container maxWidth="xl">
          <Routes>
            <Route path={"/"} element={<Navigate to={AppRoutes.home} />} />

            <Route path={AppRoutes.login} element={<Login />} />
            <Route path={AppRoutes.register} element={<Register />} />
            <Route path={AppRoutes.resetPassword} element={<ResetPassword />} />

            <Route path={AppRoutes.home} element={<Home />} />
            <Route path={`${AppRoutes.profile}/:the_username`} element={<Profile />} />
            <Route path={AppRoutes.newConnections} element={<Connections />} />
            <Route path={AppRoutes.friends} element={<FriendsSection />}>
              <Route path={AppRoutes.friendsRequests} element={<FriendRequestReceive variant="large" />} />
            </Route>

            <Route path={AppRoutes.marketplace} element={<Marketplace />} />

            <Route path={AppRoutes.settings} element={<Settings />} >
              <Route path={AppRoutes.accountSettings} element={<AccountSettings />} />
              <Route path={AppRoutes.profileSettings} element={<ProfileSettings />} />
              <Route path={AppRoutes.socialAccountsSettings} element={<SocialSettings />} />
            </Route>

            <Route path={`${AppRoutes.viewNft.replace("%id", ":nftId")}`} element={<NftDetails />} />

            {/* <Route path={AppRoutes.home} element={<Home />} >

        </Route> */}

            <Route path={AppRoutes.inbox} element={<Inbox />} />

            <Route path={AppRoutes.logout} element={<Logout />} />
            <Route path={AppRoutes.userNotFound} element={<UserNotFound />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Container>
      </GlobalComponent>
    </MessageProvider>
  )
}

root.render(
  <Main />
)
