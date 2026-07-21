# BattleMonster API

## Sobre o projeto
A BattleMonster API é uma API REST para criar, consultar e simular batalhas entre monstros.

A batalha é uma simulação: o HP dos monstros é alterado apenas em cópias locais durante o cálculo e não é persistido no banco de dados nem no repositório em memória.

## Tecnologias
- Node.js
- TypeScript
- Fastify
- Prisma
- PostgreSQL
- Zod
- Vitest

## Arquitetura
- Controller: recebe HTTP e devolve HTTP.
- Use case: regras de negócio.
- Repository: contrato de persistência.
- Prisma repository: banco real.
- In-memory repository: testes.

## Regras de negócio
- Elementos disponíveis: Fogo, Água e Planta.
- Fogo tem vantagem contra Planta.
- Planta tem vantagem contra Água.
- Água tem vantagem contra Fogo.
- O monstro com maior velocidade ataca primeiro.
- Em caso de empate de velocidade, o primeiro monstro informado vence.
- O dano mínimo é 1.
- Não é permitido batalhar com o mesmo monstro.
- A batalha é uma simulação e não altera o HP salvo.
- O atributo `maxHp` do monstro não pode ser menor que o atributo `hp`.

## Endpoints
| Método | Rota | Descrição |
| --- | --- | --- |
| POST | /monsters | Cria um monstro |
| GET | /monsters | Lista monstros |
| GET | /monsters/:idMonster | Busca um monstro |
| POST | /battle | Simula uma batalha entre dois monstros |

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e configure `DATABASE_URL` com os dados definidos no `docker-compose.yml`.

## Como executar
```bash
npm install
docker compose up -d
npx prisma migrate dev
npm run test
npm run dev
```

## Testes

| Áreas | Cenários cobertos |
| --- | --- |
| Criação | Cria monstro válido, rejeita nome vazio e HP maior que HP máximo |
| Buscas | Busca por ID e lista todos os monstros |
| Batalha | Define vencedor, valida IDs inexistentes e impede o mesmo monstro na batalha |
| Regras elementais | Testa vantagem e desvantagem entre elementos |
| Dano | Garante dano mínimo de 1 |
| Simulação | Garante que HPs não são alterados após a batalha |
| Desempate | Garante que o primeiro monstro vence em empate de velocidade |

