import ChessWebAPI from 'chess-web-api';
import type { Player } from './models/player.model';
import type { Country } from './models/country.model';
import type { PlayerStats } from './models/playerStats.model';

export class ChessService {
  private static _chessAPI: ChessWebAPI = new ChessWebAPI();

  public static getPlayer(playerId: string): Promise<{ body: Player; status: number }> {
    return this._chessAPI.getPlayer(playerId);
  }

  public static getPlayerCountry(url?: string): Promise<{ body: Country; status: number }> {
    const iso = url?.split('/').at(-1) || '';
    return this._chessAPI.getCountry(iso);
  }

  public static getPlayerStats(username: string): Promise<{ body: PlayerStats; status: number }> {
    return this._chessAPI.getPlayerStats(username);
  }
}
