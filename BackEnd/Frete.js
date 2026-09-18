

function calcularFrete(pedido) {
  const frete = 5;

  if (pedido >= 5) {
    return pedido + frete;
  }

  const msgFrete = `Frete: R$${pedido}`
  return msgFrete;
};

module.exports = calcularFrete;