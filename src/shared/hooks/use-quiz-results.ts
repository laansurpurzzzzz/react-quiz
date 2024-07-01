import { useLocalStorage } from 'usehooks-ts';

export interface QuizResult {
  nickname: string;
  score: number;
  time: string;
}

export const useQuizResults = () => {
  const [results, setResults] = useLocalStorage<QuizResult[]>(
    'quizResults',
    [],
  );

  const saveResult = (nickname: string, score: number, time: string) => {
    const newResult: QuizResult = { nickname, score, time };
    const updatedResults = [...results, newResult];

    setResults(updatedResults);
  };

  return {
    results,
    saveResult,
  };
};
