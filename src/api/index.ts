import createClient, { type Middleware } from "openapi-fetch"

import type { components, paths } from "./conduit"

const authenticate: Middleware = {
  async onRequest({ request }) {
    const token = useLocalStorage("token", null)

    if (token.value) {
      request.headers.set("Authorization", `Token ${token.value}`)
    }
    return request
  },
}

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_CONDUIT_API || "/api",
})

client.use(authenticate)

type HandleValidation = (error: ValidationProblemDetails | undefined) => void
type Article = components["schemas"]["Article"]
type Profile = components["schemas"]["Profile"]
type Comment = components["schemas"]["Comment"]
type User = components["schemas"]["User"]
type LoginUser = components["schemas"]["LoginUser"]
type NewUser = components["schemas"]["NewUser"]
type UpdateUser = components["schemas"]["UpdateUser"]
type NewArticle = components["schemas"]["NewArticle"]
type UpdateArticle = components["schemas"]["UpdateArticle"]
type NewComment = components["schemas"]["NewComment"]
type ValidationProblemDetails =
  components["schemas"]["HttpValidationProblemDetails"]

const getArticles = (query: {
  author?: string
  favorited?: string
  tag?: string
  limit?: number
  offset?: number
}) => client.GET("/articles", { params: { query } })
const getArticlesFeed = (query: { limit?: number; offset?: number }) =>
  client.GET("/articles/feed", { params: { query } })
const getArticle = (slug: string) =>
  client
    .GET("/articles/{slug}", {
      params: { path: { slug } },
    })
    .then(({ data }) => data!.article)
const getProfile = (username: string) =>
  client
    .GET("/profiles/{username}", {
      params: { path: { username } },
    })
    .then(({ data }) => data!.profile)
const followProfile = (username: string) =>
  client
    .POST("/profiles/{username}/follow", {
      params: { path: { username } },
    })
    .then(({ data }) => data!.profile)
const unfollowProfile = (username: string) =>
  client
    .DELETE("/profiles/{username}/follow", {
      params: { path: { username } },
    })
    .then(({ data }) => data!.profile)
const getComments = (slug: string) =>
  client
    .GET("/articles/{slug}/comments", {
      params: { path: { slug } },
    })
    .then(({ data }) => data!.comments)
const login = (user: LoginUser, handleValidation: HandleValidation) =>
  client
    .POST("/users/login", { body: { user } })
    .then(async ({ data, response, error }) => {
      if (response.status === 400) {
        handleValidation(error)
        return null
      }

      return data!.user
    })
const register = (user: NewUser, handleValidation: HandleValidation) =>
  client
    .POST("/users", { body: { user } })
    .then(async ({ data, response, error }) => {
      if (response.status === 400) {
        handleValidation(error)
        return null
      }

      return data!.user
    })
const getUser = () => client.GET("/user").then(({ data }) => data!.user)
const updateUser = (user: UpdateUser, handleValidation: HandleValidation) =>
  client
    .PUT("/user", { body: { user } })
    .then(async ({ data, response, error }) => {
      if (response.status === 400) {
        handleValidation(error)
        return null
      }

      return data!.user
    })
const getTags = () => client.GET("/tags").then(({ data }) => data!.tags)
const createArticle = (
  article: NewArticle,
  handleValidation: HandleValidation,
) =>
  client
    .POST("/articles", { body: { article } })
    .then(async ({ data, response, error }) => {
      if (response.status === 400) {
        handleValidation(error)
        return null
      }

      return data!.article
    })
const updateArticle = (
  slug: string,
  article: UpdateArticle,
  handleValidation: HandleValidation,
) =>
  client
    .PUT("/articles/{slug}", {
      params: { path: { slug } },
      body: { article },
    })
    .then(async ({ data, response, error }) => {
      if (response.status === 400) {
        handleValidation(error)
        return null
      }

      return data!.article
    })
const deleteArticle = (slug: string) =>
  client.DELETE("/articles/{slug}", {
    params: { path: { slug } },
  })
const favoriteArticle = (slug: string) =>
  client
    .POST("/articles/{slug}/favorite", {
      params: { path: { slug } },
    })
    .then(({ data }) => data!.article)
const unfavoriteArticle = (slug: string) =>
  client
    .DELETE("/articles/{slug}/favorite", {
      params: { path: { slug } },
    })
    .then(({ data }) => data!.article)
const createComment = (
  slug: string,
  comment: NewComment,
  handleValidation: HandleValidation,
) =>
  client
    .POST("/articles/{slug}/comments", {
      params: { path: { slug } },
      body: { comment },
    })
    .then(async ({ data, response, error }) => {
      if (response.status === 400) {
        handleValidation(error)
        return null
      }

      return data!.comment
    })
const deleteComment = (slug: string, commentId: number) =>
  client.DELETE("/articles/{slug}/comments/{commentId}", {
    params: { path: { slug, commentId } },
  })

const favoriteArticleToggle = async (article: Article) => {
  if (article.favorited) {
    await unfavoriteArticle(article.slug)
    return
  }
  await favoriteArticle(article.slug)
}

const followProfileToggle = async (profile: Profile) => {
  if (profile.following) {
    await unfollowProfile(profile.username)
    return
  }
  await followProfile(profile.username)
}

export type {
  Article,
  Profile,
  Comment,
  User,
  ValidationProblemDetails,
  HandleValidation,
}
export {
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
  createArticle,
  updateArticle,
  deleteArticle,
  createComment,
  deleteComment,
  favoriteArticleToggle,
  followProfileToggle,
}
