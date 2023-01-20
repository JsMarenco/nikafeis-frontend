import { api, GET_USER_BY_USERNAME_ROUTE, SEND_FRIEND_REQUEST_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const sendFriendRequestService = async (username: string, userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const url1 = GET_USER_BY_USERNAME_ROUTE.replace("%username", username)

    const user = await api.get(url1)

    const url = SEND_FRIEND_REQUEST_ROUTE.replace("%from", userId).replace("%to", user.data.id)

    const { data, status } = await api.post(url, config)

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

export default sendFriendRequestService
