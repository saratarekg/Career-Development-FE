export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UsersDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UserScoresDTO {
  userId: string;
  score: number;
}

export interface UserScoreboardDTO {
  firstName: string;
  lastName: string;
  score: number;
  levelName: string;
  rank: number;
}

export interface PaginatedUsers {
  content: UsersDTO[];
  totalElements: number;
  totalPages: number;
  size: number;
}

export interface UserJourneyDTO {
  firstName: string;
  lastName: string;
  score: number;

}


