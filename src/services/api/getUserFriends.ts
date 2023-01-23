import { api, GET_USER_FRIENDS } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getUserFriendsService = async (userId: string, token: string, offset: number, limit: number) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }

    const url = GET_USER_FRIENDS.replace("%userId", userId).replace("%offset", String(offset)).replace("%limit", String(limit))
    console.log("🚀 ~ file: getUserFriends.ts:14 ~ getUserFriendsService ~ url", url)

    const { data, status } = await api.get(url, config)

    const newResponse: GlobalApiResponse = {
      message: data?.message,
      statusCode: status,
      success: true,
      data
    }

    return newResponse
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  catch (error: any) {
    console.log("🚀 ~ file: getUserFriends.ts:28 ~ getUserFriendsService ~ error", error)
    const { response } = error

    const newResponse: GlobalApiResponse = {
      message: response.data.message,
      statusCode: response.status,
      success: false
    }

    return newResponse
  }
}
export default getUserFriendsService
