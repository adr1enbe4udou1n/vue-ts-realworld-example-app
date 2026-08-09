import { client } from "./client/client.gen"
import {
  createArticle as createArticleRequest,
  createArticleComment,
  createArticleFavorite,
  createUser,
  deleteArticle as deleteArticleRequest,
  deleteArticleComment,
  deleteArticleFavorite,
  followUserByUsername,
  getArticle as getArticleRequest,
  getArticleComments,
  getArticles as getArticlesRequest,
  getArticlesFeed as getArticlesFeedRequest,
  getCurrentUser,
  getProfileByUsername,
  getTags as getTagsRequest,
  login as loginRequest,
  unfollowUserByUsername,
  updateArticle as updateArticleRequest,
  updateCurrentUser,
} from "./client/sdk.gen"
import type {
  Article,
  Comment,
  HttpValidationProblemDetails as ValidationProblemDetails,
  LoginUser,
  NewArticle,
  NewComment,
  NewUser,
  Profile,
  UpdateArticle,
  UpdateUser,
  User,
} from "./client/types.gen"

client.setConfig({
  baseUrl: import.meta.env.VITE_CONDUIT_API || "/api",
})

client.interceptors.request.use((request) => {
  const token = useLocalStorage("token", null)

  if (token.value) {
    request.headers.set("Authorization", `Token ${token.value}`)
  }
  return request
})

type HandleValidation = (error: ValidationProblemDetails | undefined) => void

const handleResponseValidation = <T>(
  result: {
    data?: T
    error?: unknown
    response?: Response
  },
  handleValidation: HandleValidation,
) => {
  if (result.response?.status === 400) {
    handleValidation(result.error as ValidationProblemDetails)
    return null
  }

  return result.data!
}

const getArticles = (query: {
  author?: string
  favorited?: string
  tag?: string
  limit?: number
  offset?: number
}) => getArticlesRequest({ query })
const getArticlesFeed = (query: { limit?: number; offset?: number }) =>
  getArticlesFeedRequest({ query })
const getArticle = (slug: string) =>
  getArticleRequest({ path: { slug } }).then(({ data }) => data!.article)
const getProfile = (username: string) =>
  getProfileByUsername({ path: { username } }).then(({ data }) => data!.profile)
const followProfile = (username: string) =>
  followUserByUsername({ path: { username } }).then(({ data }) => data!.profile)
const unfollowProfile = (username: string) =>
  unfollowUserByUsername({ path: { username } }).then(
    ({ data }) => data!.profile,
  )
const getComments = (slug: string) =>
  getArticleComments({ path: { slug } }).then(({ data }) => data!.comments)
const login = (user: LoginUser, handleValidation: HandleValidation) =>
  loginRequest({ body: { user } }).then((result) => {
    const data = handleResponseValidation(result, handleValidation)
    return data?.user ?? null
  })
const register = (user: NewUser, handleValidation: HandleValidation) =>
  createUser({ body: { user } }).then((result) => {
    const data = handleResponseValidation(result, handleValidation)
    return data?.user ?? null
  })
const getUser = () => getCurrentUser().then(({ data }) => data!.user)
const updateUser = (user: UpdateUser, handleValidation: HandleValidation) =>
  updateCurrentUser({ body: { user } }).then((result) => {
    const data = handleResponseValidation(result, handleValidation)
    return data?.user ?? null
  })
const getTags = () => getTagsRequest().then(({ data }) => data!.tags)
const createArticle = (
  article: NewArticle,
  handleValidation: HandleValidation,
) =>
  createArticleRequest({ body: { article } }).then((result) => {
    const data = handleResponseValidation(result, handleValidation)
    return data?.article ?? null
  })
const updateArticle = (
  slug: string,
  article: UpdateArticle,
  handleValidation: HandleValidation,
) =>
  updateArticleRequest({ path: { slug }, body: { article } }).then((result) => {
    const data = handleResponseValidation(result, handleValidation)
    return data?.article ?? null
  })
const deleteArticle = (slug: string) => deleteArticleRequest({ path: { slug } })
const favoriteArticle = (slug: string) =>
  createArticleFavorite({ path: { slug } }).then(({ data }) => data!.article)
const unfavoriteArticle = (slug: string) =>
  deleteArticleFavorite({ path: { slug } }).then(({ data }) => data!.article)
const createComment = (
  slug: string,
  comment: NewComment,
  handleValidation: HandleValidation,
) =>
  createArticleComment({ path: { slug }, body: { comment } }).then((result) => {
    const data = handleResponseValidation(result, handleValidation)
    return data?.comment ?? null
  })
const deleteComment = (slug: string, commentId: number) =>
  deleteArticleComment({ path: { slug, commentId } })

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
