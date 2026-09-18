// Frete
function calcularFrete(pedido) {
  const frete = 5;

  if (pedido >= 5) {
    return pedido + frete;
  }

  const msgFrete = `Frete: R$${pedido}`;
  return msgFrete;
};

// Preço dos pedidos
function buscarPreco(categoria, nome) {
  const item = cardapio.find(
    (item) => item.categoria === categoria && item.nome === nome,
  );
  return item ? item.preco : 0;
};

module.exports = calcularFrete, buscarPreco;

