#!/bin/sh

echo "🌍 Ambiente: ${NODE_ENV}"

if [ "${NODE_ENV}" = "production" ]; then
  echo "📦 Iniciando build..."
  npm run build
  echo "✅ Build concluído!"

  echo "🚀 Iniciando aplicação..."
  npm run start:prod
  echo "✅ API iniciada com sucesso!"
  exit 0
else
  echo "🚀 Iniciando aplicação em modo de desenvolvimento..."
fi
