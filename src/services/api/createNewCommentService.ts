import { api, CREATE_COMMENT_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const createNewCommentService = async (userId: string, token: string, postId: string) => {
  try {
    const form = document.getElementById("create-comment-form") as HTMLFormElement

    const formData = new FormData(form)

    const content = formData.get("contentInput")
    const comment_image_url = formData.get("comment_image_url")

    const newCommentInfo = {
      userId,
      content,
      postId,
      comment_image_url
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
    }

    const { data, status } = await api.post(CREATE_COMMENT_ROUTE, newCommentInfo, config)

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

export default createNewCommentService
