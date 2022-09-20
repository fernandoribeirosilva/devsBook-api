import { prisma } from "../config/prisma";
import { NewPost } from "../types/Post";

class PostRepository {
  async save(data: NewPost) {
    return await prisma.post.create({
      data: {
        type: data.type,
        body: data.body,
        user: {
          connect: {
            id: data.user_id,
          },
        },
      },
    });
  }

  async geUserFeed(user_id: number, page: number, perPage: number) {
    return await prisma.post.findMany({
      skip: page, // vai pular ate a pagina
      take: perPage, // vai mostrar o tanto de posts que foi passado para perPage
      where: {
        user_id: {
          equals: user_id,
        },
      },
      select: {
        id: true,
        type: true,
        body: true,
        like_cont: true,
        created_at: true,
        user_id: true,
        post_comment: {
          where: {
            user_id,
          },
          select: {
            id: true,
            body: true,
            created_at: true,
          },
        },
        post_like: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async getHomeFeed(userList: number[], page: number, perPage: number) {
    return await prisma.post.findMany({
      skip: page, // vai pular ate a pagina
      take: perPage, // vai mostrar o tanto de posts que foi passado para perPage
      where: {
        user_id: {
          in: userList,
        },
      },
      select: {
        id: true,
        type: true,
        body: true,
        created_at: true,
        like_cont: true,
        user_id: true,
        post_like: {
          select: {
            id: true,
            liked: true,
          },
        },
        post_comment: {
          select: {
            id: true,
            body: true,
            created_at: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
  }

  async countTotalPosts(user: number[] | number) {
    return await prisma.user.findMany({
      where: {
        id: {
          in: user,
        },
      },
      select: {
        _count: {
          select: {
            post: true,
          },
        },
      },
    });
  }

  async getPhotosFrom(id: number) {
    return await prisma.post.findMany({
      where: {
        user_id: {
          equals: id,
        },
        type: {
          equals: "photo",
        },
      },
      select: {
        id: true,
        body: true,
        type: true,
        created_at: true,
      },
    });
  }
}

export default new PostRepository();
