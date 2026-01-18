import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Books Flow (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let createdBookId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      transform: true,
      whitelist: true,
    }));
    await app.init();

    // Registrar e fazer login para obter token
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'testuser',
        password: 'testpass123',
      });

    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'testuser',
        password: 'testpass123',
      });

    authToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /books/create', () => {
    it('deve criar um novo livro com sucesso', () => {
      return request(app.getHttpServer())
        .post('/books/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Clean Code',
          author: 'Robert C. Martin',
          year: 2008,
          description: 'Um guia sobre código limpo',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('id');
          expect(response.body.title).toBe('Clean Code');
          expect(response.body.author).toBe('Robert C. Martin');
          expect(response.body.year).toBe(2008);
          createdBookId = response.body.id;
        });
    });

    it('deve retornar erro 400 ao enviar dados inválidos', () => {
      return request(app.getHttpServer())
        .post('/books/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: '',
          author: '',
        })
        .expect(400);
    });

    it('deve retornar erro 401 sem autenticação', () => {
      return request(app.getHttpServer())
        .post('/books/create')
        .send({
          title: 'Test Book',
          author: 'Test Author',
        })
        .expect(401);
    });
  });

  describe('GET /books', () => {
    it('deve listar todos os livros', () => {
      return request(app.getHttpServer())
        .get('/books')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body.length).toBeGreaterThan(0);
        });
    });

    it('deve filtrar livros por título', () => {
      return request(app.getHttpServer())
        .get('/books?title=Clean')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
          expect(response.body[0].title).toContain('Clean');
        });
    });
  });

  describe('GET /books/:id', () => {
    it('deve buscar um livro específico por id', () => {
      return request(app.getHttpServer())
        .get(`/books/${createdBookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(createdBookId);
          expect(response.body.title).toBe('Clean Code');
        });
    });

    it('deve retornar erro 404 para id inexistente', () => {
      return request(app.getHttpServer())
        .get('/books/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('PATCH /books/:id', () => {
    it('deve atualizar um livro existente', () => {
      return request(app.getHttpServer())
        .patch(`/books/${createdBookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          year: 2009,
          description: 'Descrição atualizada',
        })
        .expect(200)
        .then((response) => {
          expect(response.body.year).toBe(2009);
          expect(response.body.description).toBe('Descrição atualizada');
          expect(response.body.title).toBe('Clean Code');
        });
    });

    it('deve retornar erro 404 ao atualizar id inexistente', () => {
      return request(app.getHttpServer())
        .patch('/books/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          year: 2020,
        })
        .expect(404);
    });
  });

  describe('DELETE /books/:id', () => {
    it('deve remover um livro existente', () => {
      return request(app.getHttpServer())
        .delete(`/books/${createdBookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);
    });

    it('deve retornar erro 404 ao tentar remover novamente', () => {
      return request(app.getHttpServer())
        .delete(`/books/${createdBookId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
