import { api, CREATE_POST_ROUTE } from "../../constants/api"
import GlobalApiResponse from "../../interface/globalApiResponse"

const createNewPostService = async (userId: string, token: string) => {
  try {
    const form = document.getElementById("create-post-form") as HTMLFormElement
    const formData = new FormData(form)

    const title = formData.get("titleInput")
    const content = formData.get("contentInput")
    const post_images = formData.get("post_images")

    // process the images array as needed
    const newPostInfo = {
      userId,
      title,
      content,
      token,
      post_images
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }

    const { data, status } = await api.post(CREATE_POST_ROUTE, newPostInfo, config)

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

export default createNewPostService
