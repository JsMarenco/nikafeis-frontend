import { api, UPDATE_POST_ROUTE } from "../../constants/api"
import { UpdatePostForm } from "../../constants/enums/updatePost"
import GlobalApiResponse from "../../interface/globalApiResponse"

const updatePostService = async (userId: string, postId: string, token: string) => {
  try {
    const form = document.getElementById(UpdatePostForm.id) as HTMLFormElement

    const formData = new FormData(form)

    const title = formData.get(UpdatePostForm.title_updated_input_name)
    const content = formData.get(UpdatePostForm.content_updated_input_name)

    const postInfoUpdated = {
      title,
      userId,
      content
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    const { data, status } = await api.put(`${UPDATE_POST_ROUTE}/${postId}`, postInfoUpdated, config)

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

export default updatePostService
