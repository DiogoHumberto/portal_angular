# Use uma imagem Node.js com a versão 18.13 ou superior como base
FROM node:18.13-alpine

# Criar diretório de trabalho
WORKDIR /app

# Instalar json-server globalmente
RUN npm install -g json-server

# Copiar db.json para o contêiner
COPY db.json .

# Expor a porta do json-server
EXPOSE 3000

# Comando para iniciar o json-server
CMD ["json-server", "--watch", "db.json"]
