import { api, UPDATE_USER_COVER } from "../../constants/api"
import { CoverForm } from "../../constants/enums/cover"
import GlobalApiResponse from "../../interface/globalApiResponse"

const updateUserCoverService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById(CoverForm.id) as HTMLFormElement

    const formData = new FormData(form)

    const cover = formData.get(CoverForm.cover_input_file_name)
    const newCoverInfo = { user_cover: cover }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = UPDATE_USER_COVER.replace("%userId", userId)

    const { data, status } = await api.put(url, newCoverInfo, config)

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
