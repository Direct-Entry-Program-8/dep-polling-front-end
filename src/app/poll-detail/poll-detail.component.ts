import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Poll} from "../dto/poll";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../service/user.service";
import {Vote, VoteType} from "../dto/vote";

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit {

  lastVote: null| string = null;
  poll!: Poll;

  constructor(private httpService: HttpClient,
              private activatedRouteService: ActivatedRoute,
              private routerService: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    const pollId = this.activatedRouteService.snapshot.paramMap.get("poll")!;
    this.httpService.get<Poll>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}`)
      .subscribe({
        next: value => this.poll = value,
        error: err => console.error(err)
      });

    this.httpService.get<Vote>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}/votes?user=${this.userService.getPrincipal()}`)
      .subscribe({
        next: value => this.lastVote = value.voteType,
        error: err => this.lastVote = null
      });
  }

  goBack(): void {
    this.routerService.navigateByUrl('/dashboard');
  }

  voteUp(): void {
    const pollId = this.activatedRouteService.snapshot.paramMap.get("poll")!;
    if (!this.lastVote || this.lastVote === 'DOWN'){
      this.poll.upVotes++;
      if (this.lastVote === 'DOWN') this.poll.downVotes--;
      this.lastVote = 'UP';
      this.httpService.patch<Poll>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}`, this.poll)
        .subscribe({
          next: value => {
            const vote = new Vote(this.poll.id!, this.userService.getPrincipal()!, VoteType.UP);
            this.httpService.put<Vote>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}/votes?user=${this.userService.getPrincipal()}`, vote)
              .subscribe({
                next: value => console.log("Saved"),
                error: err=> console.error("ERROR", err)
              });
          },
          error: err=> console.error("ERROR")
        });

    }
  }

  voteDown(): void {
    const pollId = this.activatedRouteService.snapshot.paramMap.get("poll")!;
    if (!this.lastVote || this.lastVote === 'UP'){
      this.poll.downVotes++;
      if (this.lastVote === 'UP') this.poll.upVotes--;
      this.lastVote = 'DOWN';
      this.httpService.patch<Poll>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}`, this.poll)
        .subscribe({
          next: value => {
            const vote = new Vote(this.poll.id!, this.userService.getPrincipal()!, VoteType.DOWN);
            this.httpService.put<Vote>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}/votes?user=${this.userService.getPrincipal()}`, vote)
              .subscribe({
                next: value => console.log("Saved"),
                error: err=> console.error("ERROR", err)
              });
          },
          error: err=> console.error("ERROR")
        });

    }
  }

  isTrashVisible(): boolean{
    return (this.poll?.createdBy === this.userService.getPrincipal());
  }

  deletePoll(): void {
    const pollId = this.activatedRouteService.snapshot.paramMap.get("poll");
    this.httpService.delete(`http://localhost:8080/polling-system/api/v1/polls/${pollId}`)
      .subscribe({
        next: value => this.routerService.navigateByUrl('dashboard'),
        error: err => console.error(err)
      })
  }
}
