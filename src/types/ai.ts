export type CorrectSolution = {
  commendations: string[];
  suggestions: string[];
  edge_cases: string[];
  performance_notes: string[];
  can_proceed: boolean;
};

export type IncorrectSolution = {
  input: string;
  expected: string;
  output: string;
  issue: string;
  can_proceed: boolean;
};

export type TipsPayload = {
  tips: string[];
};

export type TriviaPayload = {
  trivia: {
    question: string;
    options: string[];
    correctOptionIndex: number;
  }[];
};
