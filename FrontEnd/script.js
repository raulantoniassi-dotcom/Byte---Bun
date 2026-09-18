
const URL_API = "https://byteandbun.onrender.com";
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
    let mensagemFrete = "Não foi possível calcular o frete."
    try{
      const respostaFrete = await fetch(`${URL_API}/frete`, {
        method: "POST",
        headers : {"Content-type": "application/json"},
        body: JSON.stringify({ valorPedido: dados.total }),
      })
    
      if (respostaFrete.ok){
        const dadosFrete = await respostaFrete.json();
        mensagemFrete = dadosFrete.mensagem;
      }
   }  catch (errorFrete) {
    console.error("Erro ao buscar frete:", errorFrete);
   }

    cupom.textContent =
      `Pão: ${dados.itens.pao}\n` +
      `Recheio: ${dados.itens.recheio}\n` +
      `Molho: ${dados.itens.molho}\n` +
      `----------------------------\n` +
      `Total: R$ ${totalFormatado}\n` +
      `${mensagemFrete}`;

  } catch (erro) {
    console.error("Erro ao enviar o pedido", erro);
    cupom.textContent = "Não foi possível enviar o pedido. O servidor está rodando?";
  }
});




// buttons
const btnSelectPao = document.querySelector("#btnSelectPao");
const btnSelectRecheio = document.querySelector("#btnSelectRecheio");
const btnSelectMolho = document.querySelector("#btnSelectMolho");
const sectionPao = document.querySelector("#sectionPao"); 
const sectionRecheio = document.querySelector("#sectionRecheio");
const sectionMolho = document.querySelector("#sectionMolho");

btnSelectPao.addEventListener("click", function () {
  sectionPao.hidden = true;
sectionRecheio.hidden = false;

});

btnSelectRecheio.addEventListener("click", function () {
  sectionRecheio.hidden = true;
sectionMolho.hidden = false;
});

btnSelectMolho.addEventListener("click", function () {
 sectionMolho.hidden = true;
});


