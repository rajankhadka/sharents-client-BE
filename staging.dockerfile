

FROM node:16.15.0

WORKDIR /sharents-client-be

COPY . .

RUN npm i

RUN npm run build

ENTRYPOINT [ "npm", "run", "start:prod" ]