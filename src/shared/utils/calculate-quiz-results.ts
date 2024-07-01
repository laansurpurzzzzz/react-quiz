import { getIntersectionCount } from './get-intersection-count';

export interface QuizResults {
  results: ('correct' | 'partlyCorrect' | 'incorrect')[];
  totalScore: number;
}

export const calculateQuizResults = (
  data: Record<string, string | string[]>,
  correctAnswers: Record<string, string | string[]>,
  questionsLength: number,
): QuizResults => {
  let score = 0;
  const results: ('correct' | 'partlyCorrect' | 'incorrect')[] = [];

  for (const key in data) {
    if (Array.isArray(data[key])) {
      const correctAnswersTotal = (correctAnswers[key] as string[]).length;
      const correctAnswersCount = getIntersectionCount(
        correctAnswers[key] as string[],
        data[key] as string[],
      );

      if (correctAnswersCount === correctAnswersTotal) {
        results.push('correct');
        score += 1;
      } else if (correctAnswersCount > 0) {
        results.push('partlyCorrect');
        score += correctAnswersCount / correctAnswersTotal;
      } else {
        results.push('incorrect');
      }
    } else {
      const isCorrect = data[key] === correctAnswers[key];

      if (isCorrect) {
        results.push('correct');
        score += 1;
      } else {
        results.push('incorrect');
      }
    }
  }

  const totalScore =
    score === 0 ? 0 : Math.round((score / questionsLength) * 100);

  return { results, totalScore };
};
