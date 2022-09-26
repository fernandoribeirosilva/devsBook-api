import { Request, Response } from "express";

export class LikeController {
  async like(req: Request, res: Response) {
    try {
      const loggedUser = res.locals.loggedUser;

    } catch (error: InstanceType<Error>) {
      return res.status(404).json({ error: error.message });
    }
  }
}