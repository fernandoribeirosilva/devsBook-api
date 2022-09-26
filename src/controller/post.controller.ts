import { Request, Response } from "express";
import { CreatePostService } from "../services/post/create.post.service";
import { PostLiked } from "../services/post/postLiked.service";

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

  async like(req: Request, res: Response) {
    try {
      const loggedUser = res.locals.loggedUser;
      const { id } = req.params;

      const like = PostLiked.liked(+id, loggedUser.id);
      return res.status(200).json({ like })

    } catch (error: InstanceType<Error>) {
      return res.status(404).json({ error: error.message });
    }
  }
}

export { PostController };
