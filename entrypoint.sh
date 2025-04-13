#!/bin/sh

echo "🌍 Ambiente: ${NODE_ENV}"

echo "⏳ Aguardando o banco ficar disponível..."
until nc -z db 5432; do
  sleep 1
done

echo "✅ Banco está acessível!"

# Verifica se existem migrações já criadas no diretório ./prisma/migrations
if [ ! -d "./prisma/migrations" ] || [ -z "$(ls -A ./prisma/migrations)" ]; then
  echo "📦 Nenhuma migração local encontrada. Rodando 'prisma migrate dev --name init'..."
  npx prisma migrate dev --name init
else
  echo "🗃️ Migrações existentes detectadas. Aplicando com 'prisma migrate deploy'..."
  npx prisma migrate deploy
fi

echo "⚙️ Gerando cliente Prisma..."
npx prisma generate

echo "🚀 Iniciando aplicação..."
npm run start:debug

echo "✅ Prisma API iniciada com sucesso!"