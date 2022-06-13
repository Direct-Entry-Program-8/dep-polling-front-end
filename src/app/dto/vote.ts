export class Vote {

  constructor(public pollId: number, public user: string, public voteType: VoteType) {
  }
}

export enum VoteType{
  UP="UP", DOWN="DOWN"
}
