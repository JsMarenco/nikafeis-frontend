// getFriendRequestInfoService
import { api, GET_FRIEND_REQUEST_INFO_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getFriendRequestInfoService = async (userId: string, anotherUserId: string, token: string,) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }

    const url = GET_FRIEND_REQUEST_INFO_ROUTE.replace("%from", userId).replace("%to", anotherUserId)

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
      message: response.data?.message,
      statusCode: response.status,
      success: false
    }

    return newResponse
  }
}
export default getFriendRequestInfoService
