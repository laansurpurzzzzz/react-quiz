import cc from 'classcat';

import { ArrowIcon } from '@/components/arrow-icon/arrow-icon.tsx';
import { useQuiz } from '@/components/quiz/use-quiz.ts';
import { QuizQuestion } from '@/components/quiz-question/quiz-question.tsx';
import { QuizStatistics } from '@/components/quiz-statistics/quiz-statistics.tsx';
import { QuizStatusBar } from '@/components/quiz-status-bar/quiz-status-bar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Card, CardFooter } from '@/components/ui/card.tsx';
import { Form } from '@/components/ui/form.tsx';
import { QuizQuestionModelProps } from '@/shared/constants/quiz.ts';

export type AnswerStatus = 'correct' | 'incorrect' | 'partlyCorrect';

export interface QuizProps {
  quizData: QuizQuestionModelProps[] | undefined;
}

export const Quiz = ({ quizData }: QuizProps) => {
  if (!quizData) return null;
  const {
    answersStatus,
    currentQuestionIndex,
    formMethods,
    onNextQuestion,
    onPrevQuestion,
    onQuizComplete,
    onSetQuestionIndex,
    onSubmit,
    questionsLength,
    isCompleted,
    isSubmitted,
    scorePercentage,
  } = useQuiz({ quizData });

  return (
    <Card
      className={cc([
        'flex w-full max-w-[600px] flex-col items-start justify-center gap-4',
      ])}
    >
      <QuizStatusBar
        answersStatus={answersStatus}
        currentQuestionIndex={currentQuestionIndex}
        isSubmitted={isSubmitted}
        questionsLength={questionsLength}
        setQuestionIndex={onSetQuestionIndex}
      />

      <Form {...formMethods}>
        <form
          className={cc([{ hidden: isCompleted }])}
          onSubmit={formMethods.handleSubmit(onSubmit)}
        >
          {quizData?.map((item, index) => (
            <QuizQuestion
              key={item.questionName}
              isVisible={currentQuestionIndex === index}
              question={item}
            />
          ))}

          <CardFooter className='flex w-full items-center justify-between'>
            {currentQuestionIndex !== 0 && (
              <Button onClick={onPrevQuestion}>
                <ArrowIcon className='rotate-180' />
              </Button>
            )}
            {quizData?.length &&
              currentQuestionIndex !== quizData?.length - 1 && (
                <Button className='ml-auto' onClick={onNextQuestion}>
                  <ArrowIcon />
                </Button>
              )}
            {quizData?.length &&
              currentQuestionIndex !== quizData?.length - 1 && (
                <span className='flex justify-center gap-3'>
                  <Button type='submit' onClick={onQuizComplete}>
                    {isSubmitted ? 'Результаты' : 'Завершить'}
                  </Button>
                </span>
              )}
          </CardFooter>
        </form>
      </Form>
      {isCompleted && <QuizStatistics score={scorePercentage} />}
    </Card>
  );
};
