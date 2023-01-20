import { api, GET_POST_BY_USERNAME_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getPostsByUsernameService = async (username: string) => {
  try {
    const { data, status } = await api.get(GET_POST_BY_USERNAME_ROUTE.replace("%s", username))

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
export default getPostsByUsernameService
