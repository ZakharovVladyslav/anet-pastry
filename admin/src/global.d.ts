type Nullable<T> = T | null;
type Maybe<T> = T | undefined;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SERVER_URL: string;
      JWT_SECRET: string;
    }
  }
}
