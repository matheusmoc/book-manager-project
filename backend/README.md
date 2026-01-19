# Backend - Sistema de Gerenciamento de Livraria

API RESTful completa desenvolvida com NestJS, TypeScript, PostgreSQL e Docker, implementando autenticação JWT e CRUD de livros com arquitetura em camadas bem definida.

## Início Rápido com Docker

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Executar o Projeto

```bash
# 1. Entre na pasta do backend
cd backend

# 2. Construa a imagem Docker (instala as dependências)
docker build -t book-manager-api .

# 3. Inicie os containers (API + PostgreSQL)
docker-compose up -d

# 4. Acompanhe os logs
docker-compose logs -f
```

### O que acontece em cada etapa?

**Passo 2 - `docker build`:**
- Lê o `Dockerfile`
- Instala todas as dependências do `package.json`
- Compila o código TypeScript
- Cria a imagem otimizada da aplicação

**Passo 3 - `docker-compose up`:**
- Lê o `docker-compose.yml`
- Inicia o container PostgreSQL
- Inicia o container da API (usando a imagem criada)
- Conecta os containers na mesma rede

### O que o Docker Compose faz?

O arquivo `docker-compose.yml` configura e inicia automaticamente:

1. **Container da API** (NestJS)
   - Porta: 3000
   - Build automático a partir do Dockerfile
   - Variáveis de ambiente configuradas
   - Reinicialização automática

2. **Container PostgreSQL**
   - Porta: 5432
   - Banco de dados: bookmanager
   - Volume persistente para os dados

### Acessar a Aplicação

Após iniciar os containers, a API estará disponível em:
- **API**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api
- **PostgreSQL**: localhost:5432


### Comandos Úteis

```bash
# Parar os containers
docker-compose down

# Parar e remover volumes (limpa o banco de dados)
docker-compose down -v

# Reconstruir a imagem
docker-compose up --build

# Ver logs em tempo real
docker-compose logs -f api

# Acessar o shell do container da API
docker-compose exec api sh

# Ver status dos containers
docker-compose ps
```

---

## Visão Geral

Este backend é uma API RESTful completa para gerenciamento de livros em uma livraria. O sistema implementa todas as operações CRUD (Create, Read, Update, Delete) para livros, além de um sistema robusto de autenticação e autorização utilizando JWT (JSON Web Tokens).


## Arquitetura em Camadas

O backend foi desenvolvido seguindo o padrão de **Arquitetura em Camadas** (Layered Architecture), que promove separação de responsabilidades, facilidade de manutenção e testabilidade.

### As 5 Camadas

#### Camada de Apresentação (Controllers)
- **Arquivos**: `*.controller.ts`
- **Responsabilidade**: Recebe requisições HTTP, valida DTOs e chama serviços
- **Exemplos**: `books.controller.ts`, `auth.controller.ts`

#### Camada de Segurança (Guards/Strategies)
- **Arquivos**: `jwt-auth.guard.ts`, `jwt.strategy.ts`
- **Responsabilidade**: Valida tokens JWT e protege rotas sensíveis

#### Camada de Aplicação (Services)
- **Arquivos**: `*.service.ts`
- **Responsabilidade**: Implementa lógica de negócio e regras de validação
- **Exemplos**: `books.service.ts`, `auth.service.ts`, `users.service.ts`

#### Camada de Domínio (Entities/DTOs)
- **Arquivos**: `*.entity.ts`, `*.dto.ts`
- **Responsabilidade**: Define estrutura de dados e validações
- **Exemplos**: `book.entity.ts`, `create-book.dto.ts`

#### Camada de Persistência (Repository/ORM)
- **Tecnologia**: TypeORM
- **Responsabilidade**: Acesso ao banco de dados e operações CRUD conhecida também como camada de persistencia dos dados

---

## Tecnologias Utilizadas

### Framework e Core
- **[NestJS](https://nestjs.com/)** v11.0.1 - Framework Node.js progressivo
- **[TypeScript](https://www.typescriptlang.org/)** v5.x - JavaScript com tipagem
- **[Node.js](https://nodejs.org/)** v18+ - Runtime JavaScript

### Banco de Dados e ORM
- **[TypeORM](https://typeorm.io/)** v0.3.x - Object-Relational Mapping
- **[PostgreSQL](https://www.postgresql.org/)** v13+ - Banco relacional (produção)
- **[SQLite](https://www.sqlite.org/)** - Banco relacional (desenvolvimento)
- **[pg](https://www.npmjs.com/package/pg)** v8.17 - Driver PostgreSQL

### Autenticação e Segurança
- **[Passport](http://www.passportjs.org/)** - Framework de autenticação
- **[@nestjs/passport](https://docs.nestjs.com/security/authentication)** - Integração Passport/NestJS
- **[@nestjs/jwt](https://docs.nestjs.com/security/authentication#jwt-functionality)** - Geração e validação JWT
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** v5.x - Hash de senhas

### Validação
- **[class-validator](https://github.com/typestack/class-validator)** - Validação de DTOs
- **[class-transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

### Documentação
- **[@nestjs/swagger](https://docs.nestjs.com/openapi/introduction)** v11.2 - Documentação OpenAPI
- **[swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)** v5.0 - Interface Swagger

### Configuração
- **[@nestjs/config](https://docs.nestjs.com/techniques/configuration)** v4.0 - Gerenciamento de configurações
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Variáveis de ambiente

### DevOps
- **[Docker](https://www.docker.com/)** - Containerização
- **[Docker Compose](https://docs.docker.com/compose/)** - Orquestração

### Ferramentas de Desenvolvimento
- **[ESLint](https://eslint.org/)** v9.18 - Linter
- **[Prettier](https://prettier.io/)** v3.4 - Formatação
- **[Jest](https://jestjs.io/)** v30.0 - Framework de testes
- **[Supertest](https://github.com/visionmedia/supertest)** v7.0 - Testes de API

---

## Módulos e Funcionalidades

### 1. Módulo de Autenticação (Auth)

**Localização**: `src/auth/`

**Responsabilidades**:
- Registro de novos usuários
- Login e geração de tokens JWT
- Validação de credenciais
- Hash de senhas com bcrypt

**Endpoints**:
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login e obter token JWT

---

### 2. Módulo de Livros (Books)

**Localização**: `src/books/`

**Responsabilidades**:
- CRUD completo de livros
- Busca por título
- Validação de dados

**Endpoints**:
- `GET /books` - Listar todos os livros
- `GET /books?title=termo` - Buscar por título
- `GET /books/:id` - Obter livro por ID
- `POST /books` - Criar livro (autenticado)
- `PATCH /books/:id` - Atualizar livro (autenticado)
- `DELETE /books/:id` - Deletar livro (autenticado)


**Modelo de Dados**:
```typescript
Book {
  id: number;              // Auto-incremento
  title: string;           // Obrigatório
  author: string;          // Obrigatório
  year: number;            // Opcional
  description: string;     // Opcional
  createdAt: Date;         // Automático
  updatedAt: Date;         // Automático
}
```
---

### 3. Módulo de Usuários (Users)

**Localização**: `src/users/`

**Responsabilidades**:
- Gerenciamento de usuários
- Criação de usuários com senha hash
- Busca de usuários

**Modelo de Dados**:
```typescript
User {
  id: number;              // Auto-incremento
  username: string;        // Único
  password: string;        // Hash bcrypt
  createdAt: Date;         // Automático
  updatedAt: Date;         // Automático
}
```

**Segurança**:
- Senha é hasheada com bcrypt antes de salvar
- Campo password é excluído das respostas (decorator @Exclude)

---

## Instalação

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x ou **yarn**
- **PostgreSQL** >= 13 (ou usar Docker)
- **Docker** e **Docker Compose** (opcional, mas recomendado)

### Passo a Passo

1. **Clone o repositório** (se ainda não fez)
```bash
git clone https://github.com/matheusmoc/book-manager-project.git
cd book-manager-project/backend
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme sua necessidade.

4. **Pronto!** Agora você pode executar o projeto.

---

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do backend com as seguintes variáveis:

```env
# Porta da aplicação
PORT=3000

# JWT Secret (IMPORTANTE: use uma chave forte em produção)
JWT_SECRET=seu_secret_super_seguro_aqui_mude_em_producao

# Tipo de banco de dados (sqlite ou postgres)
DATABASE_TYPE=sqlite

# ===== SQLite (Desenvolvimento) =====
DATABASE_NAME=database.sqlite

# ===== PostgreSQL (Produção) =====
# Descomente e configure para usar PostgreSQL
# DATABASE_TYPE=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_USERNAME=user
# DATABASE_PASSWORD=password
# DATABASE_NAME=bookmanager
```

### Configuração do Banco de Dados

#### Opção 1: SQLite (Desenvolvimento)

Configuração padrão. Sem necessidade de instalar nada.

```env
DATABASE_TYPE=sqlite
DATABASE_NAME=database.sqlite
```

#### Opção 2: PostgreSQL (Produção)
 Acessar a aplicação

Após iniciar, a API estará disponível em:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api
- **Health**: http://localhost:3000

---

## 📌 Endpoints da API

### Autenticação

#### Registrar Usuário
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "senha123"
}
```

**Resposta** (201):
```json
{
  "id": 1,
  "username": "admin",
  "createdAt": "2026-01-18T10:00:00.000Z",
  "updatedAt": "2026-01-18T10:00:00.000Z"
}
```

---

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "senha123"
}
```

**Resposta** (200):
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Livros

#### Listar Todos os Livros
```http
GET /books
```

**Resposta** (200):
```json
[
  {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "year": 2008,
    "description": "A Handbook of Agile Software Craftsmanship",
    "createdAt": "2026-01-18T10:00:00.000Z",
    "updatedAt": "2026-01-18T10:00:00.000Z"
  }
]
```
--- principais**: `auth.controller.ts`, `auth.service.ts`, `jwt.strategy.ts`, `jwt-auth.guard.ts## Obter Livro por ID

```http
GET /books/1
```

**Resposta** (200):
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "description": "A Handbook of Agile Software Craftsmanship",
  "createdAt": "2026-01-18T10:00:00.000Z",
  "updatedAt": "2026-01-18T10:00:00.000Z"
}
```

**Erro** (404):
```json
{
  "statusCode": 404,
  "message": "Livro 999 não encontrado",
  "error": "Not Found"
}
```

---

#### Criar Livro 
```http
POST /books
Authorization: Bearer <seu_token_jwt>
Content-Type: application/json

{
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "year": 2017,
  "description": "A Craftsman's Guide to Software Structure"
}
```

**Validações**:
- `title`: obrigatório, string
- `author`: obrigatório, string
- `year`: opcional, número inteiro
- `description`: opcional, string

**Resposta** (201):
```json
{
  "id": 2,
  "title": "Clean Architecture",
  "author": "Robert C. Martin",
  "year": 2017,
  "description": "A Craftsman's Guide to Software Structure",
  "createdAt": "2026-01-18T10:05:00.000Z",
  "updatedAt": "2026-01-18T10:05:00.000Z"
}
```

---

#### Atualizar Livro 
```http
PATCH /books/1
Authorization: Bearer <seu_token_jwt>
Content-Type: application/json

{
  "year": 2009,
  "description": "Edição atualizada"
}
```

Todos os campos são opcionais. Atualiza apenas os campos enviados.

**Resposta** (200):
```json
{
  "id": 1,
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2009,
  "description": "Edição atualizada",
  "createdAt": "2026-01-18T10:00:00.000Z",
  "updatedAt": "2026-01-18T10:10:00.000Z"
}
```

---

#### Deletar Livro 
```http
DELETE /books/1
Authorization: Bearer <seu_token_jwt>
```

**Resposta** (200): Sem conteúdo

**Erro** (404):
```json
{
  "statusCode": 404,
  "message": "Livro 999 não encontrado",
  "error": "Not Found"
}

```

## Testes E2E

### Fluxo de Testes Implementado

O projeto possui testes end-to-end (E2E) completos que validam todo o fluxo de gerenciamento de livros, incluindo autenticação.

**Arquivo**: `test/books.e2e-spec.ts`

### 🔄 Fluxo Completo dos Testes

```
1. SETUP (beforeAll)
      Inicializa aplicação NestJS
      Configura ValidationPipe
      Registra usuário de teste (testuser)
      Faz login e obtém token JWT
   
2. POST /books/create
      Cria livro com sucesso (201)
      Valida dados inválidos (400)
      Valida falta de autenticação (401)
   
3. GET /books
      Lista todos os livros
      Filtra livros por título (?title=Clean)
   
4. GET /books/:id
      Busca livro específico por ID
      Retorna 404 para ID inexistente
   
5. PATCH /books/:id
      Atualiza livro existente
      Retorna 404 ao atualizar ID inexistente
   
6. DELETE /books/:id
      Remove livro existente
      Retorna 404 ao tentar remover novamente
   
7. CLEANUP (afterAll)
      Fecha aplicação e limpa recursos
```

### Executar os Testes

```bash
# Todos os testes E2E
npm run test:e2e

# Apenas testes de livros
npm run test:e2e -- books.e2e-spec

# Com cobertura
npm run test:cov

# Em modo watch
npm run test:watch
```

### Exemplo de Saída

```
PASS  test/books.e2e-spec.ts
  Books Flow (e2e)
    POST /books/create
      ✓ deve criar um novo livro com sucesso (27 ms)
      ✓ deve retornar erro 400 ao enviar dados inválidos (7 ms)
      ✓ deve retornar erro 401 sem autenticação (6 ms)
    GET /books
      ✓ deve listar todos os livros (7 ms)
      ✓ deve filtrar livros por título (7 ms)
    GET /books/:id
      ✓ deve buscar um livro específico por id (8 ms)
      ✓ deve retornar erro 404 para id inexistente (8 ms)
    PATCH /books/:id
      ✓ deve atualizar um livro existente (49 ms)
      ✓ deve retornar erro 404 ao atualizar id inexistente (9 ms)
    DELETE /books/:id
      ✓ deve remover um livro existente (9 ms)
      ✓ deve retornar erro 404 ao tentar remover novamente (6 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Time:        2.765 s
```

### O que os Testes Cobrem

✅ **Autenticação completa** - Registro, login e uso de token JWT  
✅ **CRUD completo** - Create, Read, Update, Delete  
✅ **Validações** - Dados inválidos, campos obrigatórios  
✅ **Autorização** - Rotas protegidas por JWT  
✅ **Filtros** - Busca por título  
✅ **Tratamento de erros** - 404, 400, 401  
✅ **Fluxo realista** - Simula uso real da API

---
## Deploy na Vercel

### Pré-requisitos
- Conta na [Vercel](https://vercel.com)
- PostgreSQL AWS Aurora configurado (ou outro PostgreSQL)
- Repositório no GitHub


```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd backend
vercel --prod
```


### Troubleshooting

**Erro: Cannot connect to database**
- Verifique se o PostgreSQL está acessível publicamente
- Confirme as variáveis PGHOST, PGUSER, PGPASSWORD
- Verifique o security group da AWS (porta 5432)

**Erro: Module not found**
- Execute `npm install` localmente primeiro
- Verifique se todas as dependências estão no `package.json`

**Erro: Function timeout**
- Aumente o timeout nas configurações da Vercel
- Otimize queries pesadas no banco de dados

---
