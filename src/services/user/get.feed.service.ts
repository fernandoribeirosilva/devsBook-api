import "dotenv/config";
import { calculateAgeYears } from "../../helpers/calculate.ageYears";
import { FormatDate } from "../../helpers/format.date";
import { LikeRepository } from "../../repositories/like.repository";
import PostRepository from "../../repositories/post.repository";
import UserRepository from "../../repositories/user.repository";
import { Feed, Followers, Following, Photo } from "../../types/Feed";
import { Post } from "../../types/Post";

class GetFeed {
  static async execute(
    idUser: number,
    full: boolean = false,
    skip: number,
    loggedUser: number
  ) {
    const feed: Feed[] = [];
    const perPage = 2;

    if (full) {
      const data = await UserRepository.findById(idUser);
      if (!data) {
        throw new Error("Usuário não encontrado!");
      }

      let birthdate = FormatDate.execute(
        data.birthdate as string,
        "dd/mm/yyyy"
      );
      const ageYears = calculateAgeYears(birthdate);

      const followers = await GetFeed.getDataFollowers(idUser);
      const following = await GetFeed.getDataFollowing(idUser);
      const photo = await GetFeed.getDataPhoto(idUser);

      // Verificar se EU sigo o usuário
      const isFollowing = await GetFeed.verifyIfUserIsFollowing(
        loggedUser,
        idUser
      );

      // Pegando o feed do usuário
      const dataFeedUser = await PostRepository.geUserFeed(
        idUser,
        skip,
        perPage
      );

      const posts: Post[] = [];

      if (dataFeedUser) {
        dataFeedUser.map(async (data) => {
          let body: string;

          if (data.type === "text") {
            body = data.body;
          } else {
            body = `${process.env.BASE_URL}/media/photo/${data.body}`;
          }

          let liked = await LikeRepository.postLike(data.id, loggedUser);

          posts.push({
            id: data.id,
            type: data.type,
            body,
            mine: data.user_id === loggedUser ?? false,
            like_cont: data.like_cont,
            liked,
            created_at: data.created_at,
            comment: data.post_comment
          });
        });
      }

      const total = await PostRepository.countTotalPosts(idUser);
      let totalPosts = 0;
      total.forEach((post) => {
        totalPosts = post._count.post;
      });

      // vai fazer uma conta para eu ter a quantidade de páginas (paginação)
      const pageCount = Math.ceil(totalPosts / perPage);

      feed.push({
        id: data.id,
        name: data.name,
        birthdate,
        ageYears,
        city: data.city,
        work: data.work,
        avatar: `${process.env.BASE_URL}/media/avatars/${data.avatar}`,
        cover: `${process.env.BASE_URL}/media/covers/${data.cover}`,
        isFollowing,
        followers,
        following,
        photo,
        posts,
        pageCount: pageCount,
        currentPage: skip,
      });
    } else {
      const data = await UserRepository.findById(idUser);
      if (!data) {
        throw new Error("Usuário não encontrado!");
      }

      let birthdate = FormatDate.execute(
        data.birthdate as string,
        "dd/mm/yyyy"
      );
      const ageYears = calculateAgeYears(birthdate);

      feed.push({
        id: data.id,
        name: data.name,
        birthdate,
        ageYears,
        city: data.city,
        work: data.work,
        avatar: `${process.env.BASE_URL}/media/avatars/${data.avatar}`,
        cover: `${process.env.BASE_URL}/media/covers/${data.cover}`,
      });
    }

    return feed;
  }

  static async verifyIfUserIsFollowing(
    loggedUser: number,
    idUser: number
  ): Promise<boolean> {
    const data = await UserRepository.isFollowing(loggedUser, idUser);
    if (data) {
      return true;
    }
    return false;
  }

  static async getDataFollowers(id: number): Promise<Followers[]> {
    let followers: Followers[] = [];

    const followersData = await UserRepository.findFollowers(id);
    if (followersData) {
      followersData.forEach(async (followersData) => {
        const useData = await UserRepository.findById(followersData.user_to);
        if (!useData) {
          throw new Error("Usuário não encontrado!");
        }

        followers.push({
          id: useData.id,
          name: useData.name,
          avatar: `${process.env.BASE_URL}/media/avatars/${useData.avatar}`,
        });
      });
    }

    return followers;
  }

  static async getDataFollowing(id: number): Promise<Following[]> {
    let following: Following[] = [];

    const followingData = await UserRepository.findFollowing(id);
    if (followingData) {
      followingData.forEach(async (data) => {
        const useData = await UserRepository.findById(data.user_from);
        if (!useData) {
          throw new Error("Usuário não encontrado!");
        }

        following.push({
          id: useData.id,
          name: useData.name,
          avatar: `${process.env.BASE_URL}/media/avatars/${useData.avatar}`,
        });
      });
    }

    return following;
  }

  static async getDataPhoto(id: number): Promise<Photo[]> {
    let photo: Photo[] = [];

    const photoData = await PostRepository.getPhotosFrom(id);
    if (photoData) {
      photoData.forEach((photoData) => {
        photo.push({
          id: photoData.id,
          type: photoData.type,
          created_at: photoData.created_at,
          body: `${process.env.BASE_URL}/media/photo/${photoData.body}`,
        });
      });
    }

    return photo;
  }
}

export { GetFeed };
