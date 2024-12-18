FROM node:20-alpine3.20 AS base
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

FROM base AS dependencies
# Install app dependencies
COPY ./package.json /usr/src/app/
COPY ./yarn.lock /usr/src/app/
RUN yarn

FROM dependencies AS build
COPY ./ ./
COPY ./.env ./.env
RUN export NODE_OPTIONS=--max_old_space_size=8192
RUN npx prisma generate
RUN yarn build


FROM dependencies AS release
COPY --from=build /usr/src/app /usr/src/app

CMD ["yarn", "start"]

EXPOSE 3000