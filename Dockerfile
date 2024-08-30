# Usando a imagem do Node.js 20
FROM node:20-alpine

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copiando os arquivos de package.json e package-lock.json para instalar dependências primeiro
COPY package*.json ./

# Instalando dependências de produção e desenvolvimento
RUN npm install

# Copiando o restante do código para o container
COPY . .

# Compilando o TypeScript para JavaScript
RUN npm run build

# Definindo a variável de ambiente para produção
ENV NODE_ENV=production

# Expondo a porta da aplicação
EXPOSE 80

# Comando para iniciar a aplicação
CMD ["npm", "start"]
