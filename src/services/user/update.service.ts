import { user } from "@prisma/client";
import bcrypt from "bcrypt";
import { deleteImagem } from "../../helpers/deleteImage";
import { uploadPhoto } from "../../helpers/uploadPhoto";
import UserRepository from "../../repositories/user.repository";
import { UpdateUser } from "../../types/UpdateUser";

class UpdateService {
  static async execute(
    User: user,
    data: UpdateUser,
    avatar: Express.Multer.File[],
    capa: Express.Multer.File[]
  ) {
    let updateUser = {} as UpdateUser;

    if (avatar) {
      await deleteImagem("./public/media/avatars/", User.avatar);
      
      avatar.forEach(async (item) => {
        let newAvatar = await uploadPhoto(
          item,
          "./public/media/avatars/",
          200,
          200
        );
        await UserRepository.updateImgAvatar(User.id, newAvatar);
      });
    }

    if (capa) {
      await deleteImagem("./public/media/covers/", User.cover);

      capa.forEach(async (item) => {
        let newCapa = await uploadPhoto(
          item,
          "./public/media/covers/",
          850,
          310
        );
        await UserRepository.updateImgCapa(User.id, newCapa);
      });
    }

    if (data.name) {
      updateUser.name = data.name;
    }
    if (data.email) {
      const existsEmail = await UserRepository.emailExists(data.email);
      if (existsEmail) {
        throw new Error(`Este email ${data.email} já esta cadastrado!`);
      }
      updateUser.email = data.email;
    }

    // Birthdate format YYYY-MM-DD
    if (data.birthdate) {
      const isValidbirthdate = Date.parse(data.birthdate);
      if (isNaN(isValidbirthdate)) {
        throw new Error("Data de nascimento invalida!");
      }
      updateUser.birthdate = data.birthdate;
    }

    if (data.city) {
      updateUser.city = data.city;
    }

    if (data.work) {
      updateUser.work = data.work;
    }

    if (data.password && data.passwordConfirm) {
      if (data.password !== data.passwordConfirm) {
        throw new Error("As senhas devem ser iguais.");
      }
      const passwordHash = await bcrypt.hash(data.passwordConfirm, 10);
      updateUser.passwordConfirm = passwordHash;
    }

    try {
      await UserRepository.updateUser(User.id, updateUser);
      
      if (!updateUser) {
        throw new Error("Não foi possível atualizar.");
      }

      return "Atualização realizada com sucesso.";
    } catch (error) {}
  }
}

export { UpdateService };
