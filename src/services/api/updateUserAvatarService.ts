import { api, UPDATE_USER_AVATAR } from "../../constants/api"
import { AvatarForm } from "../../constants/enums/avatar"
import GlobalApiResponse from "../../interface/globalApiResponse"

const updateUserAvatarService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById(AvatarForm.id) as HTMLFormElement

    const formData = new FormData(form)

    const avatar = formData.get(AvatarForm.avatar_input_file_name)
    const newAvatarInfo = { user_avatar: avatar, }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = UPDATE_USER_AVATAR.replace("%userId", userId)

    const { data, status } = await api.put(url, newAvatarInfo, config)

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

export default updateUserAvatarService
