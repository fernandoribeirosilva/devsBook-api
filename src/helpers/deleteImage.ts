import fs from "fs";

export const deleteImagem = async (diretorio: string, nameImagem: string) => {
  let listaImagem = fs.readdirSync(diretorio); // vai ler todos os arquivos do tiretorio que foi passado

  // a função includes verifica se tem a string que foi passada
  if (listaImagem.includes(nameImagem)) {
    //fs.unlinkSync(`./public/media/${nameImagem}`);// a função fs.unlinkSync vai deletar o arquivo
    fs.unlinkSync(`${diretorio}/${nameImagem}`);
  }
};
