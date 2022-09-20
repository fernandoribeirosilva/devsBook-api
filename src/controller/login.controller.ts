import { Request, Response } from "express";
import { CreateUseService } from "../services/user/create.user.service";

const createUseService = new CreateUseService();

class LoginController {
  constructor() {}

  async signin(req: Request, res: Response) {
    try {
      const { body } = req;
      const data = await createUseService.signinAction(body);
      res.status(200).json({ data: data });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  async signup(req: Request, res: Response) {
    try {
      const { body } = req;

      const data = await createUseService.signupAction(body);
      res.status(201).json({ data });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }
}

export { LoginController };
