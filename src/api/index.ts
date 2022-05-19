import {
  ApiResponse,
  Fetcher,
  Middleware,
  OpArgType,
  TypedFetch,
} from "openapi-typescript-fetch"

import { useFormsStore } from "~/stores/forms"

import { components, paths } from "./conduit"

const handleValidation = async <T>(
  operation: TypedFetch<T>,
  arg: OpArgType<T>
) => {
  try {
    return await operation(arg)
  } catch (e) {
    if (e instanceof operation.Error) {
      const error = e.getActualType()
      if (error.status === 400) {
        const formsStore = useFormsStore()

        formsStore.errors = error.data
      }
    }
  }
}

const authenticate: Middleware = async (url, init, next) => {
  const token = useLocalStorage("token", null)

  if (token.value) {
    init.headers.set("Authorization", `Token ${token.value}`)
  }
  const response = await next(url, init)
  return response
}

const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: import.meta.env.VITE_CONDUIT_API,
  use: [authenticate],
})

type Article = components["schemas"]["Article"]
type Profile = components["schemas"]["Profile"]
type Comment = components["schemas"]["Comment"]
type User = components["schemas"]["User"]
type ValidationProblemDetails =
  components["schemas"]["ValidationProblemDetails"]

const getArticles = fetcher.path("/articles").method("get").create()
const getArticlesFeed = fetcher.path("/articles/feed").method("get").create()
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
const login = fetcher.path("/users/login").method("post").create()
const register = fetcher.path("/users").method("post").create()
const getUser = fetcher.path("/user").method("get").create()
const updateUser = fetcher.path("/user").method("put").create()

export type { Article, Profile, Comment, User, ValidationProblemDetails }
export {
  handleValidation,
  getArticles,
  getArticlesFeed,
  getTags,
  getArticle,
  getComments,
  getProfile,
  login,
  register,
  getUser,
  updateUser,
}
