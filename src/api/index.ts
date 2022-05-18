import { Fetcher } from "openapi-typescript-fetch"

import { components, paths } from "./conduit"

const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: import.meta.env.VITE_CONDUIT_API,
})

type Article = components["schemas"]["Article"]
type Profile = components["schemas"]["Profile"]
type Comment = components["schemas"]["Comment"]

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

export type { Article, Profile, Comment }
export { getArticles, getTags, getArticle, getComments, getProfile }
