FROM node:16.15.0

WORKDIR /sharents-client-be

COPY ./package.json .

RUN npm i --legacy-peer-deps

COPY ./ .

# RUN npm run build

ENTRYPOINT [ "npm", "run", "start:local" ]