import 'dotenv/config';
import PostRepository from "../../repositories/post.repository";
import UserRepository from "../../repositories/user.repository";
import { Post } from "../../types/Post";

export type UserList = {
  id?: number;
  user_from?: number;
  user_to?: number;
  mine?: boolean;
};

class GetHomeFeedService {
  static async execute(id_user: number, page: number) {
    let totalPosts = 0;
    const perPage = 2;

    // 1. pegar lista de usuários que EU sigo.
    const userList = await UserRepository.findFollowing(id_user);
    let user: number[] = [];
    if (userList) {
      userList.forEach((data) => {
        user.push(data.user_from);
      });
      user.push(id_user);
    }

    // 2. pegar os posts dessa galera e ordenar por data.
    const postList = await PostRepository.getHomeFeed(user, page, perPage);
    const post: Post[] = [];

    if (postList) {
      postList.forEach((data) => {
        post.push({
          id: data.id,
          type: data.type,
          body: data.body,
          created_at: data.created_at,
          like_cont: data.like_cont,
          mine: data.user_id === id_user ?? false,
          like: data.post_like,
          comment: data.post_comment,
          user: {
            id: data.user?.id,
            name: data.user?.name,
            avatar: `${process.env.BASE_URL}/media/avatars/${data.user?.avatar}`,
          },
        });
      });
    }

    const total = await PostRepository.countTotalPosts(user);
    total.forEach((post) => {
      totalPosts += post._count.post;
    });

    // vai fazer uma conta para eu ter a quantidade de páginas (paginação)
    const pageCount = Math.ceil(totalPosts / perPage);

    return {
      post,
      pageCount: pageCount,
      currentPage: page,
    } 
  }
}

export { GetHomeFeedService };
