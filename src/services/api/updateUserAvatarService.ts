import { api } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const updateUserAvatarService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById("edit-avatar-form") as HTMLFormElement

    const formData = new FormData(form)

    const avatar = formData.get("user_avatar")
    const password = formData.get("password")

    const newAvatarInfo = {
      user_avatar: avatar,
      password,
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const { data, status } = await api.put(`${"users"}/${userId}`, newAvatarInfo, config)

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
