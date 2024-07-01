export interface QuizQuestionModelProps {
  answers: Answer[];
  correctAnswer: string | string[];
  questionName: string;
  questionTitle: string;
}

export interface Answer {
  answer: string;
  name: string;
}
