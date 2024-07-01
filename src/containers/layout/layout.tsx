import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton.tsx';

export const Layout = () => (
  <div className='flex size-full flex-1 flex-col items-center justify-center p-3'>
    <Suspense fallback={<Skeleton className='sze-full m-2 rounded-lg' />}>
      <Outlet />
    </Suspense>
  </div>
);
