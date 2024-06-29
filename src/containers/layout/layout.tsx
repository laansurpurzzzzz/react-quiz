import { Suspense } from 'react';

import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <div className='flex size-full flex-1 items-center justify-center'>
    <Suspense fallback={<div className=''} />}>
      <Outlet />
    </Suspense>
  </div>
);
