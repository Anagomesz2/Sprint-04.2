import express from "express";
import { lerMensagens, salvarMensagens } from "./store.js";

const app = express();
const PORTA = 3000;

app.use(express.json());

app.get("/mensagens", async (req, res) => {
  try {
    const mensagens = await lerMensagens();
    res.json(mensagens);
  } catch (erro) {
    res.status(500).json({ erro: "Erro na leitura das mensagens" });
  }
});

app.get("/exemplo-salvar", async (req, res) => {
  try {
    const lista = await lerMensagens();
    lista.push({
      id: Date.now(),
      usuario: "Aluno",
      texto: "Mensagem gravada no disco!"
    });
    await salvarMensagens(lista);

    res.json({ gravado: true, total: lista.length });
  } catch (erro) {
    res.status(500).json({ erro: "Falha ao gravar no disco" });
  }
});

app.post("/mensagens", async (req, res) => {
  try {
    const { usuario, texto } = req.body;

    if (!usuario || !texto) {
      return res.status(400).json({ erro: "Campos 'usuario' e 'texto' são obrigatórios." });
    }

    const lista = await lerMensagens();
    const novaMensagem = {
      id: Date.now(),
      usuario,
      texto
    };

    lista.push(novaMensagem);
    await salvarMensagens(lista);

    res.status(201).json(novaMensagem);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar nova mensagem" });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});