
function calcularFrete(pedido) {
  const frete = 5;

  if (pedido >= 7 && pedido < 10) {
    return pedido + frete;
  }

  return pedido;
};

module.exports = calcularFrete;