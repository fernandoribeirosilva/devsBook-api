import "dotenv/config";
import { calculateAgeYears } from "../../helpers/calculate.ageYears";
import { FormatDate } from "../../helpers/format.date";
import UserRepository from "../../repositories/user.repository";
import { Feed } from "../../types/Feed";
import { GetFeed } from "./get.feed.service";

class PhotosService extends GetFeed {
  static async getPhotos(idUser: number, loggedUser: number) {
    const feed: Feed[] = [];

    const existsUser = await UserRepository.findById(idUser);
    if (!existsUser) {
      throw new Error("Usuário não encontrado!");
    }

    let birthdate = FormatDate.execute(
      existsUser.birthdate as string,
      "dd/mm/yyyy"
    );
    const ageYears = calculateAgeYears(birthdate);

    const followers = await PhotosService.getDataFollowers(idUser);
    const following = await PhotosService.getDataFollowing(idUser);
    const photo = await PhotosService.getDataPhoto(idUser);

    // Verificar se EU sigo o usuário
    const isFollowing = await GetFeed.verifyIfUserIsFollowing(
      loggedUser,
      idUser
    );

    feed.push({
      id: existsUser.id,
      name: existsUser.name,
      birthdate,
      ageYears,
      city: existsUser.city,
      work: existsUser.work,
      avatar: `${process.env.BASE_URL}/media/avatars/${existsUser.avatar}`,
      cover: `${process.env.BASE_URL}/media/covers/${existsUser.cover}`,
      isFollowing,
      followers,
      following,
      photo,
    });

    return feed;
  }
}

export { PhotosService };
