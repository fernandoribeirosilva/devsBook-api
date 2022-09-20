import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import UserRepository from "../repositories/user.repository";

interface PayloadProps {
  token: string;
}

export class Auth {
  async private(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: "Não autorizado" });
    }

    const [authType, tokenUser] = req.headers.authorization.split(" ");

    if (authType === "Bearer") {
      try {
        const payload = JWT.verify(tokenUser, process.env.JWT_SECRET as string);
        const { token } = payload as PayloadProps;

        const user = await UserRepository.findByToken(token);
        if (!user) {
          throw new Error("Não autorizado");
        }

        res.locals.loggedUser = user;
        next();
      } catch (error: InstanceType<Error>) {
        res.status(401).json({ error: "Não autorizado" });
        return;
      }
    }
  }
}

export default new Auth();
