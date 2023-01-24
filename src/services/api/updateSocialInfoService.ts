import { api, UPDATE_USER_INFO } from "../../constants/api"
import { SocialSettingsForm } from "../../constants/enums/socialSettings"
import GlobalApiResponse from "../../interface/globalApiResponse"

const updateSocialInfoService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById(SocialSettingsForm.id) as HTMLFormElement

    const formData = new FormData(form)

    const facebook_link = formData.get(SocialSettingsForm.facebook_input_name)
    const github_link = formData.get(SocialSettingsForm.github_input_name)
    const linkedin_link = formData.get(SocialSettingsForm.linkedin_input_name)
    const twitter_link = formData.get(SocialSettingsForm.twitter_input_name)
    const instagram_link = formData.get(SocialSettingsForm.instagram_input_name)
    const password = formData.get(SocialSettingsForm.password_input_name)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const newUserInfo = {
      facebook_link,
      github_link,
      linkedin_link,
      twitter_link,
      instagram_link,
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

export default updateSocialInfoService
