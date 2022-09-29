import 'dotenv/config';
import { LikeRepository } from '../../repositories/like.repository';
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
      postList.forEach(async (dataPost) => {
        let liked = await LikeRepository.postLike(dataPost.id, id_user);

        const comment = dataPost.post_comment.map(comment => {
          return {
            id: comment.id,
            body: comment.body,
            created_at: new Date(comment.created_at),
            user: {
              avatar: `${process.env.BASE_URL}/media/avatars/${comment.user?.avatar}`,
              name: comment.user?.name,
            }
          }
        })

        post.push({
          id: dataPost.id,
          type: dataPost.type,
          body: dataPost.body,
          created_at: dataPost.created_at,
          like_cont: dataPost.like_cont,
          liked,
          mine: dataPost.user_id === id_user ?? false,
          comment,
          user: {
            id: dataPost.user?.id,
            name: dataPost.user?.name,
            avatar: `${process.env.BASE_URL}/media/avatars/${dataPost.user?.avatar}`,
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
