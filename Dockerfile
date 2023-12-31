FROM node:18-alpine as builder

WORKDIR /app


# RUN yarn set version berry
# COPY package.json .

COPY . .

ARG VITE_BACKEND_URL
ARG VITE_TOSSPAYMENTS_TEST_CLIENT_KEY
ARG VITE_TOSSPAYMENTS_CLIENT_KEY
ARG VITE_SENTRY_DNS

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_TOSSPAYMENTS_TEST_CLIENT_KEY=${VITE_TOSSPAYMENTS_TEST_CLIENT_KEY}
ENV VITE_TOSSPAYMENTS_CLIENT_KEY=${VITE_TOSSPAYMENTS_CLIENT_KEY}
ENV VITE_SENTRY_DNS=${VITE_SENTRY_DNS}

RUN yarn install --immutable
RUN yarn build

FROM nginxinc/nginx-unprivileged:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]