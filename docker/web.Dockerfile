FROM oven/bun:1 AS build

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

ARG WEB_REF=db749e3bb1a4
ARG VITE_API_URL=http://localhost:3000/api
WORKDIR /app
RUN git clone --recurse-submodules https://github.com/realworld-apps/vue-realworld-example-app.git . \
    && git checkout ${WEB_REF} \
    && git submodule update --init

RUN bun install --frozen-lockfile && VITE_API_URL=${VITE_API_URL} bun run build

FROM nginx:alpine
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
