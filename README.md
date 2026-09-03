# Byte & Bun — GABARITO Aula 03

**Uso exclusivo do docente. Não distribuir aos alunos.**

Versão totalmente resolvida e testada da Aula 03 (Conectando Frontend e
Backend com fetch + CORS) — front e back rodando juntos, sem nenhum preço
fixo no HTML/JS do frontend.

## Como rodar (dois terminais)

**Terminal 1 — backend:**
```
cd backend
npm install
node server.js
```

**Terminal 2 — frontend:**
Abra a pasta `frontend/` com o Live Server (ou duplo clique em
`index.html`).

## O que foi testado antes da entrega

- Comparação de headers HTTP: confirmado que a versão SEM `cors()` não
  envia `Access-Control-Allow-Origin`, e a versão COM `cors()` envia
  (`Access-Control-Allow-Origin: *`) — é exatamente o contraste que a
  aula ensina a diagnosticar.
- Simulação completa do fluxo do frontend via `fetch` nativo do Node:
  GET /cardapio → filtragem por categoria → formatação de `<option>` →
  POST /pedido → total formatado — tudo com os dados reais do cardápio.
- Caso de erro (POST sem todos os campos): retorna status 400 com
  mensagem clara, tratado no front com o bloco `catch`.

## Conferência rápida do cálculo

`Ciabatta + Carne + Especial` → R$ 10,50 — mesmo valor já validado nos
gabaritos das Aulas 01 e 02. Use como teste rápido ao corrigir os
projetos dos alunos.

## Conteúdo

- `backend/server.js` — rotas + CORS habilitado
- `backend/package.json` — express e cors já declarados
- `frontend/index.html` — selects vazios (populados via JS)
- `frontend/script.js` — fetch do cardápio, POST do pedido, formatação
  e tratamento de erro, tudo comentado por seção
- `frontend/style.css` — reaproveitado do gabarito da Aula 01
