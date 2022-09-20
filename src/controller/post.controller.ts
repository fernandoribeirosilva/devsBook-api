import { Request, Response } from "express";
import { CreatePostService } from "../services/post/create.post.service";

class PostController {
  async newPost(req: Request, res: Response) {
    const user: any = res.locals.loggedUser;
    const { post } = req.body;
    const file = req.file;

    try {
      const data = await CreatePostService.execute(user.id, post, file);
      res.status(201).json({ data });
      return;
    } catch (error: InstanceType<Error>) {
      res.status(400).json({ error: error.message });
      return;
    }
  }
}

export { PostController };
