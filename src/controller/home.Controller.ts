import { Request, Response } from "express";
import { GetHomeFeedService } from "../services/user/get.homeFeed.service";

export class HomeController {

   async index(req: Request, res: Response) {
      const loggedUser = res.locals.loggedUser;
      let { page } = req.query;

      try {
         let skip = page ? +page : 0;
         const feed = await GetHomeFeedService.execute(loggedUser.id, skip);

         res.status(200).json({ data: feed });
      } catch (error: any) {
         res.status(400).json({ error: error.message });
         return;
      }
   }

}