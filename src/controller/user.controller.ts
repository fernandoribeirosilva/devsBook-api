import { Request, Response } from "express";
import { UpdateService } from "../services/user/update.service";

class UserController {
  async update(req: Request, res: Response) {
    const user = res.locals.loggedUser;
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const { avatar, capa } = files;
    const { body } = req;

    try {
      // Birthdate format YYYY-MM-DD
      const data = await UpdateService.execute(user, body, avatar, capa);
      res.status(200).json({ data });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }
}

export { UserController };
