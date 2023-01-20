import { api, REGISTER_USER_ROUTE } from "../../constants/api"
import { RegisterForm } from "../../constants/enums/register"
import GlobalApiResponse from "../../interface/globalApiResponse"

const registerNewUserService = async () => {
  try {
    const form = document.getElementById(RegisterForm.id) as HTMLFormElement

    const formData = new FormData(form)

    const firstName = formData.get(RegisterForm.firstName_input_name)
    const lastName = formData.get(RegisterForm.lastName_input_name)
    const email = formData.get(RegisterForm.email_input_name)
    const password = formData.get(RegisterForm.password_input_name)
    const passwordConfirmation = formData.get(RegisterForm.confirmPassword_input_name)

    const newUserInfo = {
      firstName,
      lastName,
      email,
      password,
      passwordConfirmation,
    }

    const { data, status } = await api.post(REGISTER_USER_ROUTE, newUserInfo)

    const newResponse: GlobalApiResponse = {
      message: data.message,
      statusCode: status,
      success: true
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

export default registerNewUserService
