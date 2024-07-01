import { createEvent, createStore } from 'effector';

import { AnswerStatus } from '@/components/quiz/quiz.tsx';

export interface QuizStore {
  answersStatus: AnswerStatus[] | [];
  currentQuestionIndex: number;
  isCompleted: boolean;
  scorePercentage: number;
}

export const setAnswersStatus = createEvent<AnswerStatus[]>();
export const setQuestionIndex = createEvent<number>();
export const setIsQuizComplete = createEvent<boolean>();
export const setQuizScore = createEvent<number>();
export const clearQuiz = createEvent();

export const $quiz = createStore<QuizStore>({
  answersStatus: [],
  currentQuestionIndex: 0,
  isCompleted: false,
  scorePercentage: 0,
})
  .on(setAnswersStatus, (state, payload) => ({
    ...state,
    answersStatus: payload,
  }))
  .on(setQuestionIndex, (state, payload) => ({
    ...state,
    currentQuestionIndex: payload,
  }))
  .on(setIsQuizComplete, (state, payload) => ({
    ...state,
    isCompleted: payload,
  }))
  .on(setQuizScore, (state, payload) => ({
    ...state,
    scorePercentage: payload,
  }))
  .reset(clearQuiz);
