export class Poll {

  constructor(public id: number, public title: string, public createdBy: string,
              public upVotes: number = 0, public downVotes: number = 0) {
  }
}
