import { api, LIKE_POST_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const likePostService = async (userId: string, token: string, postId: string) => {
  try {
    const userInfo = {
      userId,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    const { data, status } = await api.post(LIKE_POST_ROUTE.replace("%s", postId), userInfo, config)

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

export default likePostService
