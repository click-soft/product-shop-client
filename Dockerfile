FROM node:18-alpine as builder

ENV VITE_BACKEND_URL $VITE_BACKEND_URL
ENV VITE_TOSSPAYMENTS_TEST_CLIENT_KEY $VITE_TOSSPAYMENTS_TEST_CLIENT_KEY
ENV VITE_TOSSPAYMENTS_CLIENT_KEY $VITE_TOSSPAYMENTS_CLIENT_KEY
ENV VITE_SENTRY_DNS $VITE_SENTRY_DNS

WORKDIR /app

COPY package.json .

RUN yarn set version berry

RUN yarn install

COPY . .

RUN yarn build

FROM nginxinc/nginx-unprivileged 

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]