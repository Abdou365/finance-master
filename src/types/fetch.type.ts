export type DBResponseType<T> = {
  statusCode: number;
  data: T;
  messgae: string;
};
