import 'dotenv/config'
import { Request, Response } from "express";
import { FollowService } from "../services/user/follow.service";
import { GetFeed } from "../services/user/get.feed.service";
import { FriendsService } from "../services/user/get.friends.service";
import { PhotosService } from "../services/user/get.photos.service";

class ProfileController {
  async index(req: Request, res: Response) {
    const loggedUser = res.locals.loggedUser;
    let { page } = req.query;

    try {
      let skip = page ? +page : 0;
      const idUser: number = req.params.id
        ? parseInt(req.params.id)
        : loggedUser.id;

      const dataFeed = await GetFeed.execute(idUser, true, skip, loggedUser.id);

      res.status(200).json({
        loggedUser: {
          id: loggedUser.id,
          name: loggedUser.name,
          email: loggedUser.email,
          avatar: `${process.env.BASE_URL}/media/avatars/${loggedUser.avatar}`,
          cover: `${process.env.BASE_URL}/media/covers/${loggedUser.cover}`,
        },
        feedUser: dataFeed,
      });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  async follow(req: Request, res: Response) {
    const loggedUser = res.locals.loggedUser;
    const { id } = req.params;

    try {
      await FollowService.follow(loggedUser.id, +id);
      res.status(201).json({});
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  async friends(req: Request, res: Response) {
    const loggedUser = res.locals.loggedUser;
    try {
      const idUser: number = req.params.id
        ? parseInt(req.params.id)
        : loggedUser.id;

      const feed = await FriendsService.getFriends(idUser, loggedUser.id);
      res.status(200).json({ feed });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }

  async photos(req: Request, res: Response) {
    const loggedUser = res.locals.loggedUser;

    try {
      const idUser: number = req.params.id
        ? parseInt(req.params.id)
        : loggedUser.id;

      const data = await PhotosService.getPhotos(idUser, loggedUser.id);

      res.status(200).json({ data });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }
}

export { ProfileController };
