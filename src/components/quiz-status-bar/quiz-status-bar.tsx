import cc from 'classcat';

import { AnswerStatus } from '@/components/quiz/quiz.tsx';

interface QuizStatusBarProps {
  answersStatus: AnswerStatus[] | [];
  currentQuestionIndex: number;
  isSubmitted: boolean;
  questionsLength: number;
  setQuestionIndex: (index: number) => void;
}

export const QuizStatusBar = ({
  questionsLength,
  isSubmitted,
  answersStatus,
  currentQuestionIndex,
  setQuestionIndex,
}: QuizStatusBarProps) => {
  const isCompleted = !!answersStatus.length;

  return (
    <div className='mt-4 flex w-full items-center justify-center gap-2 px-6'>
      {Array.from({ length: questionsLength }).map((_, index) => (
        <span
          key={`quizStatusBarItem-${index + 1}`}
          className={cc([
            'h-4 w-full cursor-pointer rounded-lg transition-all duration-300',
            {
              'bg-gray-500': currentQuestionIndex !== index && !isSubmitted,
              'bg-green-500':
                isCompleted &&
                answersStatus[index] === 'correct' &&
                isSubmitted &&
                currentQuestionIndex !== index,
              'bg-primary': currentQuestionIndex === index,
              'bg-red-500':
                isCompleted &&
                answersStatus[index] === 'incorrect' &&
                isSubmitted &&
                currentQuestionIndex !== index,
              'bg-yellow-500':
                isCompleted &&
                answersStatus[index] === 'partlyCorrect' &&
                isSubmitted &&
                currentQuestionIndex !== index,
            },
          ])}
          onClick={() => setQuestionIndex(index)}
        />
      ))}
    </div>
  );
};
