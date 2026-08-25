import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "http://localhost:5000/api/v1/openapi.json",
  output: "src/api/client",
  plugins: ["@hey-api/client-fetch", "@hey-api/sdk"],
})
