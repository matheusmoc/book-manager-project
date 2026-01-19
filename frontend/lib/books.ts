import api from './api';

export interface Book {
  id: number;
  title: string;
  author: string;
  year?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookDto {
  title: string;
  author: string;
  year?: number;
  description?: string;
}

export const booksService = {
  async getAll(title?: string): Promise<Book[]> {
    const response = await api.get('/books', {
      params: title ? { title } : {},
    });
    return response.data;
  },

  async getById(id: number): Promise<Book> {
    const response = await api.get(`/books/${id}`);
    return response.data;
  },

  async create(data: CreateBookDto): Promise<Book> {
    const response = await api.post('/books/create', data);
    return response.data;
  },

  async update(id: number, data: Partial<CreateBookDto>): Promise<Book> {
    const response = await api.patch(`/books/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};
