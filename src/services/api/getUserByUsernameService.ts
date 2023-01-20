import GlobalApiResponse from "../../interface/globalApiResponse"
import { api, GET_USER_BY_USERNAME_ROUTE } from "../../constants/api"

const getUserByUsernameService = async (username: string) => {
  try {
    const url = GET_USER_BY_USERNAME_ROUTE.replace("%username", username)

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

export default getUserByUsernameService
