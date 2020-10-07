export class Match {
  constructor(public MatchId: number,
    public Result: number,
    public IsMatchAbandoned: boolean,
    public MatchDateTime?: Date,
    public TeamIdA?: number,
    public TeamIdB?: number,
    public TeamAShortName?: string,
    public TeamBShortName?: string,
    public Place?: string,
    public DisplayDate?: string,
    public DisableBettingForMatch?:boolean
    ) { }
}
