import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Poll} from "../dto/poll";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-poll-detail',
  templateUrl: './poll-detail.component.html',
  styleUrls: ['./poll-detail.component.scss']
})
export class PollDetailComponent implements OnInit {

  private voted = false;
  poll!: Poll;

  constructor(private httpService: HttpClient,
              private activatedRouteService: ActivatedRoute,
              private routerService: Router) { }

  ngOnInit(): void {
    const pollId = this.activatedRouteService.snapshot.paramMap.get("poll");
    this.httpService.get<Poll>(`http://localhost:8080/polling-system/api/v1/polls/${pollId}`)
      .subscribe({
        next: value => this.poll = value,
        error: err => console.error(err)
      });
  }

  goBack(): void {
    this.routerService.navigateByUrl('/dashboard');
  }

  voteUp(): void {
    if (!this.voted)
    this.poll.upVotes++;
    this.voted = true;
  }

  voteDown(): void {
    if (!this.voted)
    this.poll.downVotes++;
    this.voted = true;
  }
}
