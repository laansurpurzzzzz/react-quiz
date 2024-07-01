import cc from 'classcat';

import { Button } from '@/components/ui/button.tsx';
import { useGetParams } from '@/shared/hooks/use-get-params.ts';
import { useNickname } from '@/shared/hooks/use-nickname.ts';
import { useQuizResults } from '@/shared/hooks/use-quiz-results.ts';
import { clearQuiz, setIsQuizComplete } from '@/shared/models/quiz.ts';

interface QuizStatisticsProps {
  score: number;
}

export const QuizStatistics = ({ score }: QuizStatisticsProps) => {
  const { nickname } = useNickname();
  const { results } = useQuizResults();
  const { resetUrlSearchParams } = useGetParams();

  const onRetry = () => {
    resetUrlSearchParams();
    clearQuiz();
  };

  const onSeeResults = () => {
    setIsQuizComplete(false);
  };

  return (
    <div className='flex w-full flex-col gap-4 p-6'>
      <h1 className='text-2xl'>
        <span>Привет, {nickname}! Твой результат: </span>
        <span
          className={cc([
            {
              'text-green-500': score >= 75,
              'text-red-500': score < 50,
              'text-yellow-500': score < 75 && score >= 50,
            },
          ])}
        >
          {score}
        </span>
      </h1>
      {!!results?.length && (
        <div className='m-4 flex flex-col gap-4'>
          <span className='text-xl'>Предыдущие результаты:</span>
          {results.map((item) => (
            <div className='flex w-full gap-3'>
              <span>Никнейм: {item.nickname}</span>
              <span>Результат: </span>
              <span
                className={cc([
                  {
                    'text-green-500': score >= 75,
                    'text-red-500': score < 50,
                    'text-yellow-500': score < 75 && score >= 50,
                  },
                ])}
              >
                {item.score}
              </span>
              <span>Время завершения: </span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      )}
      <div className='flex gap-4'>
        <Button className='w-full' onClick={onSeeResults}>
          Посмотреть разбор
        </Button>

        <Button className='w-full' onClick={onRetry}>
          Решить еще раз
        </Button>
      </div>
    </div>
  );
};
