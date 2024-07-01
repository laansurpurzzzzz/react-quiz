import { apiRequest, FetchResponse } from './api-request.ts';

import { QuizQuestionModelProps } from '@/shared/constants/quiz.ts';

export const fetchQuiz = {
  react: (): FetchResponse<QuizQuestionModelProps[]> =>
    apiRequest({ url: '/quiz.json' }),
};
