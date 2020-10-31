FROM node:lts-alpine

ARG APP_PORT=3000

WORKDIR /app

COPY ./package.json ./yarn.lock ./

RUN yarn

COPY ./ ./

RUN yarn build

EXPOSE ${APP_PORT}

CMD ["yarn", "start"]
