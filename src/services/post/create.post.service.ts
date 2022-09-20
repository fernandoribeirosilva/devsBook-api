import { post } from "@prisma/client";
import validator from "validator";
import { uploadPhoto } from "../../helpers/uploadPhoto";
import PostRepository from "../../repositories/post.repository";

class CreatePostService {
  static async execute(
    user_id: number,
    body: string,
    file: Express.Multer.File | undefined
  ) {
    let post: post;
    let type = typeof body === "string" ? "text" : "photo";

    if (type === "text") {
      if (validator.isEmpty(String(body))) {
        throw new Error("O campo não pode estar vazio.");
      }

      try {
        post = await PostRepository.save({
          body: body.trim(),
          type,
          user_id,
        });
      } catch (error) {
        throw new Error("Erro ao salvar o post.");
      }
    } else {
      try {
        const photoName = await uploadPhoto(
          file,
          "./public/media/photo/",
          200,
          null
        );

        post = await PostRepository.save({
          body: photoName,
          type,
          user_id,
        });
      } catch (error) {
        throw new Error("Erro ao salvar o post.");
      }
    }

    return post;
  }
}

export { CreatePostService };
