/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/articles": {
    /**
     * Get recent articles globally
     * @description Get most recent articles globally. Use query parameters to filter results. Auth is optional
     */
    get: operations["GetArticles"]
    /**
     * Create an article
     * @description Create an article. Auth is required
     */
    post: operations["CreateArticle"]
  }
  "/articles/feed": {
    /**
     * Get recent articles from users you follow
     * @description Get most recent articles from users you follow. Use query parameters to limit. Auth is required
     */
    get: operations["GetArticlesFeed"]
  }
  "/articles/{slug}": {
    /**
     * Get an article
     * @description Get an article. Auth not required
     */
    get: operations["GetArticle"]
    /**
     * Update an article
     * @description Update an article. Auth is required
     */
    put: operations["UpdateArticle"]
    /**
     * Delete an article
     * @description Delete an article. Auth is required
     */
    delete: operations["DeleteArticle"]
  }
  "/articles/{slug}/comments": {
    /**
     * Get comments for an article
     * @description Get the comments for an article. Auth is optional
     */
    get: operations["GetArticleComments"]
    /**
     * Create a comment for an article
     * @description Create a comment for an article. Auth is required
     */
    post: operations["CreateArticleComment"]
  }
  "/articles/{slug}/comments/{commentId}": {
    /**
     * Delete a comment for an article
     * @description Delete a comment for an article. Auth is required
     */
    delete: operations["DeleteArticleComment"]
  }
  "/articles/{slug}/favorite": {
    /**
     * Favorite an article
     * @description Favorite an article. Auth is required
     */
    post: operations["CreateArticleFavorite"]
    /**
     * Unfavorite an article
     * @description Unfavorite an article. Auth is required
     */
    delete: operations["DeleteArticleFavorite"]
  }
  "/profiles/celeb_{username}": {
    /**
     * Get a profile
     * @description Get a profile of a user of the system. Auth is optional
     */
    get: operations["GetProfileByUsername"]
  }
  "/profiles/celeb_{username}/follow": {
    /**
     * Follow a user
     * @description Follow a user by username
     */
    post: operations["FollowUserByUsername"]
    /**
     * Unfollow a user
     * @description Unfollow a user by username
     */
    delete: operations["UnfollowUserByUsername"]
  }
  "/tags": {
    /**
     * Get tags
     * @description Get tags. Auth not required
     */
    get: operations["GetTags"]
  }
  "/user": {
    /**
     * Get current user
     * @description Gets the currently logged-in user
     */
    get: operations["GetCurrentUser"]
    /**
     * Update current user
     * @description Updated user information for current user
     */
    put: operations["UpdateCurrentUser"]
  }
  "/users": {
    /**
     * Register a new user
     * @description Register a new user
     */
    post: operations["CreateUser"]
  }
  "/users/login": {
    /**
     * Existing user login
     * @description Login for existing user
     */
    post: operations["Login"]
  }
}

export interface components {
  schemas: {
    Article: {
      title: string
      slug: string
      description: string
      body: string
      /** Format: date-time */
      createdAt: string
      /** Format: date-time */
      updatedAt: string
      tagList: string[]
      author: components["schemas"]["Profile"]
      favorited: boolean
      /** Format: int32 */
      favoritesCount: number
    }
    Comment: {
      /** Format: int32 */
      id: number
      body: string
      /** Format: date-time */
      createdAt: string
      /** Format: date-time */
      updatedAt: string
      author: components["schemas"]["Profile"]
    }
    LoginUser: {
      email: string
      password: string
    }
    LoginUserRequest: {
      user: components["schemas"]["LoginUser"]
    }
    MultipleArticlesResponse: {
      articles: components["schemas"]["Article"][]
      /** Format: int32 */
      articlesCount: number
    }
    MultipleCommentsResponse: {
      comments: components["schemas"]["Comment"][]
    }
    NewArticle: {
      title: string
      description: string
      body: string
      tagList?: string[] | null
    }
    NewArticleRequest: {
      article: components["schemas"]["NewArticle"]
    }
    NewComment: {
      body: string
    }
    NewCommentRequest: {
      comment: components["schemas"]["NewComment"]
    }
    NewUser: {
      email: string
      password: string
      username: string
    }
    NewUserRequest: {
      user: components["schemas"]["NewUser"]
    }
    Profile: {
      username: string
      bio: string
      image: string
      following: boolean
    }
    ProfileResponse: {
      profile: components["schemas"]["Profile"]
    }
    SingleArticleResponse: {
      article: components["schemas"]["Article"]
    }
    SingleCommentResponse: {
      comment: components["schemas"]["Comment"]
    }
    TagsResponse: {
      tags: string[]
    }
    UpdateArticle: {
      title?: string | null
      description?: string | null
      body?: string | null
    }
    UpdateArticleRequest: {
      article: components["schemas"]["UpdateArticle"]
    }
    UpdateUser: {
      username?: string | null
      email?: string | null
      bio?: string | null
      image?: string | null
    }
    UpdateUserRequest: {
      user: components["schemas"]["UpdateUser"]
    }
    User: {
      email: string
      username: string
      bio: string
      image: string
      token: string
    }
    UserResponse: {
      user: components["schemas"]["User"]
    }
    ValidationProblemDetails: {
      type?: string | null
      title?: string | null
      /** Format: int32 */
      status?: number | null
      detail?: string | null
      instance?: string | null
      errors: {
        [key: string]: string[] | undefined
      }
      [key: string]: unknown | undefined
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type external = Record<string, never>

export interface operations {
  GetArticles: {
    /**
     * Get recent articles globally
     * @description Get most recent articles globally. Use query parameters to filter results. Auth is optional
     */
    parameters?: {
      /** @description Filter by author (username) */
      /** @description Filter by favorites of a user (username) */
      /** @description Filter by tag */
      /** @description Limit number of articles returned (default is 20) */
      /** @description Offset/skip number of articles (default is 0) */
      query?: {
        author?: string
        favorited?: string
        tag?: string
        limit?: number
        offset?: number
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["MultipleArticlesResponse"]
          "application/json": components["schemas"]["MultipleArticlesResponse"]
          "text/json": components["schemas"]["MultipleArticlesResponse"]
        }
      }
    }
  }
  CreateArticle: {
    /**
     * Create an article
     * @description Create an article. Auth is required
     */
    /** @description Article to create */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["NewArticleRequest"]
        "text/json": components["schemas"]["NewArticleRequest"]
        "application/*+json": components["schemas"]["NewArticleRequest"]
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["SingleArticleResponse"]
          "application/json": components["schemas"]["SingleArticleResponse"]
          "text/json": components["schemas"]["SingleArticleResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          "text/plain": components["schemas"]["ValidationProblemDetails"]
          "application/json": components["schemas"]["ValidationProblemDetails"]
          "text/json": components["schemas"]["ValidationProblemDetails"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  GetArticlesFeed: {
    /**
     * Get recent articles from users you follow
     * @description Get most recent articles from users you follow. Use query parameters to limit. Auth is required
     */
    parameters?: {
      /** @description Limit number of articles returned (default is 20) */
      /** @description Offset/skip number of articles (default is 0) */
      query?: {
        limit?: number
        offset?: number
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["MultipleArticlesResponse"]
          "application/json": components["schemas"]["MultipleArticlesResponse"]
          "text/json": components["schemas"]["MultipleArticlesResponse"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  GetArticle: {
    /**
     * Get an article
     * @description Get an article. Auth not required
     */
    parameters: {
      /** @description Slug of the article to get */
      path: {
        slug: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["SingleArticleResponse"]
          "application/json": components["schemas"]["SingleArticleResponse"]
          "text/json": components["schemas"]["SingleArticleResponse"]
        }
      }
    }
  }
  UpdateArticle: {
    /**
     * Update an article
     * @description Update an article. Auth is required
     */
    parameters: {
      /** @description Slug of the article to update */
      path: {
        slug: string
      }
    }
    /** @description Article to update */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UpdateArticleRequest"]
        "text/json": components["schemas"]["UpdateArticleRequest"]
        "application/*+json": components["schemas"]["UpdateArticleRequest"]
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["SingleArticleResponse"]
          "application/json": components["schemas"]["SingleArticleResponse"]
          "text/json": components["schemas"]["SingleArticleResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          "text/plain": components["schemas"]["ValidationProblemDetails"]
          "application/json": components["schemas"]["ValidationProblemDetails"]
          "text/json": components["schemas"]["ValidationProblemDetails"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  DeleteArticle: {
    /**
     * Delete an article
     * @description Delete an article. Auth is required
     */
    parameters: {
      /** @description Slug of the article to delete */
      path: {
        slug: string
      }
    }
    responses: {
      /** @description Success */
      200: never
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  GetArticleComments: {
    /**
     * Get comments for an article
     * @description Get the comments for an article. Auth is optional
     */
    parameters: {
      /** @description Slug of the article that you want to get comments for */
      path: {
        slug: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["MultipleCommentsResponse"]
          "application/json": components["schemas"]["MultipleCommentsResponse"]
          "text/json": components["schemas"]["MultipleCommentsResponse"]
        }
      }
    }
  }
  CreateArticleComment: {
    /**
     * Create a comment for an article
     * @description Create a comment for an article. Auth is required
     */
    parameters: {
      /** @description Slug of the article that you want to create a comment for */
      path: {
        slug: string
      }
    }
    /** @description Comment you want to create */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["NewCommentRequest"]
        "text/json": components["schemas"]["NewCommentRequest"]
        "application/*+json": components["schemas"]["NewCommentRequest"]
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["SingleCommentResponse"]
          "application/json": components["schemas"]["SingleCommentResponse"]
          "text/json": components["schemas"]["SingleCommentResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          "text/plain": components["schemas"]["ValidationProblemDetails"]
          "application/json": components["schemas"]["ValidationProblemDetails"]
          "text/json": components["schemas"]["ValidationProblemDetails"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  DeleteArticleComment: {
    /**
     * Delete a comment for an article
     * @description Delete a comment for an article. Auth is required
     */
    parameters: {
      /** @description Slug of the article that you want to delete a comment for */
      /** @description ID of the comment you want to delete */
      path: {
        slug: string
        commentId: number
      }
    }
    responses: {
      /** @description Success */
      200: never
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  CreateArticleFavorite: {
    /**
     * Favorite an article
     * @description Favorite an article. Auth is required
     */
    parameters: {
      /** @description Slug of the article that you want to favorite */
      path: {
        slug: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["SingleArticleResponse"]
          "application/json": components["schemas"]["SingleArticleResponse"]
          "text/json": components["schemas"]["SingleArticleResponse"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  DeleteArticleFavorite: {
    /**
     * Unfavorite an article
     * @description Unfavorite an article. Auth is required
     */
    parameters: {
      /** @description Slug of the article that you want to unfavorite */
      path: {
        slug: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["SingleArticleResponse"]
          "application/json": components["schemas"]["SingleArticleResponse"]
          "text/json": components["schemas"]["SingleArticleResponse"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  GetProfileByUsername: {
    /**
     * Get a profile
     * @description Get a profile of a user of the system. Auth is optional
     */
    parameters: {
      /** @description Username of the profile to get */
      path: {
        username: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["ProfileResponse"]
          "application/json": components["schemas"]["ProfileResponse"]
          "text/json": components["schemas"]["ProfileResponse"]
        }
      }
    }
  }
  FollowUserByUsername: {
    /**
     * Follow a user
     * @description Follow a user by username
     */
    parameters: {
      /** @description Username of the profile you want to follow */
      path: {
        username: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["ProfileResponse"]
          "application/json": components["schemas"]["ProfileResponse"]
          "text/json": components["schemas"]["ProfileResponse"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  UnfollowUserByUsername: {
    /**
     * Unfollow a user
     * @description Unfollow a user by username
     */
    parameters: {
      /** @description Username of the profile you want to unfollow */
      path: {
        username: string
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["ProfileResponse"]
          "application/json": components["schemas"]["ProfileResponse"]
          "text/json": components["schemas"]["ProfileResponse"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  GetTags: {
    /**
     * Get tags
     * @description Get tags. Auth not required
     */
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["TagsResponse"]
          "application/json": components["schemas"]["TagsResponse"]
          "text/json": components["schemas"]["TagsResponse"]
        }
      }
    }
  }
  GetCurrentUser: {
    /**
     * Get current user
     * @description Gets the currently logged-in user
     */
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["UserResponse"]
          "application/json": components["schemas"]["UserResponse"]
          "text/json": components["schemas"]["UserResponse"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  UpdateCurrentUser: {
    /**
     * Update current user
     * @description Updated user information for current user
     */
    /** @description User details to update. At least <strong>one</strong> field is required. */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["UpdateUserRequest"]
        "text/json": components["schemas"]["UpdateUserRequest"]
        "application/*+json": components["schemas"]["UpdateUserRequest"]
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["UserResponse"]
          "application/json": components["schemas"]["UserResponse"]
          "text/json": components["schemas"]["UserResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          "text/plain": components["schemas"]["ValidationProblemDetails"]
          "application/json": components["schemas"]["ValidationProblemDetails"]
          "text/json": components["schemas"]["ValidationProblemDetails"]
        }
      }
      /** @description Unauthorized */
      401: never
      /** @description Forbidden */
      403: never
    }
  }
  CreateUser: {
    /**
     * Register a new user
     * @description Register a new user
     */
    /** @description Details of the new user to register */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["NewUserRequest"]
        "text/json": components["schemas"]["NewUserRequest"]
        "application/*+json": components["schemas"]["NewUserRequest"]
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["UserResponse"]
          "application/json": components["schemas"]["UserResponse"]
          "text/json": components["schemas"]["UserResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          "text/plain": components["schemas"]["ValidationProblemDetails"]
          "application/json": components["schemas"]["ValidationProblemDetails"]
          "text/json": components["schemas"]["ValidationProblemDetails"]
        }
      }
    }
  }
  Login: {
    /**
     * Existing user login
     * @description Login for existing user
     */
    /** @description Credentials to use */
    requestBody?: {
      content: {
        "application/json": components["schemas"]["LoginUserRequest"]
        "text/json": components["schemas"]["LoginUserRequest"]
        "application/*+json": components["schemas"]["LoginUserRequest"]
      }
    }
    responses: {
      /** @description Success */
      200: {
        content: {
          "text/plain": components["schemas"]["UserResponse"]
          "application/json": components["schemas"]["UserResponse"]
          "text/json": components["schemas"]["UserResponse"]
        }
      }
      /** @description Bad Request */
      400: {
        content: {
          "text/plain": components["schemas"]["ValidationProblemDetails"]
          "application/json": components["schemas"]["ValidationProblemDetails"]
          "text/json": components["schemas"]["ValidationProblemDetails"]
        }
      }
    }
  }
}
