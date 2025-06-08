export interface TajwidError {
  Aya: number;
  Title: string;
  ErrorCodes: string;
}

export interface TajwidErrorResponse {
  count: number;
  errors: TajwidError[];
}