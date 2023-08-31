FROM node:16-alpine3.18

WORKDIR '/home/node/app'

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn install

COPY --chown=node:node . .

CMD ["yarn", "start"]