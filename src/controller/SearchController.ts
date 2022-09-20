import { Request, Response } from "express";
import { SearchService } from "../services/user/search.service";

class SearchController {
  async search(req: Request, res: Response) {
    const loggedUser = res.locals.loggedUser;
    let search = req.query.s;

    try {
      const dataSearch = await SearchService.index(String(search));

      res.status(200).json({
        user: loggedUser,
        data: dataSearch,
      });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }
}

export { SearchController };
