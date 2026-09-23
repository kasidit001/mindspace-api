FROM oven/bun:1

WORKDIR /app

# Dependencies first so this layer is cached until package.json/bun.lock change.
# devDependencies (@types/bun, sequelize-cli) aren't needed at runtime.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

COPY . .

ENV NODE_ENV=production
# Render (and most hosts) inject PORT; index.ts reads it and defaults to 8080.
EXPOSE 8080

USER bun
CMD ["bun", "run", "index.ts"]
