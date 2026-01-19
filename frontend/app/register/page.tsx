'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { authService, RegisterData } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await authService.register(formData);
      toast.success('Conta criada com sucesso!');
      setTimeout(() => router.push('/login'), 1500);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <Toaster position="top-right" />
      
      <div className="w-full max-w-md">
        <div className="rounded-lg bg-white px-8 py-10 shadow-lg dark:bg-gray-800">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900">
              <svg className="h-10 w-10 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Book Manager</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Crie sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="mb-2.5 block text-sm font-medium text-gray-900 dark:text-white">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="seu_usuario"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2.5 block text-sm font-medium text-gray-900 dark:text-white">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Mínimo de 6 caracteres</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary-600 px-5 py-3 text-center font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                  Criando conta...
                </span>
              ) : (
                'Criar conta'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Fazer login
            </Link>
          </p>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
