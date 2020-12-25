FROM node:14.15.3-slim

ENV HOME=/usr/src/app
WORKDIR $HOME

ADD package.json $HOME/package.json
ADD tsconfig.json $HOME/tsconfig.json
ADD src $HOME/src

RUN npm cache verify && npm install --no-progress

EXPOSE 3000