import { Fetcher } from "openapi-typescript-fetch"

import { paths, components } from "./conduit"

const fetcher = Fetcher.for<paths>()

fetcher.configure({
  baseUrl: import.meta.env.VITE_CONDUIT_API,
})

type Article = components["schemas"]["Article"]
type Profile = components["schemas"]["Profile"]

const getArticles = fetcher.path("/articles").method("get").create()
const getTags = fetcher.path("/tags").method("get").create()

export type { Article, Profile }
export { getArticles, getTags }
