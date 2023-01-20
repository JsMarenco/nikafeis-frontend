// rejectFriendRequestService
import { api, REJECT_FRIEND_REQUEST_ROUTE, } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const rejectFriendRequestService = async (userId: string, requestId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const url = REJECT_FRIEND_REQUEST_ROUTE.replace("%to", userId).replace("%requestId", requestId)

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

export default rejectFriendRequestService
