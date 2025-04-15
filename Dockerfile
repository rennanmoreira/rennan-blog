FROM node:22.14-alpine

# --- Define a variável de ambiente de fuso horário ---
ENV TZ="America/Sao_Paulo"
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ENV NODE_OPTIONS="--max-old-space-size=8192"
RUN echo "NODE_ENV=$NODE_ENV"

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

EXPOSE 3000 9229 8080

RUN if [ "$NODE_ENV" = "production" ]; then npm run prisma:deploy && npm run build; else echo "Skipping deploy/build (NODE_ENV=$NODE_ENV)"; fi

