import { LikeRepository } from "../../repositories/like.repository";

export class PostLiked {
  static async liked(postId: number, userId: number) {
    const isLiked = await LikeRepository.postLike(postId, userId);
    if (isLiked) {
      await LikeRepository.deletLike(postId, userId);
    } else {
      await LikeRepository.addLike(postId, userId);
    }
  }
}