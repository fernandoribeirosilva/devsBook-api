import userRepository from "../../repositories/user.repository";


class FollowService {
   static async follow(from: number, to: number) {

      const existsUserTo = await userRepository.findById(to);
      if (!existsUserTo) {
         throw new Error("Não foi possível seguir o usuário");
      }

      const isFollowing = await userRepository.isFollowing(from, to);
      if (isFollowing) {
         await userRepository.unfollow(from, to);
      } else {
         await userRepository.follow(from, to);
      }
   }
}

export { FollowService }