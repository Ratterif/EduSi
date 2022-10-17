FROM node:16.16.0

WORKDIR /app

COPY . .

RUN yarn && yarn build

CMD ["npm", "run", "start"]
