import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';

import { Quiz } from '@/components/quiz/quiz.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';
import { fetchQuiz } from '@/shared/api/quiz.ts';
import { clearQuiz } from '@/shared/models/quiz.ts';

export const QuizPage = () => {
  const { data, isLoading } = useQuery({
    queryFn: () => fetchQuiz.react(),
    queryKey: ['fetchQuiz'],
  });

  return (
    <>
      <NavLink
        className='absolute left-3 top-3 text-2xl font-bold text-primary'
        to='/'
        onClick={() => clearQuiz()}
      >
        На главную
      </NavLink>
      {isLoading ? (
        <Skeleton className='m-2 size-full' />
      ) : (
        <Quiz quizData={data} />
      )}
    </>
  );
};
