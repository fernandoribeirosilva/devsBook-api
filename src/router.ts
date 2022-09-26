import { Router } from "express";
import multerConfig from "./config/multer";

import Auth from "./middleware/Auth";

import { HomeController } from "./controller/home.Controller";
import { LoginController } from "./controller/login.controller";
import { PostController } from "./controller/post.controller";
import { ProfileController } from "./controller/profile.controller";
import { SearchController } from "./controller/SearchController";
import { UserController } from "./controller/user.controller";
import { LikeController } from "./controller/like.controller";

const router = Router();

router.get("/", Auth.private, new HomeController().index);

router.post("/login", new LoginController().signin);
router.post("/cadastro", new LoginController().signup);

router.get("/perfil/:id/photos", Auth.private, new ProfileController().photos);
router.get(
  "/perfil/:id/friends",
  Auth.private,
  new ProfileController().friends
);
router.get("/perfil/friends", Auth.private, new ProfileController().friends);
router.get("/perfil/:id/follow", Auth.private, new ProfileController().follow);
router.get("/perfil/:id", Auth.private, new ProfileController().index);
router.get("/perfil", Auth.private, new ProfileController().index);

router.get("/photos", Auth.private, new ProfileController().photos);

router.get("/pesquisa", Auth.private, new SearchController().search);

router.post('/post/:id/like', Auth.private, new PostController().like);

router.post(
  "/config",
  Auth.private,
  multerConfig.fields([
    { name: "avatar", maxCount: 1 },
    { name: "capa", maxCount: 1 },
  ]),
  new UserController().update
);

router.post(
  "/post/new",
  Auth.private,
  multerConfig.single("file"),
  new PostController().newPost
);
// router.post('/posts', multerConfig.single('file'), postController.uploadPhoto);

export default router;
