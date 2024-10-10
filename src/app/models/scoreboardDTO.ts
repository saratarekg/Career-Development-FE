export interface ScoreboardLevelsDTO {
  id: string;
  levelName: string;
  minScore: number;
}
export interface PaginatedScoreboardLevelsDTO {
  content: ScoreboardLevelsDTO[]; // The array of scoreboard levels
  totalElements: number;           // Total number of elements
  totalPages: number;              // Total number of pages
  size: number;                    // Number of items per page
  number: number;                  // Current page number
}
