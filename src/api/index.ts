import { ApiResponse, Fetcher, TypedFetch } from "openapi-typescript-fetch"
import { Ref } from "vue"

import { components, paths } from "./conduit"

const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: import.meta.env.VITE_CONDUIT_API,
})

type Article = components["schemas"]["Article"]
type Profile = components["schemas"]["Profile"]
type Comment = components["schemas"]["Comment"]
type ValidationProblemDetails =
  components["schemas"]["ValidationProblemDetails"]

const getArticles = fetcher.path("/articles").method("get").create()
const getArticle = fetcher.path("/articles/{slug}").method("get").create()
const getProfile = fetcher
  .path("/profiles/celeb_{username}")
  .method("get")
  .create()
const getComments = fetcher
  .path("/articles/{slug}/comments")
  .method("get")
  .create()
const getTags = fetcher.path("/tags").method("get").create()
const register = fetcher.path("/users").method("post").create()

const handleValidation = async <T>(
  request: () => Promise<ApiResponse<T>>,
  errors: Ref<ValidationProblemDetails | undefined>
) => {
  try {
    return await request()
  } catch (e) {
    if (e instanceof register.Error) {
      const error = e.getActualType()
      if (error.status === 400) {
        errors.value = error.data
      }
    }
  }
}

export type { Article, Profile, Comment, ValidationProblemDetails }
export {
  handleValidation,
  getArticles,
  getTags,
  getArticle,
  getComments,
  getProfile,
  register,
}
