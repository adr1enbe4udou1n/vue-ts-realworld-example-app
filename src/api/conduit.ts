export interface paths {
  "/articles": {
    /** Get most recent articles globally. Use query parameters to filter results. Auth is optional */
    get: {
      parameters: {
        query: {
          /** Filter by author (username) */
          author?: string
          /** Filter by favorites of a user (username) */
          favorited?: string
          /** Filter by tag */
          tag?: string
          /** Limit number of articles returned (default is 20) */
          limit?: number
          /** Offset/skip number of articles (default is 0) */
          offset?: number
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["MultipleArticlesResponse"]
            "application/json": components["schemas"]["MultipleArticlesResponse"]
            "text/json": components["schemas"]["MultipleArticlesResponse"]
          }
        }
      }
    }
    /** Create an article. Auth is required */
    post: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SingleArticleResponse"]
            "application/json": components["schemas"]["SingleArticleResponse"]
            "text/json": components["schemas"]["SingleArticleResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      /** Article to create */
      requestBody: {
        content: {
          "application/json": components["schemas"]["NewArticleRequest"]
          "text/json": components["schemas"]["NewArticleRequest"]
          "application/*+json": components["schemas"]["NewArticleRequest"]
        }
      }
    }
  }
  "/articles/feed": {
    /** Get most recent articles from users you follow. Use query parameters to limit. Auth is required */
    get: {
      parameters: {
        query: {
          /** Limit number of articles returned (default is 20) */
          limit?: number
          /** Offset/skip number of articles (default is 0) */
          offset?: number
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["MultipleArticlesResponse"]
            "application/json": components["schemas"]["MultipleArticlesResponse"]
            "text/json": components["schemas"]["MultipleArticlesResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/articles/{slug}": {
    /** Get an article. Auth not required */
    get: {
      parameters: {
        path: {
          /** Slug of the article to get */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SingleArticleResponse"]
            "application/json": components["schemas"]["SingleArticleResponse"]
            "text/json": components["schemas"]["SingleArticleResponse"]
          }
        }
      }
    }
    /** Update an article. Auth is required */
    put: {
      parameters: {
        path: {
          /** Slug of the article to update */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SingleArticleResponse"]
            "application/json": components["schemas"]["SingleArticleResponse"]
            "text/json": components["schemas"]["SingleArticleResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      /** Article to update */
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateArticleRequest"]
          "text/json": components["schemas"]["UpdateArticleRequest"]
          "application/*+json": components["schemas"]["UpdateArticleRequest"]
        }
      }
    }
    /** Delete an article. Auth is required */
    delete: {
      parameters: {
        path: {
          /** Slug of the article to delete */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: unknown
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/articles/{slug}/comments": {
    /** Get the comments for an article. Auth is optional */
    get: {
      parameters: {
        path: {
          /** Slug of the article that you want to get comments for */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["MultipleCommentsResponse"]
            "application/json": components["schemas"]["MultipleCommentsResponse"]
            "text/json": components["schemas"]["MultipleCommentsResponse"]
          }
        }
      }
    }
    /** Create a comment for an article. Auth is required */
    post: {
      parameters: {
        path: {
          /** Slug of the article that you want to create a comment for */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SingleCommentResponse"]
            "application/json": components["schemas"]["SingleCommentResponse"]
            "text/json": components["schemas"]["SingleCommentResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      /** Comment you want to create */
      requestBody: {
        content: {
          "application/json": components["schemas"]["NewCommentRequest"]
          "text/json": components["schemas"]["NewCommentRequest"]
          "application/*+json": components["schemas"]["NewCommentRequest"]
        }
      }
    }
  }
  "/articles/{slug}/comments/{commentId}": {
    /** Delete a comment for an article. Auth is required */
    delete: {
      parameters: {
        path: {
          /** Slug of the article that you want to delete a comment for */
          slug: string
          /** ID of the comment you want to delete */
          commentId: number
        }
      }
      responses: {
        /** Success */
        200: unknown
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/articles/{slug}/favorite": {
    /** Favorite an article. Auth is required */
    post: {
      parameters: {
        path: {
          /** Slug of the article that you want to favorite */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SingleArticleResponse"]
            "application/json": components["schemas"]["SingleArticleResponse"]
            "text/json": components["schemas"]["SingleArticleResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
    /** Unfavorite an article. Auth is required */
    delete: {
      parameters: {
        path: {
          /** Slug of the article that you want to unfavorite */
          slug: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["SingleArticleResponse"]
            "application/json": components["schemas"]["SingleArticleResponse"]
            "text/json": components["schemas"]["SingleArticleResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/profiles/celeb_{username}": {
    /** Get a profile of a user of the system. Auth is optional */
    get: {
      parameters: {
        path: {
          /** Username of the profile to get */
          username: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["ProfileResponse"]
            "application/json": components["schemas"]["ProfileResponse"]
            "text/json": components["schemas"]["ProfileResponse"]
          }
        }
      }
    }
  }
  "/profiles/celeb_{username}/follow": {
    /** Follow a user by username */
    post: {
      parameters: {
        path: {
          /** Username of the profile you want to follow */
          username: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["ProfileResponse"]
            "application/json": components["schemas"]["ProfileResponse"]
            "text/json": components["schemas"]["ProfileResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
    /** Unfollow a user by username */
    delete: {
      parameters: {
        path: {
          /** Username of the profile you want to unfollow */
          username: string
        }
      }
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["ProfileResponse"]
            "application/json": components["schemas"]["ProfileResponse"]
            "text/json": components["schemas"]["ProfileResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
  }
  "/tags": {
    /** Get tags. Auth not required */
    get: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["TagsResponse"]
            "application/json": components["schemas"]["TagsResponse"]
            "text/json": components["schemas"]["TagsResponse"]
          }
        }
      }
    }
  }
  "/user": {
    /** Gets the currently logged-in user */
    get: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["UserResponse"]
            "application/json": components["schemas"]["UserResponse"]
            "text/json": components["schemas"]["UserResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
    }
    /** Updated user information for current user */
    put: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["UserResponse"]
            "application/json": components["schemas"]["UserResponse"]
            "text/json": components["schemas"]["UserResponse"]
          }
        }
        /** Unauthorized */
        401: unknown
        /** Forbidden */
        403: unknown
      }
      /** User details to update. At least <strong>one</strong> field is required. */
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateUserRequest"]
          "text/json": components["schemas"]["UpdateUserRequest"]
          "application/*+json": components["schemas"]["UpdateUserRequest"]
        }
      }
    }
  }
  "/users": {
    /** Register a new user */
    post: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["UserResponse"]
            "application/json": components["schemas"]["UserResponse"]
            "text/json": components["schemas"]["UserResponse"]
          }
        }
      }
      /** Details of the new user to register */
      requestBody: {
        content: {
          "application/json": components["schemas"]["NewUserRequest"]
          "text/json": components["schemas"]["NewUserRequest"]
          "application/*+json": components["schemas"]["NewUserRequest"]
        }
      }
    }
  }
  "/users/login": {
    /** Login for existing user */
    post: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["UserResponse"]
            "application/json": components["schemas"]["UserResponse"]
            "text/json": components["schemas"]["UserResponse"]
          }
        }
      }
      /** Credentials to use */
      requestBody: {
        content: {
          "application/json": components["schemas"]["LoginUserRequest"]
          "text/json": components["schemas"]["LoginUserRequest"]
          "application/*+json": components["schemas"]["LoginUserRequest"]
        }
      }
    }
  }
}
export interface components {
  schemas: {
    Article: {
      title?: string | null
      slug?: string | null
      description?: string | null
      body?: string | null
      /** Format: date-time */
      createdAt?: string
      /** Format: date-time */
      updatedAt?: string
      tagList?: string[] | null
      author?: components["schemas"]["Profile"]
      favorited?: boolean
      /** Format: int32 */
      favoritesCount?: number
    }
    Comment: {
      /** Format: int32 */
      id?: number
      body?: string | null
      /** Format: date-time */
      createdAt?: string
      /** Format: date-time */
      updatedAt?: string
      author?: components["schemas"]["Profile"]
    }
    LoginUser: {
      email?: string
      password?: string
    }
    LoginUserRequest: {
      user?: components["schemas"]["LoginUser"]
    }
    MultipleArticlesResponse: {
      articles?: components["schemas"]["Article"][]
      /** Format: int32 */
      articlesCount?: number
    }
    MultipleCommentsResponse: {
      comments?: components["schemas"]["Comment"][]
    }
    NewArticle: {
      title?: string
      description?: string
      body?: string
      tagList?: string[]
    }
    NewArticleRequest: {
      article?: components["schemas"]["NewArticle"]
    }
    NewComment: {
      body?: string | null
    }
    NewCommentRequest: {
      comment?: components["schemas"]["NewComment"]
    }
    NewUser: {
      email?: string
      password?: string
      username?: string
    }
    NewUserRequest: {
      user?: components["schemas"]["NewUser"]
    }
    Profile: {
      username?: string | null
      bio?: string | null
      image?: string | null
      following?: boolean
    }
    ProfileResponse: {
      profile?: components["schemas"]["Profile"]
    }
    SingleArticleResponse: {
      article?: components["schemas"]["Article"]
    }
    SingleCommentResponse: {
      comment?: components["schemas"]["Comment"]
    }
    TagsResponse: {
      tags?: string[]
    }
    UpdateArticle: {
      title?: string | null
      description?: string | null
      body?: string | null
    }
    UpdateArticleRequest: {
      article?: components["schemas"]["UpdateArticle"]
    }
    UpdateUser: {
      username?: string | null
      email?: string | null
      bio?: string | null
      image?: string | null
    }
    UpdateUserRequest: {
      user?: components["schemas"]["UpdateUser"]
    }
    User: {
      email?: string
      username?: string
      bio?: string | null
      image?: string | null
      token?: string
    }
    UserResponse: {
      user?: components["schemas"]["User"]
    }
  }
}
export interface operations {}
export interface external {}
