import { api } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getCommentsByIdServices = async (
  userId: string,
  token: string,
  postId: string,
  offset: number,
  limit: number
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        contentType: "application/json",
      },
    }

    const { data, status } = await api.get(`${"/comments"}/${postId}/${offset}/${limit}`, config)

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
export default getCommentsByIdServices
