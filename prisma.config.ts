import { defineConfig } from '@prisma/config'

export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: process.env.DATABASE_URL || "postgresql://visionos:visionos_dev_secret@localhost:5432/visionos?schema=public",
  },
})
