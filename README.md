# ![RealWorld Example App](logo.png)

The frontend side **Vue 3** codebase containing realworld example that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API. Written fully in **Typescript** on **Composition API**

[![CI](https://concourse.okami101.io/api/v1/teams/main/pipelines/conduit-vue-ts/badge)](https://concourse.okami101.io/teams/main/pipelines/conduit-vue-ts)

## [RealWorld](https://github.com/gothinkster/realworld)

This codebase was created to demonstrate a fully fledged fullstack application built with last **Vue 3** (with Feature orientation) including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the ASP.NET Core community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

See [my works](https://blog.okami101.io/works/) for my personal Backend & Frontend RealWorld apps collection.

## Usage

### Backend API

You should have locally a valid API backend that adheres to realworld spec. Check all my backend repos for plenty of choices (ASPNET, SpringBoot, NestJS, FastAPI, Laravel, Symfony). You can also use existing remote [API](https://aspnetrealworld.okami101.io/api/index.html).

### Run app

Create a `.env.local` file with a valid backend URL, then :

```sh
pnpm i
pnpm dev
```

And that's all, go to <http://localhost:3000>