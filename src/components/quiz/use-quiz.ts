import { MouseEvent, useEffect } from 'react';

import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { useForm } from 'react-hook-form';

import { QuizQuestionModelProps } from '@/shared/constants/quiz.ts';
import { useGetParams } from '@/shared/hooks/use-get-params.ts';
import { useNickname } from '@/shared/hooks/use-nickname.ts';
import { useQuizResults } from '@/shared/hooks/use-quiz-results.ts';
import {
  $quiz,
  setAnswersStatus,
  setIsQuizComplete,
  setQuestionIndex,
  setQuizScore,
} from '@/shared/models/quiz.ts';
import { calculateQuizResults } from '@/shared/utils/calculate-quiz-results.ts';

export interface UseQuizProps {
  quizData: QuizQuestionModelProps[];
}

export const useQuiz = ({ quizData }: UseQuizProps) => {
  const { saveResult } = useQuizResults();
  const { nickname } = useNickname();

  const questionsLength = quizData.length;
  const { paramsEntries, updateSearchParams } = useGetParams<{
    currentQuestionIndex: string;
    isQuizComplete: string;
  }>();
  const quizStore = useUnit($quiz);
  const formMethods = useForm();

  const correctAnswers = quizData.reduce(
    (acc: Record<string, string | string[]>, item) => {
      acc[item.questionName] = item.correctAnswer;

      return acc;
    },
    {},
  );

  const onNextQuestion = (e: MouseEvent) => {
    e.preventDefault();
    const nextIndex = quizStore.currentQuestionIndex + 1;

    updateSearchParams({ key: 'currentQuestionIndex', value: nextIndex });

    setQuestionIndex(nextIndex);
  };
  const onPrevQuestion = (e: MouseEvent) => {
    e.preventDefault();
    const nextIndex = quizStore.currentQuestionIndex - 1;

    updateSearchParams({ key: 'currentQuestionIndex', value: nextIndex });

    setQuestionIndex(nextIndex);
  };

  const onQuizComplete = (e: MouseEvent) => {
    if (formMethods.formState.isSubmitted) {
      console.log(formMethods.formState.isSubmitted);
      e.preventDefault();
    }
    setIsQuizComplete(true);
  };

  const onSetQuestionIndex = (index: number) => {
    if (quizStore.isCompleted) return;
    updateSearchParams({ key: 'currentQuestionIndex', value: index });
    setQuestionIndex(index);
  };

  const onSubmit = (data: Record<string, string | string[]>) => {
    const { results, totalScore } = calculateQuizResults(
      data,
      correctAnswers,
      questionsLength,
    );

    setAnswersStatus(results);
    setQuizScore(totalScore);

    saveResult(nickname, totalScore, dayjs().format('YYYY-MM-DD HH:mm'));
  };

  useEffect(() => {
    const isParams = Object?.keys(paramsEntries)?.length;

    if (isParams) {
      setQuestionIndex(Number(paramsEntries.currentQuestionIndex));
    }
  }, []);

  return {
    answersStatus: quizStore.answersStatus,
    currentQuestionIndex: quizStore.currentQuestionIndex,
    formMethods,
    isCompleted: quizStore.isCompleted,
    isSubmitted: formMethods.formState.isSubmitted,
    onNextQuestion,
    onPrevQuestion,
    onQuizComplete,
    onSetQuestionIndex,
    onSubmit,
    questionsLength,
    quizStore,
    scorePercentage: quizStore.scorePercentage,
  };
};
