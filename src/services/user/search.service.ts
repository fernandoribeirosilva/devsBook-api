import UserRepository from "../../repositories/user.repository";

class SearchService {
  static async index(search: string) {
    if (!search) {
      throw new Error("Não foi encontrado resultado para a pesquisar!");
    }
    const users = await UserRepository.searchUser(search);
    return users;
  }
}

export { SearchService };
