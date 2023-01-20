import { api, GET_RECENT_POSTS } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getRecentPostsService = async (offset: number, limit: number) => {
  try {
    const url = GET_RECENT_POSTS.replace("%o", String(offset)).replace("%l", String(limit))

    const { data, status } = await api.get(url)

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
export default getRecentPostsService
