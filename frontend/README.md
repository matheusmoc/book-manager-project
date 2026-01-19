# Frontend - Book Manager

Frontend moderno com Next.js 14 e TailwindCSS para o sistema de gerenciamento de livros.

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Framework CSS utility-first
- **Axios** - Cliente HTTP com interceptors
- **React Hot Toast** - Notificações elegantes

## Instalação

```bash
npm install
```

## Configuração

O arquivo `.env.local` já está configurado:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Executar

### Desenvolvimento Local

```bash
# Desenvolvimento (porta 3001)
npm run dev

# Build para produção
npm run build

# Executar produção
npm start
```

O frontend estará disponível em: http://localhost:3001

### Com Docker

```bash
# Build da imagem
docker build -t book-manager-frontend .
```

```bash
docker-compose up -d
```

O frontend estará disponível em: http://localhost:3001

## Estrutura de Páginas

- `/login` - Autenticação de usuários
- `/register` - Cadastro de novos usuários
- `/books` - Lista de livros (protegida)
- `/books/new` - Criar novo livro (protegida)
- `/books/[id]/edit` - Editar livro (protegida)

## Design System

### Padrão TailAdmin

Interface construída seguindo o template [TailAdmin](https://tailadmin.com/docs):

- **Sidebar responsiva** - Menu fixo com overlay mobile
- **Dark mode ready** - Suporte a tema escuro
- **Componentes modernos** - Cards, forms, buttons consistentes
- **SVG Icons** - Icons escaláveis do Heroicons
- **Loading states** - Spinners e feedback visual
- **Responsive design** - Mobile-first approach

### Cores Principais

```css
primary-600: #0284c7 (Sky blue)
gray-900: #111827 (Background dark)
```

## Autenticação

JWT tokens são gerenciados automaticamente:

- **Login** - Token salvo em `localStorage`
- **Interceptors** - Token adicionado em todas as requisições
- **401 handling** - Redirecionamento automático para login
- **Route protection** - Verificação client-side



## Funcionalidades

    Autenticação completa (login/register/logout)  
    CRUD de livros com validação  
    Busca em tempo real por título  
    Layout responsivo com sidebar mobile  
    Loading states em todas as ações  
    Notificações toast elegantes  
    Proteção de rotas  
    Dark mode support  
    TypeScript em 100% do código  
    Validação de formulários  

## Integração com Backend

### Desenvolvimento Local

Certifique-se de que o backend está rodando:

```bash
cd ../backend
npm run start:dev
```

API disponível em: `http://localhost:3000`

### Com Docker

```bash
# A partir da raiz do projeto, suba todos os serviços
cd ..
docker-compose up -d

# Verificar logs
docker-compose logs -f frontend
docker-compose logs -f backend

# Parar serviços
docker-compose down
```

Serviços disponíveis:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- API Docs: http://localhost:3000/api

## Boas Práticas Implementadas

- App Router (não Pages Router)
- 'use client' apenas onde necessário
- TypeScript strict mode
- Componentes server/client separados
- Metadata API para SEO
- Formulários controlados
- Event handlers tipados
- Componentes reutilizáveis
- Loading e error states


## 🐛 Troubleshooting

### Erro: Cannot connect to API
**Solução:** Verifique se o backend está rodando na porta 3000

### Erro: 401 Unauthorized
**Solução:** Faça login novamente, o token pode ter expirado

### Erro: Port 3001 already in use
**Solução:** Execute em outra porta:
```bash
npm run dev -- -p 3002
```

## Documentação

- [Next.js 14 Docs](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [TailAdmin Template](https://tailadmin.com/docs)
- [Axios](https://axios-http.com/docs/intro)

## Links

- Backend: [../backend/README.md](../backend/README.md)
- API Swagger: http://localhost:3000/api


## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Axios** - Cliente HTTP
- **React Hot Toast** - Notificações


## Páginas

- `/login` - Login de usuários
- `/register` - Registro de novos usuários
- `/books` - Lista de livros
- `/books/new` - Criar novo livro
- `/books/[id]/edit` - Editar livro

## Autenticação

O sistema usa JWT tokens que são armazenados no localStorage. Ao fazer login, o token é automaticamente incluído em todas as requisições para a API.

## Interface

A interface foi construída com TailwindCSS seguindo princípios modernos de design:

- Layout responsivo com sidebar fixa
- Cards para exibição de livros
- Formulários validados
- Feedback visual com toasts
- Busca em tempo real por título


## Funcionalidades

    Autenticação com JWT  
    CRUD completo de livros  
    Busca por título  
    Interface responsiva  
    Notificações em tempo real  
    Proteção de rotas  
    Feedback visual de loading  


## Documentação

- [Next.js](https://nextjs.org/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)
