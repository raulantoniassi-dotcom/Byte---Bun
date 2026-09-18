const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const calcularFrete = require("./Functions");
const buscarPreco = require("./Functions");

const cardapio = [
  { categoria: "pao", nome: "Frances", preco: 1.5 },
  { categoria: "pao", nome: "Integral", preco: 2.0 },
  { categoria: "pao", nome: "Ciabatta", preco: 2.5 },
  { categoria: "recheio", nome: "Frango", preco: 5.0 },
  { categoria: "recheio", nome: "Carne", preco: 6.5 },
  { categoria: "recheio", nome: "Vegetariano", preco: 4.0 },
  { categoria: "molho", nome: "Maionese", preco: 0.5 },
  { categoria: "molho", nome: "Mostarda", preco: 0.5 },
  { categoria: "molho", nome: "Especial", preco: 1.5 },
];

app.get("/", (req, res) => {
  res.send("Byte & Bun API no ar!");
});

app.get("/cardapio", (req, res) => {
  res.json(cardapio);
});

app.get("/cardapio/:categoria", (req, res) => {
  const categoria = req.params.categoria;
  const filtrados = cardapio.filter((item) => item.categoria === categoria);
  res.json(filtrados);
});

app.post("/pedido", (req, res) => {
  const { pao, recheio, molho } = req.body;

  if (!pao || !recheio || !molho) {
    return res.status(400).json({
      erro: "Envie pao, recheio e molho no corpo da requisicao.",
    });
  }

  const total =
    buscarPreco("pao", pao) +
    buscarPreco("recheio", recheio) +
    buscarPreco("molho", molho);

  res.json({
    itens: { pao, recheio, molho },
    total: Number(total.toFixed(2)),
  });
});

app.post("/frete", (req, res) => {
  const { valorPedido } = req.body;

  if (typeof valorPedido !== "number" || Number.isNaN(valorPedido)) {
    return res
      .status(400)
      .json({ erro: "Erro: Seu pedido deve ser um número." });
  }
  const valorInicial = calcularFrete(valorPedido);
  const valorFinal = valorInicial.toFixed(2).replace(".", ",");
  return res.json({
    mensagem: `Frete: R$${valorFinal}.`,
  });
});

app.listen(PORT, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
