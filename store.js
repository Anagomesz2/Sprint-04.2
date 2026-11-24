import { mkdir, readFile, writeFile } from "node:fs/promises";

const PASTA_DATA = new URL("./data/", import.meta.url);
const ARQUIVO = new URL("./data/mensagens.json", import.meta.url);

export async function lerMensagens() {
  try {
    const texto = await readFile(ARQUIVO, "utf8");
    const dados = JSON.parse(texto);

    if (!Array.isArray(dados)) {
      throw new Error("O arquivo JSON precisa conter um array.");
    }

    return dados;
  } catch (erro) {
    if (erro.code === "ENOENT") {
      return [];
    }
    throw erro;
  }
}

export async function salvarMensagens(mensagens) {
  await mkdir(PASTA_DATA, { recursive: true });
  await writeFile(ARQUIVO, JSON.stringify(mensagens, null, 2), "utf8");
}