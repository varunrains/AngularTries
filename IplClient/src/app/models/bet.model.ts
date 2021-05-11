export class Bet {
  constructor(
    public BetAmount: number,
    public MatchId: number,
    public BettingTeamIdOrTeamAId: number,
    public BetId?: number,
    public IsBetDeleted?: boolean,
    public BettingTeamNameOrTeamA?: string,
    public WinningTeamNameOrTeamB?: string,
    public TeamAId?: number,
    public TeamBId?: number,
    public NetAmountWon?: number,
    public MatchDate?: Date,
    public DisplayDate?: string,
    public UserName?:string) { }
}
