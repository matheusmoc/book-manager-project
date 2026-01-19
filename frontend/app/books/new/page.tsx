'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { booksService } from '@/lib/books';

export default function NewBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    description: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.author) {
      toast.error('Título e autor são obrigatórios');
      return;
    }

    setLoading(true);

    try {
      const bookData = {
        title: formData.title,
        author: formData.author,
        year: formData.year ? parseInt(formData.year) : undefined,
        description: formData.description || undefined,
      };

      await booksService.create(bookData);
      toast.success('Livro criado com sucesso!');
      router.push('/books');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar livro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Link
          href="/books"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar para lista
        </Link>
      </div>

      <div className="card">
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-medium">
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Novo Livro
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Adicione um novo livro à sua coleção
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="mb-2.5 block text-sm font-medium text-gray-900 dark:text-white">
              Título <span className="text-danger-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input"
              placeholder="Digite o título do livro"
            />
          </div>

          <div>
            <label htmlFor="author" className="mb-2.5 block text-sm font-medium text-gray-900 dark:text-white">
              Autor <span className="text-danger-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="input"
              placeholder="Digite o nome do autor"
            />
          </div>

          <div>
            <label htmlFor="year" className="mb-2.5 block text-sm font-medium text-gray-900 dark:text-white">
              Ano de Publicação
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1000"
              max="2100"
              className="input"
              placeholder="Ex: 2024"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2.5 block text-sm font-medium text-gray-900 dark:text-white">
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="input resize-none"
              placeholder="Digite uma breve descrição do livro"
            />
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex flex-1 items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Salvar Livro
                </>
              )}
            </button>

            <Link
              href="/books"
              className="btn-secondary flex flex-1 items-center justify-center gap-2"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
