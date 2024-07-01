import { lazy } from 'react';

export const QuizPageLazy = lazy(() =>
  import('./quiz-page').then((res) => ({
    default: res.QuizPage,
  })),
);
