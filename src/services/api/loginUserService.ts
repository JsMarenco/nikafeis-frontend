import { api, LOGIN_API_ROUTE } from "../../constants/api"
import { LoginForm } from "../../constants/enums/login"
import GlobalApiResponse from "../../interface/globalApiResponse"

const loginUserService = async () => {
  try {
    const form = document.getElementById(LoginForm.id) as HTMLFormElement
    const formData = new FormData(form)
    const email = formData.get(LoginForm.email_input_name)
    const password = formData.get(LoginForm.password_input_name)

    const loginUserInfo = { email, password, }

    const { data, status } = await api.post(LOGIN_API_ROUTE, loginUserInfo)

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

export default loginUserService
