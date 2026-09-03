// ============================================================
// GABARITO - Aula 03 - Byte & Bun Lanchonete
// Conectando Frontend e Backend (fetch + CORS)
// Uso exclusivo do docente - nao distribuir aos alunos.
// ============================================================

const URL_API = "http://localhost:3000";

const cupom = document.querySelector("#cupom");

// ---------- Exercicios 1 e 3: buscar o cardapio e popular os selects ----------
function popularSelect(idSelect, itens) {
  const select = document.querySelector(`#${idSelect}`);
  itens.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.nome;
    option.textContent = `${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}`;
    select.appendChild(option);
  });
}

// for (let i = 0; i < itens.length; i++) {
//     const item = itens[i];
//     const option = document.createElement("option");
//     option.value = item.nome;
//     option.textContent = `${item.nome} — R$ ${item.preco.toFixed(2).replace(".", ",")}`;
//     select.appendChild(option);

async function carregarCardapio() {
  try {
    const resposta = await fetch(`${URL_API}/cardapio`);
    const dados = await resposta.json();

    popularSelect("selectPao", dados.filter((item) => item.categoria === "pao"));
    popularSelect("selectRecheio", dados.filter((item) => item.categoria === "recheio"));
    popularSelect("selectMolho", dados.filter((item) => item.categoria === "molho"));
  } catch (erro) {
    cupom.textContent = "Não foi possível carregar o cardápio. O servidor está rodando?";
  }
}

carregarCardapio();


// ---------- Exercicio 4 e Desafio Final: enviar o pedido e exibir o total ----------
document.querySelector("#btnCalcularPedido").addEventListener("click", async function () {
  const pao = document.querySelector("#selectPao").value;
  const recheio = document.querySelector("#selectRecheio").value;
  const molho = document.querySelector("#selectMolho").value;

  try {
    const resposta = await fetch(`${URL_API}/pedido`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pao, recheio, molho }),
    });

    if (!resposta.ok) {
      const erro = await resposta.json();
      cupom.textContent = `Erro: ${erro.erro || "não foi possível calcular o pedido."}`;
      return;
    }

    const dados = await resposta.json();
    const totalFormatado = dados.total.toFixed(2).replace(".", ",");

    cupom.textContent =
      `Pão: ${dados.itens.pao}\n` +
      `Recheio: ${dados.itens.recheio}\n` +
      `Molho: ${dados.itens.molho}\n` +
      `Total: R$ ${totalFormatado}`;
  } catch (erro) {
    cupom.textContent = "Não foi possível enviar o pedido. O servidor está rodando?";
  }
});
