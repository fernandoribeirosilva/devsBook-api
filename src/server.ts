import cors from "cors";
import "dotenv/config";
import express, { ErrorRequestHandler, Request, Response } from "express";
import { MulterError } from "multer";
import path from "path";
import apiRoutes from "./router";

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, "..", "public")));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(apiRoutes);

server.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Endpoint não encontrado." });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(400); // Bad Request

  if (err instanceof MulterError) {
    res.json({ error: err.code });
  } else {
    console.log(err);
    res.json({ error: "Ocorreu algum erro." });
  }
};
server.use(errorHandler);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});
