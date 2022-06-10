export class Poll {

  constructor(public title: string, public createdBy: string, public id: number | null = null,
              public upVotes: number = 0, public downVotes: number = 0) {
  }
}
