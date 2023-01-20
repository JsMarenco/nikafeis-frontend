import { api, GET_USER_FRIEND_REQUESTS_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getUserFriendRequestsService = async (userId: string, token: string) => {
  try {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token}`
      }
    }

    const { data, status } = await api.get(GET_USER_FRIEND_REQUESTS_ROUTE.replace("%s", userId), config)

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
