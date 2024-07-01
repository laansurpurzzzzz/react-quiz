import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './containers/layout/layout.tsx';

import { HomePageLazy } from '@/containers/pages/home-page/home-page.lazy.tsx';
import { QuizPageLazy } from '@/containers/pages/quiz-page/quiz-page.lazy.ts';

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        Component: HomePageLazy,
        id: 'test-list',
        index: true,
        path: '/',
      },
      {
        Component: QuizPageLazy,
        id: 'quiz',
        index: true,
        path: 'quiz',
      },
    ],
    errorElement: <div>Ошибка</div>,
    id: 'main',
    path: '/',
  },
]);

export const App = () => (
  <RouterProvider
    fallbackElement={<div className='flex-1 p-4'>Загрузка</div>}
    router={router}
  />
);
