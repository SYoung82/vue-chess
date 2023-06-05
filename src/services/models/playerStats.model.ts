export type PlayerStats = {
  chess_daily?: GameTypeStats;
  chess960_daily?: GameTypeStats;
  chess_rapid?: GameTypeStats;
  chess_bullet?: GameTypeStats;
  chess_blitz?: GameTypeStats;
  fide?: number;
  tactics?: LearningStats;
  lessons?: LearningStats;
  puzzle_rush?: PuzzleRushStats;
};

type GameTypeStats = {
  last?: {
    rating: number;
    date: number;
    rd: number;
  };
  best?: {
    rating: number;
    date: number;
    game: string;
  };
  record?: {
    win: number;
    loss: number;
    draw: number;
    timer_per_move: number;
    timeout_percent: number;
  };
  tournament?: {
    count: number;
    withdraw: number;
    points: number;
    highest_finish: number;
  };
};

type PuzzleRushStats = {
  best: {
    total_attempts: number;
    score: number;
  };
};

type LearningStats = {
  highest: {
    rating: number;
    date: number;
  };
  lowest: {
    rating: number;
    date: number;
  };
};
