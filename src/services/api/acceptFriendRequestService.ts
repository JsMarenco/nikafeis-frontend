import { ACCEPT_FRIEND_REQUEST_ROUTE, api } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const acceptFriendRequestService = async (friendRequestId: string, userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const url = ACCEPT_FRIEND_REQUEST_ROUTE.replace("%to", userId).replace("%friendRequestId", friendRequestId)

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

export default acceptFriendRequestService
