#!/bin/sh

echo "📦 Iniciando build..."
npm run build
echo "✅ Build concluído!"

echo "🚀 Iniciando aplicação..."
npm run start:prod
echo "✅ API iniciada com sucesso!"
exit 0
