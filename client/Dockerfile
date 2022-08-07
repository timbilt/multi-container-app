FROM node:16-alpine as builder

USER node

RUN mkdir -p /home/node/app
WORKDIR '/home/node/app'

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
RUN yarn install

COPY --chown=node:node . .

RUN yarn build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /usr/share/nginx/html
COPY --from=builder /home/node/app/build /usr/share/nginx/html
CMD ["yarn", "start"]