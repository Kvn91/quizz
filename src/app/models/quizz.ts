export type Question = {
  title: string;
  options: string[];
  answer: string;
};

export type QuestionsList = Question[];

export type QuestionForm = {
  index: number;
  question: Question;
};
