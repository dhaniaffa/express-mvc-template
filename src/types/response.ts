export type ApiResponse = {
  status: number;
  message: string;
};

export type ResourceResponse<T> = ApiResponse & {
  data: T | T[] | null;
};
