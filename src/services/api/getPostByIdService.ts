import { api, GET_POST_BY_ID_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getPostByIdService = async (postId: string) => {
  try {
    const url = GET_POST_BY_ID_ROUTE.replace("%postId", postId)

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

export default getPostByIdService
