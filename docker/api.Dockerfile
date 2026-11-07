FROM oven/bun:1

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

ARG API_REF=428056b3bed0
WORKDIR /app
RUN git clone --recurse-submodules https://github.com/realworld-apps/nitro-prisma-zod-realworld-example-app.git . \
    && git checkout ${API_REF} \
    && git submodule update --init

RUN bun install --frozen-lockfile \
    && bun run prepare \
    && bun run db:generate \
    && bun run build

ENV DATABASE_URL=file:./dev.db
EXPOSE 3000

CMD ["sh", "-c", "bun run db:push && bun run start"]
