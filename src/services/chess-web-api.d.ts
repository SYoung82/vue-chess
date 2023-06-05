declare module 'chess-web-api' {
  export default class ChessWebAPI {
    constructor();
    getPlayer(playerId: string): Promise<Player>;
    getCountry(iso: string, options?: object, callback?: Function): Promise<Country>;
    getPlayerStats(username: string, options?: object, callback?: Function): Promise<PlayerStats>;
  }
}
