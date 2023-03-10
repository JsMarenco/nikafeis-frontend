import { api, GET_USER_FRIEND_REQUESTS_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getUserFriendRequestsService = async (offset: number, limit: number, userId: string, token: string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const url = GET_USER_FRIEND_REQUESTS_ROUTE.replace("%s", userId).replace("%offset", String(offset)).replace("%limit", String(limit))

    const { data, status } = await api.get(url, config)

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

export default getUserFriendRequestsService
