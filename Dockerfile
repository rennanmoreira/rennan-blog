FROM node:22.14-alpine

# --- Define a variável de ambiente de fuso horário ---
ENV TZ="America/Sao_Paulo"
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ENV NODE_OPTIONS="--max-old-space-size=8192"

RUN apk add --no-cache openssl bash tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh
RUN npm install -g prisma
RUN npm install -g @nestjs/cli

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run prisma:generate

EXPOSE 3000 9229

# Comentar essas linhas abaixo quando for rodar local com o docker
# RUN npm run build
# CMD [ "npm", "run", "start:prod" ]

