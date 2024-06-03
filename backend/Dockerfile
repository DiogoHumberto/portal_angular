# Use uma imagem Node.js com a versão 18.13 ou superior como base
FROM node:18.13-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install json-server --save

# Copie o restante do código do json-server
COPY . .

# Exponha a porta em que o json-server estará rodando
EXPOSE 3000

# Comando para rodar o json-server
CMD ["npm", "start"]
