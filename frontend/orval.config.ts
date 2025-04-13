import { defineConfig } from 'orval'
const API_BASE_URL = 'http://localhost:3000'

export default defineConfig({
  api: {
    input: {
      target: `${API_BASE_URL}/api-swagger-json`,
      converterOptions: true
    },
    output: {
      mode: 'tags-split',
      target: './src/api/generated',
      schemas: './src/api/model',
      client: 'react-query',
      prettier: true,
      override: {
        mutator: {
          path: './src/lib/axios.ts',
          name: 'api'
        }
      }
    },
    hooks: {
      afterAllFilesWrite: 'npx prettier --write src/api'
    }
  }
})
