FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

RUN yarn prisma migrate dev

COPY . .

EXPOSE 3333

CMD ["yarn","dev"]