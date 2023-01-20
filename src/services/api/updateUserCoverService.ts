import { api } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const updateUserCoverService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById("edit-cover-form") as HTMLFormElement

    const formData = new FormData(form)

    const avatar = formData.get("user_cover")
    const password = formData.get("password")

    const newCoverInfo = {
      user_cover: avatar,
      password,
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const { data, status } = await api.put(`${"users"}/${userId}`, newCoverInfo, config)

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

export default updateUserCoverService
