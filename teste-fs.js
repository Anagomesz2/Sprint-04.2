import { mkdir, writeFile, readFile } from "node:fs/promises";

// Ex 2.1 — Criando pasta e salvando em disco
async function salvarHistorico() {
  const lista = [
    { id: 1, usuario: "Kimi Antonelli", texto: "Primeiro registro em disco!" },
    { id: 2, usuario: "Max Verstappen", texto: "Persistência funcionando." }
  ];

  await mkdir(new URL("./data/", import.meta.url), { recursive: true });
  const caminhoArquivo = new URL("./data/mensagens-teste.json", import.meta.url);

  await writeFile(caminhoArquivo, JSON.stringify(lista, null, 2), "utf8");
  console.log("Arquivo mensagens-teste.json gravado com sucesso!");
}

// Ex 2.2 — Leitura resiliente (ENOENT)
async function lerDadosSeguros(nomeArquivo) {
  try {
    const conteudo = await readFile(nomeArquivo, "utf8");
    return JSON.parse(conteudo);
  } catch (erro) {
    if (erro.code === "ENOENT") {
      return []; 
    }
    throw erro; 
  }
}

// Executando
await salvarHistorico();

const dadosExistentes = await lerDadosSeguros(
  new URL("./data/mensagens-teste.json", import.meta.url)
);
console.log("Resultado com arquivo existente:", dadosExistentes);

const dadosFantasma = await lerDadosSeguros(
  new URL("./data/arquivo-fantasma.json", import.meta.url)
);
console.log("Resultado com arquivo ausente:", dadosFantasma);