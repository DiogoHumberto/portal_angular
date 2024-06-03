# Use uma imagem Node.js com a versão 18.13 ou superior como base para construir a aplicação
FROM node:18.13 as build

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Construa a aplicação Angular
RUN npm run build --prod

# Use uma imagem Nginx para servir a aplicação Angular
FROM nginx:alpine

# Copie os arquivos construídos para o diretório padrão do Nginx
COPY --from=build /app/dist/angular-portal /usr/share/nginx/html

# Exponha a porta em que o Nginx estará rodando
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
