import { Request, Response } from "express";

export type MyContext = {
  req: Request & {
    session: Express.Session & { userId?: string } & { merchantId?: string };
  };
  res: Response;
};
