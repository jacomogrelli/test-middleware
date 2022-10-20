export {};

declare global {
  namespace Express {
    export interface Request {
      user: any;
      api: any;
    }
  }
}
