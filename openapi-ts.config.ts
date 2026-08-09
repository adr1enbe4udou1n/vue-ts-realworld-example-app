import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "https://aspnetcorerealworld.okami101.io/api/v1/swagger.json",
  output: "src/api/client",
  plugins: ["@hey-api/client-fetch", "@hey-api/sdk"],
})
