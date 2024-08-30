# Backend Shopper

Este repositório é o backend de uma aplicação desenvolvida para gerenciar a leitura individualizada de consumo de água e gás utilizando inteligência artificial para análise de imagens. A aplicação está totalmente dockerizada e integra-se com a API do Google Gemini para análise das imagens enviadas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no backend.
- **TypeScript**: Utilizado para tipagem estática e organização do código.
- **Express**: Framework web para criação de APIs RESTful.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar as leituras.
- **Docker e Docker Compose**: Ferramentas de containerização para fácil configuração e execução da aplicação.
- **Google Generative AI**: Utilizado para análise e upload de imagens.

## Estrutura do Projeto

- `middlewares/`: Middlewares para validação de dados e processamento de requisições.
- `routes/`: Define as rotas da aplicação (`upload`, `confirm`, `list`).
- `services/`: Serviços para integração com o Google Gemini para análise e upload de imagens.
- `useCases/`: Implementações dos casos de uso principais, como confirmação e listagem de medidas.
- `models/`: Modelos de dados, incluindo o esquema de `Measure`.
- `utils/`: Utilitários para manipulação de dados e tratamento de erros.

## Instalação

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/renanholler/backend-shopper.git
   ```
2. **Navegue para o diretório do projeto**:
   ```bash
   cd backend-shopper
   ```
3. **Instale as dependências**:
   ```bash
   npm install
   ```

## Configuração

1. **Crie um arquivo `.env`** na raiz do projeto com as seguintes variáveis de ambiente:
   ```env
   MONGO_URL=mongodb://mongo:27017/shopper
   PORT=80
   GEMINI_API_KEY=sua_chave_api
   ```
   Substitua `sua_chave_api` pela chave da API do Google Gemini.

## Execução com Docker

1. **Construir e iniciar os containers**:
   ```bash
   docker compose up --build
   ```
   Isso iniciará o MongoDB e o backend na porta 80.

## Endpoints da API

### 1. **POST /upload**

Recebe uma imagem em base64, consulta o Google Gemini e retorna a medida lida.

- **Request Body**:
  ```json
  {
    "image": "base64",
    "customer_code": "string",
    "measure_datetime": "datetime",
    "measure_type": "WATER" ou "GAS"
  }
  ```
- **Response Body**:
  - **200 OK**:
  ```json
  {
    "image_url": "string",
    "measure_value": integer,
    "measure_uuid": "string"
  }
  ```
  - **400 INVALID_DATA**: Erro nos dados fornecidos.
  - **409 DOUBLE_REPORT**: Leitura do mês já realizada.

### 2. **PATCH /confirm**

Confirma ou corrige o valor lido pelo LLM.

- **Request Body**:
  ```json
  {
    "measure_uuid": "string",
    "confirmed_value": integer
  }
  ```
- **Response Body**:
  - **200 OK**:
  ```json
  {
    "success": true
  }
  ```
  - **400 INVALID_DATA**: Dados inválidos.
  - **404 MEASURE_NOT_FOUND**: Leitura não encontrada.
  - **409 CONFIRMATION_DUPLICATE**: Leitura já confirmada.

### 3. **GET /:customer_code/list**

Lista as medidas realizadas por um determinado cliente.

- **Query Parameter**: `measure_type` opcional (`WATER` ou `GAS`).
- **Response Body**:
  - **200 OK**:
  ```json
  {
    "customer_code": "string",
    "measures": [
      {
        "measure_uuid": "string",
        "measure_datetime": "datetime",
        "measure_type": "string",
        "has_confirmed": boolean,
        "image_url": "string"
      }
    ]
  }
  ```
  - **400 INVALID_TYPE**: Tipo de medição inválido.
  - **404 MEASURES_NOT_FOUND**: Nenhuma leitura encontrada.

## Testes

O projeto inclui uma suite de testes unitários que validam as principais funcionalidades dos middlewares, modelos, serviços e utilitários.

- **Para rodar os testes**, execute:
  ```bash
  npm test
  ```
