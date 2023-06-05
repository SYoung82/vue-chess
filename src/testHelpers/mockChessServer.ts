import { rest } from 'msw';
import { setupServer, type SetupServer } from 'msw/node';

const restHandlers = [
  rest.get('https://api.chess.com/pub/player/:playerId', (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: 'test' }));
  }),
];

export const server: SetupServer = setupServer(...restHandlers);
