// getUerConnectionsService
import { api, GET_USER_CONNECTIONS } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const getUerConnectionsService = async (userId: string, offset: number, limit: number) => {
  try {
    const url = GET_USER_CONNECTIONS.replace("%u", userId).replace("%o", String(offset)).replace("%l", String(limit))

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
export default getUerConnectionsService
