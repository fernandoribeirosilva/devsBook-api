import { prisma } from "../config/prisma";
import { UserProps } from "../services/user/create.user.service";
import { UpdateUser } from "../types/UpdateUser";

class UserRepository {
  async save(data: UserProps) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash: data.password,
        birthdate: String(data.birthDate),
        token: data.token,
      },
      select: {
        name: true,
        avatar: true,
        token: true,
      },
    });
  }

  async savePhoto(userId: number, filename: string) {
    // return await prisma.
  }

  async findById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        birthdate: true,
        city: true,
        work: true,
        avatar: true,
        cover: true,
      },
    });
  }

  async isFollowing(loggedUser: number, idUser: number) {
    return await prisma.user_relation.findFirst({
      where: {
        AND: [{ user_from: loggedUser }, { user_to: idUser }],
      },
    });
  }

  async findFollowers(id: number) {
    return await prisma.user_relation.findMany({
      where: { user_from: id },
      select: {
        user_to: true,
      },
    });
  }

  async findFollowing(id: number) {
    return await prisma.user_relation.findMany({
      where: { user_to: id },
      select: {
        user_from: true,
      },
    });
  }

  async follow(from: number, to: number) {
    return await prisma.user_relation.create({
      data: {
        user_to: to,
        user: {
          connect: { id: from },
        },
      },
    });
  }

  async unfollow(from: number, to: number) {
    return await prisma.user_relation.deleteMany({
      where: {
        AND: [{ user_from: from }, { user_to: to }],
      },
    });
  }

  async findByToken(token: string) {
    return await prisma.user.findFirst({
      where: { token },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        cover: true,
        token: true,
      },
    });
  }

  async updateToken(email: string, token: string) {
    return await prisma.user.update({
      where: { email },
      data: { token },
    });
  }

  async emailExists(email: string) {
    return await prisma.user.findFirst({
      where: { email },
      select: {
        id: true,
        email: true,
        passwordHash: true,
      },
    });
  }

  async searchUser(search: string) {
    return await prisma.user.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        avatar: true,
      },
    });
  }

  async updateUser(userId: number, data: UpdateUser) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: data.name,
        birthdate: data.birthdate,
        email: data.email,
        city: data.city,
        work: data.work,
        passwordHash: data.passwordConfirm,
      },
    });
  }

  async updateImgAvatar(userId: number, img: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        avatar: img,
      },
    });
  }

  async updateImgCapa(userId: number, img: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        cover: img,
      },
    });
  }
}

export default new UserRepository();
