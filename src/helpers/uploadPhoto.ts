import { unlink } from "fs/promises";
import sharp from "sharp";

const uploadPhoto = async (
  file: Express.Multer.File | undefined,
  path: string,
  width: number | null,
  height: number | null
): Promise<string> => {
  if (!file) throw new Error("Arquivo Inválido.");

  const fileName = file.filename;

  await sharp(file.path)
    .resize(width, height) // redimesionar a imagem
    .toFile(`${path}${fileName}`); // salvando o arquivo

  await unlink(file.path); // deleta o arquivo da pasta temporária tmp

  return fileName;
};

export { uploadPhoto };
