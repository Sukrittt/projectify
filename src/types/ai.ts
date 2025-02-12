export type CorrectSolution = {
  commendations: string[];
  suggestions: string[];
  edge_cases: string[];
  can_proceed: boolean;
};

export type IncorrectSolution = {
  input: any;
  expected: any;
  output: any;
  issue: string;
  can_proceed: boolean;
};
