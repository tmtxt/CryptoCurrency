FROM node:6.14.4

RUN npm install -g discord.js
RUN npm install -g moment
RUN npm install -g jsonfile
RUN npm install -g node-fetch

WORKDIR /usr/src/app
ADD bot.js /usr/src/app

ENV NODE_PATH /usr/local/lib/node_modules
