import { api, REMOVE_FRIEND_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const removeFriendService = async (userId: string, friendId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const url = REMOVE_FRIEND_ROUTE.replace("%u", userId).replace("%f", friendId)

    const { data, status } = await api.delete(url, config)

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

export default removeFriendService
