import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './containers/layout/layout.tsx';

const router = createBrowserRouter([
  {
    Component: Layout,
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
