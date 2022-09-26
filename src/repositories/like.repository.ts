import { prisma } from "../config/prisma";

export class LikeRepository {
  static async likeCount(idPost: number) {
    return await prisma.post_like.count({
      where: {
        post_id: {
          equals: idPost
        }
      }
    })
  }

  static async postLike(postId: number, idUser: number): Promise<boolean> {
    const myLike = await prisma.post_like.findMany({
      where: {
        post_id: {
          equals: postId
        },
        user_id: {
          equals: idUser
        }
      }
    });

    return (myLike.length > 0) ? true : false;
  }

  static async deletLike(postId: number, userId: number) {
    return await Promise.all([
      prisma.post_like.deleteMany({
        where: {
          post_id: {
            equals: postId
          },
          user_id: {
            equals: userId
          }
        }
      }),

      prisma.post.updateMany({
        data: {
          like_cont: {
            increment: -1
          }
        },
        where: {
          id: {
            equals: postId
          },
          user_id: {
            equals: userId
          }
        }
      })
    ]);
  }

  static async addLike(postId: number, userId: number) {
    return await Promise.all([
      prisma.post.updateMany({
        data: {
          like_cont: {
            increment: 1
          }
        },
        where: {
          id: {
            equals: postId
          },
          user_id: {
            equals: userId
          }
        }
      }),

      prisma.post_like.create({
        data: {
          post_id: postId,
          user_id: userId
        }
      }),
    ]);
  }
}