import { api, UPDATE_USER_INFO } from "../../constants/api"
import { AccountSettingForm } from "../../constants/enums/accountSettings"
import GlobalApiResponse from "../../interface/globalApiResponse"
import { deleteSpacesAndReplaceWithUnderscore } from "../../utils/basic"

const updateAccountInfoService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById(AccountSettingForm.id) as HTMLFormElement

    const formData = new FormData(form)

    const firstName = formData.get(AccountSettingForm.firstName_input_name)
    const lastName = formData.get(AccountSettingForm.lastName_input_name)
    const username = formData.get(AccountSettingForm.username_input_name)
    const email = formData.get(AccountSettingForm.email_input_name)
    const website = formData.get(AccountSettingForm.website_input_name)
    const description = formData.get(AccountSettingForm.description_input_name)
    const password = formData.get(AccountSettingForm.password_input_name)

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
