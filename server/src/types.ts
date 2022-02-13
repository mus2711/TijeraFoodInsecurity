import { Request, Response } from "express";

export type MyContext = {
  req: Request & {
    session: { userId?: string } & { merchantId?: string };
  };
  res: Response;
};
