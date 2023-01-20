import { api, UPDATE_USER_INFO } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"
import { deleteSpacesAndReplaceWithUnderscore } from "../../utils/basic"

const updateAccountInfoService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById("edit-account-form") as HTMLFormElement

    const formData = new FormData(form)

    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const username = formData.get("username")
    const email = formData.get("email")
    const website = formData.get("website")
    const description = formData.get("description")
    const password = formData.get("password")

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const newUserInfo = {
      firstName,
      lastName,
      username: deleteSpacesAndReplaceWithUnderscore(username as string),
      email,
      website,
      description,
      password,
    }

    const { data, status } = await api.put(UPDATE_USER_INFO.replace("%userId", userId), newUserInfo, config)

    const newResponse: GlobalApiResponse = {
      message: data.message,
      statusCode: status,
      success: true,
      data
    }

    return newResponse
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    const { response } = error

    const newResponse: GlobalApiResponse = {
      message: response.data.message,
      statusCode: response.status,
      success: false
    }

    return newResponse
  }
}

export default updateAccountInfoService
