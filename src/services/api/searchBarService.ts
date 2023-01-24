import { api, SEARCH_BAR_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const searchBarService = async (value: string, userId: string, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const url = SEARCH_BAR_ROUTE.replace("%userId", userId).replace("%user_name", value)

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
      message: response.data.message,
      statusCode: response.status,
      success: false
    }

    return newResponse
  }
}

export default searchBarService
